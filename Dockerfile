FROM node:22-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm i -g serve
COPY . .
RUN npm run build
# TODO - split container into build and runtime
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]