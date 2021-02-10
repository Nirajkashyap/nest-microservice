
FROM node:12.13-alpine As development

RUN echo ' node:12.13-alpine ' 

RUN node -v
RUN npm -v 

RUN npm install -g @nestjs/cli

RUN nest -v

COPY package*.json /codebase/

WORKDIR /codebase

ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install 

COPY ./apps/order/ /codebase/apps/order/

COPY ./libs/ /codebase/libs/

COPY nest-cli.json /codebase/
COPY tsconfig.json /codebase/

RUN ls -al

RUN npm run build:order 

RUN ls -al



RUN ls -al dist 


RUN ls -al dist/apps -R

FROM keymetrics/pm2:latest-alpine as production

COPY package*.json /live/

WORKDIR /live

RUN npm install --only=production

RUN echo "after npm install prod"

RUN ls -al 

COPY ecosystem.config.js /live/

RUN echo "after ecosystem copy"

RUN ls -al 

COPY --from=development /codebase/dist/apps/order/ /live/dist/

RUN echo "after copy arttifact from previous build"

RUN ls -al 

RUN echo "ls inside dist folder"

RUN ls -al dist -R

RUN echo "port number from env" 

RUN echo $ORDER_API_PORT 

EXPOSE $ORDER_API_PORT

RUN cat ecosystem.config.js 

CMD ["pm2-runtime","start","ecosystem.config.js"]



