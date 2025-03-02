1. Создать вируальную сеть:
```docker network create reference-network```

2. Сбилдить frontend:
```docker build -t frontend -f Dockerfile_frontend .```
3. Запустить frontend:
```docker run -d --name frontend_container --network reference-network -p 3000:3000 frontend```

4. Сбилдить backend:
```docker build -t backend -f Dockerfile_backend .```
5. Запустить backend:
```docker run -d --name backend_container --network reference-network -p 6700:6700 backend```

6. Зайти на https://localhost:3000