#!/bin/bash

cat log.json | jq '.msg' | grep 'accounts' | cut -d '=' -f2 | tr -d '"' |
while read line; do
        email=$(echo $line | cut -d '|' -f1)
        personId=$(echo $line | cut -d '|' -f2)
        jq -n \
            --arg email $email \
            --arg personId $personId \
            '{email: $email, personId: $personId}'
done \
| jq -s '.' > accounts.json