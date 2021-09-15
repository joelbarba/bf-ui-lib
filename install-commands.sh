#!/bin/bash

# Update Install Packages
apt-get upgrade ca-certificates && apt-get upgrade curl && apt-get upgrade wget

# Download whitesource agent
wget  https://github.com/whitesource/unified-agent-distribution/blob/master/standAlone/wss-unified-agent.jar
