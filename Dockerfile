# Production image for the CXWorks site (Next.js standalone server on port 3000).

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS build
WORKDIR /app
# NEXT_PUBLIC_* values are inlined into the bundle, so they must be set at build time.
ARG NEXT_PUBLIC_SITE_URL=https://cxworks.com
ARG NEXT_PUBLIC_FORM_ENDPOINT=
ARG NEXT_PUBLIC_GA_ID=
ARG NEXT_PUBLIC_GSC_VERIFICATION=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_FORM_ENDPOINT=$NEXT_PUBLIC_FORM_ENDPOINT \
    NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID \
    NEXT_PUBLIC_GSC_VERIFICATION=$NEXT_PUBLIC_GSC_VERIFICATION \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24-alpine AS run
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
# lib/content.ts reads JSON from ./content.
COPY --from=build --chown=node:node /app/content ./content
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1
CMD ["node", "server.js"]
