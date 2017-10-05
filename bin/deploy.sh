#!/usr/bin/env bash

scp -o "PubkeyAuthentication no" bin/* "$DEPLOY_USER"@"$DEPLOY_HOST":"$DEPLOY_DIR"

