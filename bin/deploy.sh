#!/usr/bin/env bash

shopt -s globstar
set -e

cd dist && pwd && for f in **/*; do if [ -f "$f" ]; then curl --ftp-create-dirs -T "$f" ftp://"$DEPLOY_HOST"/"$DEPLOY_DIR"/"$f" --user "$DEPLOY_USER":"$DEPLOY_PASS"; fi  done

