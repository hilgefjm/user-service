FROM ubuntu:trusty

MAINTAINER hilgefjm

RUN apt-get update && apt-get install -y nodejs nodejs-legacy npm && apt-get clean

COPY ./package.json node/

RUN cd node && npm install

COPY . node/

EXPOSE 3000

WORKDIR node/

CMD ["npm","start"]