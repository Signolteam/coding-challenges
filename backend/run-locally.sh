#!/bin/bash
set -e
echo "Running backend locally (make sure you activate the virtual environment)..."
uvicorn src.api:app --reload
echo "Local server stopped"