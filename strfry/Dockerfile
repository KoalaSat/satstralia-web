FROM ubuntu:jammy
ENV TZ=Europe/London

RUN apt update && apt install -y --no-install-recommends \
    git g++ make pkg-config libtool ca-certificates \
    libssl-dev zlib1g-dev liblmdb-dev libflatbuffers-dev \
    libsecp256k1-dev libzstd-dev

# setup app
RUN git clone --branch 1.0.4 --single-branch https://github.com/hoytech/strfry /app

WORKDIR /app

RUN git submodule update --init
RUN make setup-golpe
RUN make clean
RUN make -j4

RUN apt install -y --no-install-recommends \
    liblmdb0 libflatbuffers1 libsecp256k1-0 libb2-1 libzstd1 cron\
    && rm -rf /var/lib/apt/lists/*

# Setting up crontab
COPY crontab /etc/cron.d/crontab
RUN chmod 0644 /etc/cron.d/crontab
RUN crontab /etc/cron.d/crontab

# Setting up entrypoints
COPY sync.sh /etc/strfry/sync.sh
COPY entrypoint.sh /etc/strfry/entrypoint.sh

RUN chmod +x /etc/strfry/entrypoint.sh
RUN chmod +x /etc/strfry/sync.sh

#Setting up logs
RUN touch /var/log/cron.log && chmod 0644 /var/log/cron.log

ENTRYPOINT ["/etc/strfry/entrypoint.sh"]
