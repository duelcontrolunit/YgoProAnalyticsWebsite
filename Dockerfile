
# base image
FROM node:12.2.0-alpine as builder

# set working directory
WORKDIR /website

# add `/website/node_modules/.bin` to $PATH
ENV PATH /website/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /website/package.json
RUN npm install
RUN npm install react-scripts@2.1.5 -g
COPY . ./
# start app
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /website/build /usr/share/nginx/html
COPY --from=builder /website/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]