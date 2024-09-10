FROM node:latest

RUN npm install -g pnpm@latest

WORKDIR /app

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 5000

CMD ["pnpm", "start"]

