FROM alpine:3.14

RUN mkdir -p /etc/socatorssl
ADD ./entrypoint.sh /etc/socatorssl/entrypoint.sh
ADD ./torrc /etc/tor/torrc

RUN apk update \
	&& apk upgrade  \
	&& apk add tor socat \
	&& rm -rf /var/cache/apk/* \
	&& chmod +x /etc/socatorssl/entrypoint.sh

ENTRYPOINT ["/etc/socatorssl/entrypoint.sh"]
