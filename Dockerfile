# ---- Étape 1 : build Vite ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Étape 2 : Caddy sert le build ----
FROM caddy:2-alpine
COPY --from=build /app/dist /usr/share/caddy
EXPOSE 8080
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
