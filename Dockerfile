FROM node:gallium-alpine3.13 as build
RUN mkdir /app
WORKDIR /app
COPY . ./
RUN npm install -g typescript
RUN npm install
RUN tsc


FROM node:gallium-alpine3.13
RUN mkdir /app
WORKDIR /app
COPY --from=build /app/dist/ dist/
COPY ./gql/ gql/
COPY ./package.json .
ENV PORT 3000
RUN npm install --only=prod

CMD  ["node", "dist/main.js"]

