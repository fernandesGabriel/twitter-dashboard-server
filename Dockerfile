ARG NODE_VERSION=14.2.0
ARG ALPINE_VERSION=3.11


# -------------------- base -------------------- #

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

WORKDIR /twitter-dashboard


# -------------------- dependencies -------------------- #

FROM base AS dependencies

COPY package*.json ./

RUN set -x \
 && npm install
 

# -------------------- app -------------------- #

FROM dependencies AS app

COPY --from=dependencies /twitter-dashboard ./

COPY . ./

EXPOSE 8080

CMD [ "node", "server.js" ]


# -------------------- cli -------------------- #

FROM dependencies AS cli