#!/bin/bash

# Find and kill processes running on ports 3331 and 4301
echo "Killing processes on ports 3331 and 4301..."

# Kill process on port 3331
PID_3331=$(lsof -ti:3331)
if [ ! -z "$PID_3331" ]; then
    kill -9 $PID_3331
    echo "Killed process $PID_3331 on port 3331"
else
    echo "No process found on port 3331"
fi

# Kill process on port 4301
PID_4301=$(lsof -ti:4301)
if [ ! -z "$PID_4301" ]; then
    kill -9 $PID_4301
    echo "Killed process $PID_4301 on port 4301"
else
    echo "No process found on port 4301"
fi

echo "Done!"