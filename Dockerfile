FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm build

CMD ["sh", "-c", "pnpm run migration:run && pnpm start"]
