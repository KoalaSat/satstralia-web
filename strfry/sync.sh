#!/bin/sh

cd /app

filters='{"kinds":[38383]}'

while IFS= read -r line; do
  /app/strfry --config /etc/strfry.conf sync ${line} --filter "$filters" --dir both
done < /app/onion_urls.txt
