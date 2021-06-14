FROM node:12

WORKDIR /opt/nanite-cms
COPY . /opt/nanite-cms

RUN yarn install --production=true && yarn build

EXPOSE 3000

CMD ["yarn", "start"]