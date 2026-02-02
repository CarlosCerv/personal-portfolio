#!/bin/bash
# Quick MongoDB setup script for macOS

echo "MongoDB Quick Setup"
echo "====================="
echo ""

# Check if MongoDB is already installed
if command -v mongod &> /dev/null; then
    echo "SUCCESS: MongoDB is already installed"
    
    # Check if it's running
    if pgrep -x "mongod" > /dev/null; then
        echo "SUCCESS: MongoDB is already running"
    else
        echo "WARNING: MongoDB is installed but not running"
        echo "Starting MongoDB..."
        brew services start mongodb-community 2>/dev/null && echo "SUCCESS: MongoDB started successfully" || {
            echo "ERROR: Failed to start with brew services"
            echo "Trying manual start..."
            mkdir -p /tmp/mongodb-data
            mongod --fork --logpath /tmp/mongodb.log --dbpath /tmp/mongodb-data && echo "SUCCESS: MongoDB started manually"
        }
    fi
else
    echo "WARNING: MongoDB is not installed"
    echo "Installing MongoDB..."
    echo ""
    
    # Check if Homebrew is installed
    if ! command -v brew &> /dev/null; then
        echo "ERROR: Homebrew is not installed"
        echo "Please install Homebrew first: https://brew.sh"
        exit 1
    fi
    
    # Install MongoDB
    echo "Running: brew tap mongodb/brew"
    brew tap mongodb/brew
    
    echo "Running: brew install mongodb-community"
    brew install mongodb-community
    
    echo ""
    echo "Starting MongoDB..."
    brew services start mongodb-community
    
    echo "SUCCESS: MongoDB installation complete!"
fi

echo ""
echo "MongoDB Status:"
brew services list | grep mongodb || pgrep -l mongod || echo "Not running"

echo ""
echo "Setup complete! You can now run:"
echo "   npm run dev"
echo ""
