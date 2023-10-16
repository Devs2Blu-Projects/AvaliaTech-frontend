FROM node:alpine as builder

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/evaluator /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
