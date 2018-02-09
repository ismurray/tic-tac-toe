#!/bin/bash

# sh assets/scripts/auth/shell/new-game.sh

curl "http://tic-tac-toe.wdibos.com/games/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "game": {
      "cell": {
        "index": 0,
        "value": "o"
      },
      "over": false
    }
  }'

echo
