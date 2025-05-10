# Etapa de build
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de produção
FROM node:18 AS production
WORKDIR /app

# Instala o servidor estático
RUN npm install -g serve

# Copia apenas a pasta dist (build final)
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist"]