# Étape 1 : Builder (on installe et on build)
FROM node:20-alpine AS builder

WORKDIR /app

# Copie package.json + lock d'abord → cache intelligent
COPY package*.json ./
RUN npm ci

# Copie tout le reste
COPY . .

# Build Next.js
RUN npm run build

# Étape 2 : Image finale (très légère)
FROM node:20-alpine AS runner

WORKDIR /app

# On copie seulement ce qui est nécessaire
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Variable d'environnement par défaut (sera surchargée par EB)
ENV NODE_ENV=production
ENV PORT=3000

# Expose le port (EB l'utilise)
EXPOSE 3000

# Lance l'application
CMD ["npm", "start"]