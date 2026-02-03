FROM oven/bun:latest AS base

RUN apt-get update -qq \
    && apt-get install --no-install-recommends -y ca-certificates unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run download-files || true

ENV NODE_ENV=production
CMD ["bun", "run", "start"]

