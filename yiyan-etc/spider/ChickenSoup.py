#!/usr/bin/env python
# -*- encoding: utf-8 -*-
# Created on 2019-04-10 23:01:39
# Project: ChickenSoup

import redis
import time
from pyspider.libs.base_handler import *

redis_pool = redis.ConnectionPool(host='localhost', port=6379)

class Handler(BaseHandler):
    crawl_config = {
    }

    @every(minutes=24 * 60)
    def on_start(self):
        self.crawl('https://www.nihaowua.com/home.html', callback=self.index_page, validate_cert=False)

    # @config(age=10 * 24 * 60 * 60)
    def index_page(self, response):
        for each in response.doc('a[href^="http"]:first').items():
            self.crawl(each.attr.href + '?ts=' + str(int(time.time() * 1000)), callback=self.index_page, validate_cert=False)
        return {
            'content': response.doc('section>div:first').text().strip()
        }

    @config(priority=2)
    def on_result(self, result):
        if result is None:
            return
        # 集合存储
        r = redis.Redis(connection_pool=redis_pool)
        exists = r.sismember('chickensoup', result['content'])
        if exists:
            return
        else:
            r.sadd('chickensoup', result['content'])
            super().on_result(result)