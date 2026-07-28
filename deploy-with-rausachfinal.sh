#!/bin/bash

# 🚀 Tazav1 Deployment Helper with Generated SSH Key
# Auto-generated helper script for deployment with key: rausachfinal

SSH_KEY="/home/kata/.ssh/rausachfinal"
SSH_USER="root"
SERVER_IP="116.118.49.243"

# Check if key exists
if [[ ! -f "$SSH_KEY" ]]; then
    echo "❌ SSH key not found: $SSH_KEY"
    exit 1
fi

# Run deployment with generated key
exec ./deploy-remote.sh --key "$SSH_KEY" --user "$SSH_USER" "$SERVER_IP" "$@"
