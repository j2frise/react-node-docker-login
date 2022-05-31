FROM node:14

RUN mkdir -p /usr/src/back-end

WORKDIR /usr/src/back-end

COPY . /usr/src/back-end/

RUN npm install && npm install -g nodemon && npm install -g sequelize-cli

CMD ["npm", "start"]