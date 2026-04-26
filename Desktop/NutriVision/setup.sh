#!/bin/bash
# NutriVision Development Environment Setup
# This script helps set up and run the full application

echo "=================================================="
echo "  🥗 NutriVision - Development Environment Setup"
echo "=================================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"
echo ""

# Check Java
if ! command -v java &> /dev/null; then
    echo -e "${RED}✗ Java not found${NC}"
    echo "  Please install Java 21 from https://www.oracle.com/java/technologies/downloads/"
    exit 1
else
    JAVA_VERSION=$(java -version 2>&1 | head -1)
    echo -e "${GREEN}✓ Java found:${NC} $JAVA_VERSION"
fi

# Check Maven
if ! command -v mvn &> /dev/null; then
    echo -e "${RED}✗ Maven not found${NC}"
    echo "  Please install Maven from https://maven.apache.org/download.cgi"
    exit 1
else
    MVN_VERSION=$(mvn -version 2>&1 | head -1)
    echo -e "${GREEN}✓ Maven found:${NC} $MVN_VERSION"
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found${NC}"
    echo "  Please install Node.js 16+ from https://nodejs.org"
    exit 1
else
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js found:${NC} $NODE_VERSION"
fi

# Check MySQL
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}⚠ MySQL command not in PATH${NC}"
    echo "  MySQL might still be running as a service"
    echo "  Please ensure MySQL server is running on localhost:3306"
else
    echo -e "${GREEN}✓ MySQL found${NC}"
fi

echo ""
echo -e "${BLUE}All prerequisites are installed!${NC}"
echo ""

# Main menu
echo "What would you like to do?"
echo ""
echo "  1) Install frontend dependencies"
echo "  2) Build backend (mvn clean install)"
echo "  3) Run backend only"
echo "  4) Run frontend only"
echo "  5) Run full application (both backend + frontend)"
echo "  6) View logs"
echo "  7) Clean and rebuild"
echo ""

read -p "Enter your choice (1-7): " choice

case $choice in
    1)
        echo -e "${BLUE}Installing frontend dependencies...${NC}"
        cd frontend
        npm install
        echo -e "${GREEN}✓ Installation complete!${NC}"
        ;;
    2)
        echo -e "${BLUE}Building backend...${NC}"
        mvn clean install
        echo -e "${GREEN}✓ Build complete!${NC}"
        ;;
    3)
        echo -e "${BLUE}Starting backend on port 8080...${NC}"
        echo "Press Ctrl+C to stop"
        mvn spring-boot:run
        ;;
    4)
        echo -e "${BLUE}Starting frontend on port 3000...${NC}"
        echo "Press Ctrl+C to stop"
        cd frontend
        npm start
        ;;
    5)
        echo -e "${BLUE}Starting full application...${NC}"
        echo ""
        echo -e "${YELLOW}Backend will start in new window on port 8080${NC}"
        echo -e "${YELLOW}Frontend will start in new window on port 3000${NC}"
        echo ""

        # Start backend in background
        echo -e "${BLUE}Starting Backend...${NC}"
        gnome-terminal -- bash -c "cd '$(pwd)' && mvn spring-boot:run; exec bash" &

        sleep 3

        # Start frontend in background
        echo -e "${BLUE}Starting Frontend...${NC}"
        gnome-terminal -- bash -c "cd '$(pwd)/frontend' && npm start; exec bash" &

        echo ""
        echo -e "${GREEN}✓ Application started!${NC}"
        echo ""
        echo "Backend: http://localhost:8080"
        echo "Frontend: http://localhost:3000"
        echo ""
        echo "Press Enter to continue..."
        read
        ;;
    6)
        echo -e "${BLUE}Backend logs:${NC}"
        tail -f mvn-output.log 2>/dev/null || echo "No log file found"
        ;;
    7)
        echo -e "${BLUE}Cleaning and rebuilding...${NC}"
        mvn clean
        rm -rf frontend/node_modules frontend/build
        mvn install
        cd frontend
        npm install
        echo -e "${GREEN}✓ Full clean and rebuild complete!${NC}"
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Done!${NC}"

