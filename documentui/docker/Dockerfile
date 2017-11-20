FROM node:9.2.0-slim

#base image has user named node

USER root
RUN mkdir -p /opt/codecentric/dist && \
    mkdir -p /opt/codecentric/node_modules && \
    chown node:node /opt/codecentric
USER node

WORKDIR /opt/codecentric

ADD ["dist", "dist/"]
ADD ["node_modules", "node_modules"]
ADD ["package.json", "server.js", "./"]

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]
