FROM markadams/chromium-xvfb

WORKDIR /usr/src/app

RUN apt-get install -y gpg \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists