FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000 

VOLUME [ "/app" ]

CMD [ "node", "index.js" ]