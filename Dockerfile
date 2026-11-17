

FROM node:lts-alpine AS build

ARG NEXT_PUBLIC_BRAND=zoo
ARG API_URL=https://api.netvol.org
ARG NEXT_PUBLIC_API_URL=https://api.netvol.org
ARG YANDEX_API_KEY

ENV NEXT_PUBLIC_BRAND=$NEXT_PUBLIC_BRAND
ENV API_URL=$API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV YANDEX_API_KEY=$YANDEX_API_KEY

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:lts-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.mjs ./

EXPOSE 3000

CMD ["npm", "run", "start"]
