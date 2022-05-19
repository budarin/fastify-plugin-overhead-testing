#!/bin/sh

yarn autocannon http://127.0.0.1:3000/ \
--method GET \
--connections 20 \
--duration 10 \
--timeout 30 \
--latency \
