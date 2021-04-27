#!/bin/bash

# Update Install Packages
apt-get update
apt-get update && apt-get install -y --no-install-recommends ca-certificates curl wget

# Download whitesource agent
wget  https://github.com/whitesource/unified-agent-distribution/blob/master/standAlone/wss-unified-agent.jar
