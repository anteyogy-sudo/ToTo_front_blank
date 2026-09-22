FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-alpine AS runner

WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/next.config.mjs ./
COPY --from=build /app/package*.json ./

RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "run", "start"]
