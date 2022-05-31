FROM node:14 as build-stage

WORKDIR /front-end

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

ARG BASE_URL

ENV BASE_URL=$BASE_URL

RUN npm run build

FROM nginx:1.17.0-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build-stage /front-end/build /usr/share/nginx/html

# COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE $FRONTEND_DOCKER_PORT

CMD nginx -g "daemon off;"