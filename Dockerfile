FROM node:19.7.0

WORKDIR /the/workdir/path

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]

LABEL maintainer="User Manager"
LABEL description="This app let you add, remove and update user which are saved on a xls file. It also has a main page where you can see all the users"
LABEL cohort = 16
LABEL animal = 'Tiger'
