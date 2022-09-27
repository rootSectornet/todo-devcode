FROM node:14

WORKDIR /opt/devcode
COPY . ./
COPY package.json ./
RUN npm install && npm install -g sequelize-cli
EXPOSE 3030
CMD [ "node", "index.js" ]