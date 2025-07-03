#!/bin/bash

# Auto run API and Frontend projects in separate terminals
echo "Starting API and Frontend projects in separate terminals..."

# Start API with bun in new terminal
echo "Starting API with bun in new terminal..."
gnome-terminal --title="API Server" -- bash -c "cd api && npx bun start; exec bash"

# Wait a moment for API to start
sleep 2

# Start Frontend with npm in new terminal
echo "Starting Frontend with npm in new terminal..."
gnome-terminal --title="Frontend Server" -- bash -c "cd frontend && npm start; exec bash"

echo "Both projects are running in separate terminals."
echo "Close the terminal windows to stop the servers."
