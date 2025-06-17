# Specifies the base image to build on top of.
# It also creates a nodecg user with appropriate permissions.
FROM ghcr.io/nodecg/nodecg:latest

# Copy bundle files into the container.
RUN mkdir -p /opt/nodecg/bundles/multistreaming-app
COPY ./ /opt/nodecg/bundles/multistreaming-app/

RUN apt-get update \
    && apt-get install -y python3 build-essential \
    && rm -rf /var/lib/apt/lists/*
RUN cd /opt/nodecg/bundles/multistreaming-app && npm install

# Define directories that should be persisted in a volume
VOLUME /opt/nodecg/logs /opt/nodecg/db /opt/nodecg/assets
# Define ports that should be used to communicate
EXPOSE 9090/tcp

# Define command to run NodeCG
# Using `node` directly is slightly faster than using `nodecg start`.
CMD ["node", "/opt/nodecg/index.js"]