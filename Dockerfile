
FROM keymetrics/pm2:latest-wheezy


RUN echo ' keymetrics/pm2:latest-wheezy ' 


RUN npm install node-gyp -g

RUN npm install pm2 -g

RUN npm update npm -g


ADD ./ /live
WORKDIR /live

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Show current folder structure in logs
RUN ls -al -R

#CMD pm2-runtime start ecosystem.config.js --web port
#CMD pm2-runtime start pm2.js 

CMD pm2-runtime start ecosystem.config.js 

