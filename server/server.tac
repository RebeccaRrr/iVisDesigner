#!/usr/bin/env twistd -ny

import os

from server.config import config
from realtime.core import MainResource
from websocket.wamp import get_wamp_service

from twisted.application import service, internet
from twisted.web import static, server
from twisted.internet import reactor, task

def get_realtime_service():
    s = server.Site(MainResource(config))
    port = int(config.get("realtime", "port"))
    interface = config.get("realtime", "interface")
    return internet.TCPServer(port, s, interface = interface)

reactor.suggestThreadPoolSize(4)

application = service.Application("iVisDesigner Realtime Data Service")
realtime_service = get_realtime_service()
realtime_service.setServiceParent(application)

realtime_service = get_wamp_service(config)
realtime_service.setServiceParent(application)
