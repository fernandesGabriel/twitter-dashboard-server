ARG NODE_VERSION=14.2.0
ARG ALPINE_VERSION=3.11


# -------------------- base -------------------- #

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN set -x \
 && mkdir /twitter-dashboard \ 
 && chown -R node:node /twitter-dashboard

WORKDIR /twitter-dashboard

USER node


# -------------------- dependencies -------------------- #

FROM base AS dependencies

COPY --chown=node:node package*.json ./

RUN set -x \
 && npm ci


# -------------------- app -------------------- #

FROM base AS app

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

COPY --chown=node:node --from=dependencies /twitter-dashboard ./

COPY --chown=node:node . ./


# -------------------- prod-app -------------------- #

FROM app AS prod-app

CMD [ "npm", "start" ]


# -------------------- dev-dependencies -------------------- #

FROM dependencies AS dev-dependencies

RUN set -x \
 && npm install --only=development


# -------------------- dev-app -------------------- #

FROM app AS dev-app

COPY --chown=node:node --from=dev-dependencies /twitter-dashboard ./

CMD [ "npm", "run", "start-dev" ]


# -------------------- cli -------------------- #

FROM base AS cli