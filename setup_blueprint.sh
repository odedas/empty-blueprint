#!/bin/bash

# Check if the user provided a destination directory
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <destination_directory>"
    exit 1
fi

# Define the source directory (your example directory) and destination directory
SOURCE_DIR="/Volumes/devenv/empty-blueprint"
DEST_DIR="$1"

# Copy the source directory to the destination directory
cp -R "$SOURCE_DIR" "$DEST_DIR"

# Move to the destination directory
cd "$DEST_DIR" || exit

# Run npm install
npm install

# Run eslint to fix all issues
eslint . --fix

# Upgrade all dependencies to the latest version using ncu
npx npm-check-updates -u

# Install the updated dependencies
npm install

echo "Node.js blueprint setup complete!"
