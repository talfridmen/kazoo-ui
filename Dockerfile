FROM node:21-alpine3.18

WORKDIR /kazoo-ui

RUN npm install react-scripts@5.0.1 -g
RUN npm install -g serve

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build .

CMD ["serve", "-l", "tcp://0.0.0.0:80", "-s", "build"]
