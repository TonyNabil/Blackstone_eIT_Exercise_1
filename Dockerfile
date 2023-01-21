FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install typescript -g

COPY ./ ./

RUN tsc

EXPOSE 8080

CMD ["npm","start"]
