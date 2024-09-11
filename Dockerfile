FROM node:22-alpine

COPY .output .

ENTRYPOINT ["node", "/server/index.mjs"]
