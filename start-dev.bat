@echo off

start "Docker Compose" cmd /k "cd birdscan-backend && docker compose up -d"
start "Backend" cmd /k "cd birdscan-backend && npm run start:dev"
start "Frontend" cmd /k "cd birdscan-frontend && npm run dev" 