FROM node:14

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

# ENV FE_ENV=${FE_ENV}

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]