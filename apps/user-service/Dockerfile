
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

COPY ./apps/user-service/ /codebase/apps/user-service/
# COPY ./apps/user-service/tsconfig.app.json /codebase/
COPY ./libs/ /codebase/libs/

COPY nest-cli.json /codebase/
COPY tsconfig.json /codebase/

RUN ls -al

RUN npm run build:user 

RUN ls -al

RUN echo "list for  dist folder"

RUN ls -al dist 

RUN echo "list for dist/apps folder"

RUN ls -al dist/apps -R

FROM keymetrics/pm2:latest-alpine as production

COPY package*.json /live/

WORKDIR /live

RUN npm install --only=production

RUN echo "after npm i prod"

RUN ls -al 

COPY ecosystem.config.js /live/

RUN echo "after ecosystem copy"

RUN ls -al 

COPY --from=development /codebase/dist/apps/user-service/ /live/dist/

RUN echo "after copy arttifact from previous build"

RUN ls -al 

RUN echo "see ............... dist-4 folder"

RUN ls -al dist -R

RUN echo "port number ::: :: $USER_API_PORT" 

RUN echo $USER_API_PORT 

EXPOSE $USER_API_PORT

RUN cat ecosystem.config.js 

CMD ["pm2-runtime","start","ecosystem.config.js"]



