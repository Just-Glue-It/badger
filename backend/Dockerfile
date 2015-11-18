FROM debian:jessie

RUN apt-get update
RUN apt-get install -y curl xz-utils postgresql

WORKDIR /opt
RUN curl -L https://github.com/begriffs/postgrest/releases/download/v0.2.12.0/postgrest-0.2.12.0-ubuntu.tar.xz | tar xJ

CMD /opt/postgrest-0.2.12.0 --db-name $POSTGRES_DB_NAME \
                            --db-port $POSTGRES_PORT_5432_TCP_PORT \
                            --db-user $POSTGRES_ENV_POSTGRES_USER \
                            --db-pass $POSTGRES_ENV_POSTGRES_PASSWORD \
                            --db-host $POSTGRES_PORT_5432_TCP_ADDR \
                            -p 8000 \
                            -a postgres \
                            --db-pool 200 \
                            --jwt-secret F3F3FDA05D96F198D951DA714B57C995179AA21E090DD8B81CC406B10239BE54
