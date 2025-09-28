#!/bin/bash

gnome-terminal -- bash -c "cd birdscan-backend && docker compose up -d; exec bash"
gnome-terminal -- bash -c "cd birdscan-backend && npm run start:dev; exec bash"
gnome-terminal -- bash -c "cd birdscan-frontend && npm run dev; exec bash"