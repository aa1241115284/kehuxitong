FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
ADD ./dist /usr/share/nginx/html
