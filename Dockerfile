FROM node:14.20
EXPOSE 3010

RUN wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
RUN apt-get install apt-transport-https
RUN echo "deb https://artifacts.elastic.co/packages/8.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-8.x.list
RUN apt-get update && apt-get install filebeat
RUN service filebeat start

USER root
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY . .
RUN npm run preinstall
RUN npm install
RUN npm run postinstall

ENTRYPOINT ["npm", "run", "deploy"]