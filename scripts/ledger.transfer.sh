#!/usr/bin/env bash

# Check if a principal is passed as an argument; otherwise, prompt for it
if [ -z "$1" ]; then
  read -r -p "Enter the Wallet ID (owner account, principal): " PRINCIPAL
else
  PRINCIPAL=$1
fi

# Make a transfer request to the admin server
curl "http://localhost:5999/ledger/transfer/?to=$PRINCIPAL"