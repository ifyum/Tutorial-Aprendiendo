#FROM jhipster/jhipster:v4.14.5
FROM maven:3.5-slim

USER root

# install node y npm
RUN apt-get update && apt-get install -y build-essential

RUN \
  curl -sL https://deb.nodesource.com/setup_8.x | bash && \
  apt-get install -y nodejs git && \
 # cleanup
  apt-get clean && \
  rm -rf \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

# para evitar bug de permisos en npm (source: https://github.com/npm/npm/issues/20605)
RUN npm install -g npm@5.7.1
# para evitar errores de paquetes bower (https://www.npmjs.com/package/bower)
RUN npm install -g bower@1.8.4

RUN \
  # configure the "jhipster" user
  groupadd jhipster && \
  useradd jhipster -s /bin/bash -m -g jhipster -G sudo && \
  echo 'jhipster:jhipster' | chpasswd

USER jhipster



## This workflow will build a Java project with Ant
## For more information see: https://help.github.com/actions/language-and-framework-guides/building-and-testing-java-with-ant
#
#name: Java CI
#
#on:
#  push:
#    branches: [ master ]
#  pull_request:
#    branches: [ master ]
#
#jobs:
#  build:
#
#    runs-on: ubuntu-latest
#
#    steps:
#    - uses: actions/checkout@v2
#    - name: Set up JDK 1.8
#      uses: actions/setup-java@v1
#      with:
#        java-version: 1.8
#    - name: Build with Ant
#      run: ant -noinput -buildfile build.xml
#
# example Dockerfile for https://docs.docker.com/engine/examples/postgresql_service/
#

FROM ubuntu:16.04

# Add the PostgreSQL PGP key to verify their Debian packages.
# It should be the same key as https://www.postgresql.org/media/keys/ACCC4CF8.asc
RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8

# Add PostgreSQL's repository. It contains the most recent stable release
#  of PostgreSQL.
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# Install ``python-software-properties``, ``software-properties-common`` and PostgreSQL 9.3
#  There are some warnings (in red) that show up during the build. You can hide
#  them by prefixing each apt-get statement with DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y python-software-properties software-properties-common postgresql-9.3 postgresql-client-9.3 postgresql-contrib-9.3

# Note: The official Debian and Ubuntu images automatically ``apt-get clean``
# after each ``apt-get``

# Run the rest of the commands as the ``postgres`` user created by the ``postgres-9.3`` package when it was ``apt-get installed``
USER postgres

# Create a PostgreSQL role named ``docker`` with ``docker`` as the password and
# then create a database `docker` owned by the ``docker`` role.
# Note: here we use ``&&\`` to run commands one after the other - the ``\``
#       allows the RUN command to span multiple lines.
RUN    /etc/init.d/postgresql start &&\
    psql --command "CREATE USER root WITH SUPERUSER PASSWORD 'docker';" &&\
    createdb -O root ifyum

# Adjust PostgreSQL configuration so that remote connections to the
# database are possible.
RUN echo "host all  all    192.168.99.100  md5" >> /etc/postgresql/9.3/main/pg_hba.conf

# And add ``listen_addresses`` to ``/etc/postgresql/9.3/main/postgresql.conf``
RUN echo "listen_addresses='*'" >> /etc/postgresql/9.3/main/postgresql.conf

# Expose the PostgreSQL port
EXPOSE 5432

# Add VOLUMEs to allow backup of config, logs and databases
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

# Set the default command to run when starting the container
CMD ["/usr/lib/postgresql/9.3/bin/postgres", "-D", "/var/lib/postgresql/9.3/main", "-c", "config_file=/etc/postgresql/9.3/main/postgresql.conf"]
