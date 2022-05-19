#!/bin/sh

yarn autocannon http://127.0.0.1:3000/ \
--method POST \
--connections 6 \
--duration 10 \
--timeout 30 \
--latency \
