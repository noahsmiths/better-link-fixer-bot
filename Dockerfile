FROM oven/bun:1

COPY . .

RUN bun install

CMD bun index.ts