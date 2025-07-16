#!/bin/bash

# Function to run commands in background
run_project() {
    local dir=$1
    local cmd=$2
    echo "Starting $dir..."
    cd "$dir" && $cmd &
}

# Start all projects
run_project "frontend/academy" "npm start"
run_project "backend/affiliate" "bun start"
run_project "backend/shared-core" "bun start"

# Wait for all background processes
wait

echo "All projects have stopped."
