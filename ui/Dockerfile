FROM node:16.15.1-alpine3.16 as BUILD

WORKDIR /app

#COPY [host machine] [container] 
# el primero es relativo al Dockerfile, 
# el segundo a la carpeta raiz del contenedor node-alpine
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1.23.2-alpine

# en lugar de desde el host, se copia desde el contenedor
# de node-alpine que se llama BUILD. Lo indicamos con el --from
COPY --from=BUILD /app/dist /usr/share/nginx/html

COPY --from=BUILD /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]