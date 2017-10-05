#!/usr/bin/env bash

 find dist/ -exec curl -T {} ftp://"$DEPLOY_HOST"/"$DEPLOY_DIR"/ --user "$DEPLOY_USER":"$DEPLOY_PASS" \;
