FROM node:22.13.1-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM python:3.13-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt ./requirements.txt
COPY backend/db.sqlite3 ./db.sqlite3
COPY backend/backend.py ./backend.py
COPY backend/database.py ./database.py

RUN pip install --upgrade --root-user-action=ignore pip
RUN pip install --no-cache-dir --upgrade --root-user-action=ignore -r requirements.txt

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --production

COPY --from=frontend-build /app/frontend/.next ./.next
COPY --from=frontend-build /app/frontend/next.config.mjs ./
COPY --from=frontend-build /app/frontend/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=3000
ENV PYTHONUNBUFFERED=1

EXPOSE 3000 6700


CMD ["sh", "-c", "python backend.py & npm start"]