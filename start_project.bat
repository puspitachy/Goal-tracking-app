#!/bin/bash

echo "🚀 Starting Flask backend..."
cd backend
source venv/bin/activate
python openAIserver.py &
cd ..

sleep 3

echo "🌐 Starting React frontend..."
cd frontend
npm start
