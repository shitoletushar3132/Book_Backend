FROM node:18

WORKDIR /app

COPY package*.json ./

RUN ls -l


RUN npm install

COPY . .

CMD ["node","index.js"]

