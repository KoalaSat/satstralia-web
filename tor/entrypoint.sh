#!/bin/sh
set -e

# Start tor daemon - Configuration is in /etc/tor/torrc and is set to daemonize TOR
tor

if [ $? -ne 0 ]; then
	echo "tor did not start properly - Exiting"
	exit $?
fi

# Check if required environment variable
if [ -z "${PUBLIC_PORT}" ]; then
	echo "PUBLIC_PORT environment variable is not set"
	exit 1
fi

if [ -z "${TOR_SITE}" ]; then
	echo "TOR_SITE environment variable is not set"
	exit 1
fi

if [ -z "${TOR_SITE_PORT}" ]; then
	echo "TOR_SITE_PORT environment variable is not set"
	exit 1
fi

socat tcp4-LISTEN:${PUBLIC_PORT},reuseaddr,fork,keepalive SOCKS4A:127.0.0.1:${TOR_SITE}:${TOR_SITE_PORT},socksport=9050


