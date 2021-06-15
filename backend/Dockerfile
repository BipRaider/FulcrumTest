# FROM mhart/alpine-node:14 as base

# WORKDIR /usr/src/backend

# COPY package*.json ./

# RUN npm install --production

# COPY . .

# FROM base as production

# ENV NODE_PATH=./dist

# RUN npm build

# EXPOSE 3001

# CMD [ "node", "dist/server.js" ]


FROM mhart/alpine-node:14 as base

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
