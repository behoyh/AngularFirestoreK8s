FROM node as node
# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install -g @angular/cli
RUN npm install
RUN npm rebuild node-sass
RUN ng build --prod
FROM nginx
COPY --from=node /usr/src/app/dist/angular-firestore-k8s /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf