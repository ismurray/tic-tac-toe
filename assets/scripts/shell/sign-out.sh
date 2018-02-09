#!/bin/bash

# ID=<id> sh assets/scripts/auth/shell/sign-out.sh

curl "http://tic-tac-toe.wdibos.com/sign-out/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \

echo
