#!/bin/bash

# Start API server
echo "Starting API server..."
cd api
npx bun start &
API_PID=$!

# Start Frontend server
echo "Starting Frontend server..."
cd ../frontend
bun start &
FRONTEND_PID=$!

echo "API running on http://localhost:3001"
echo "Frontend running on http://localhost:3000"
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait $API_PID $FRONTEND_PID