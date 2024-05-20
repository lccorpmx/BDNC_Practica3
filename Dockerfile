# Usar la imagen de node como base para construir la aplicación Angular
FROM node:latest as build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todos los archivos del proyecto al directorio de trabajo
COPY . .

# Compilar la aplicación
RUN npm run build --prod

# Configurar una imagen ligera de Nginx para servir la aplicación compilada
FROM nginx:alpine

# Eliminar el contenido predeterminado de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos de la compilación de la aplicación Angular al directorio de Nginx
COPY --from=build /app/dist/frontangular/ /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar el servidor Nginx en segundo plano
CMD ["nginx", "-g", "daemon off;"]

