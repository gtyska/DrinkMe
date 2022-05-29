# # Stage 1: Compile and Build angular codebase
# # Use official node image as the base image
# # FROM --platform=linux/amd64 node:16 AS build
# FROM arm64v8/node:16 as build

# # Set the working directory
# WORKDIR /usr/local/app

# # Add the source code to app
# COPY package.json ./package.json
# COPY ./ /usr/local/app/

# # Install all the dependencies
# RUN npm install

# # Generate the build of the application
# RUN npm run build

# # Stage 2: Serve app with nginx server

# # Use official nginx image as the base image
# # FROM --platform=linux/amd64 nginx:latest
# FROM arm64v8/nginx

# # Copy the build output to replace the default nginx contents.
# COPY --from=build /usr/local/app/dist/drinkme /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80



ARG WORK_DIR=/usr/local/app

FROM arm64v8/node:16 as builder

ARG WORK_DIR
ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN npm install @angular/cli
RUN npm install

COPY . ${WORK_DIR}

RUN ng build

FROM nginx:latest

ARG WORK_DIR

COPY --from=builder ${WORK_DIR}/dist/drinkme /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD nginx -g "daemon off;"
