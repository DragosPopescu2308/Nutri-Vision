#!/usr/bin/env bash
# 🥗 NutriVision - Pre-Launch Checklist
# This script verifies everything is set up correctly

echo "🥗 NutriVision - Pre-Launch Verification"
echo "========================================"
echo ""

# Initialize counters
PASSED=0
FAILED=0
WARNINGS=0

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Test functions
test_pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
}

test_fail() {
    echo -e "${RED}✗${NC} $1"
    ((FAILED++))
}

test_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

# Header
echo -e "${BLUE}Checking Prerequisites...${NC}"
echo ""

# Check Java
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | grep -oP 'version "\K[^"]*')
    if [[ "$JAVA_VERSION" > "20" ]] || [[ "$JAVA_VERSION" == "21" ]]; then
        test_pass "Java installed (v$JAVA_VERSION)"
    else
        test_warn "Java found but version is $JAVA_VERSION (recommend 21)"
    fi
else
    test_fail "Java not installed - Install Java 21"
fi

# Check Maven
if command -v mvn &> /dev/null; then
    MVN_VERSION=$(mvn -v 2>&1 | head -1 | grep -oP '\d+\.\d+\.\d+')
    test_pass "Maven installed (v$MVN_VERSION)"
else
    test_fail "Maven not installed - Install Maven 3.8+"
fi

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    test_pass "Node.js installed ($NODE_VERSION)"
else
    test_fail "Node.js not installed - Install Node.js 16+"
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    test_pass "npm installed (v$NPM_VERSION)"
else
    test_fail "npm not installed"
fi

echo ""
echo -e "${BLUE}Checking Backend Files...${NC}"
echo ""

# Check pom.xml
if [ -f "pom.xml" ]; then
    test_pass "pom.xml found"
else
    test_fail "pom.xml not found"
fi

# Check application.properties
if [ -f "src/main/resources/application.properties" ]; then
    test_pass "application.properties found"
else
    test_fail "application.properties not found"
fi

# Check Spring Boot main class
if [ -f "src/main/java/com/dragos/nutrivision/NutriVisionApplication.java" ]; then
    test_pass "NutriVisionApplication.java found"
else
    test_fail "NutriVisionApplication.java not found"
fi

# Check Controllers
if [ -f "src/main/java/com/dragos/nutrivision/controller/FoodController.java" ]; then
    test_pass "FoodController found"
else
    test_fail "FoodController not found"
fi

if [ -f "src/main/java/com/dragos/nutrivision/controller/RecipeController.java" ]; then
    test_pass "RecipeController found"
else
    test_fail "RecipeController not found"
fi

# Check Services
if [ -f "src/main/java/com/dragos/nutrivision/service/FoodService.java" ]; then
    test_pass "FoodService found"
else
    test_fail "FoodService not found"
fi

if [ -f "src/main/java/com/dragos/nutrivision/service/RecipeService.java" ]; then
    test_pass "RecipeService found"
else
    test_fail "RecipeService not found"
fi

echo ""
echo -e "${BLUE}Checking Frontend Files...${NC}"
echo ""

# Check frontend folder
if [ -d "frontend" ]; then
    test_pass "frontend directory found"
else
    test_fail "frontend directory not found"
fi

# Check package.json
if [ -f "frontend/package.json" ]; then
    test_pass "frontend/package.json found"
else
    test_fail "frontend/package.json not found"
fi

# Check .env file
if [ -f "frontend/.env" ]; then
    test_pass "frontend/.env found"
else
    test_fail "frontend/.env not found"
fi

# Check main App files
if [ -f "frontend/src/App.js" ]; then
    test_pass "frontend/src/App.js found"
else
    test_fail "frontend/src/App.js not found"
fi

if [ -f "frontend/src/App.css" ]; then
    test_pass "frontend/src/App.css found"
else
    test_fail "frontend/src/App.css not found"
fi

# Check Pages
if [ -f "frontend/src/pages/Dashboard.js" ]; then
    test_pass "Dashboard.js found"
else
    test_fail "Dashboard.js not found"
fi

if [ -f "frontend/src/pages/FoodPage.js" ]; then
    test_pass "FoodPage.js found"
else
    test_fail "FoodPage.js not found"
fi

if [ -f "frontend/src/pages/RecipePage.js" ]; then
    test_pass "RecipePage.js found"
else
    test_fail "RecipePage.js not found"
fi

# Check Components
if [ -f "frontend/src/api/api.js" ]; then
    test_pass "API client found"
else
    test_fail "API client not found"
fi

if [ -f "frontend/src/components/Alert.js" ]; then
    test_pass "Alert component found"
else
    test_fail "Alert component not found"
fi

echo ""
echo -e "${BLUE}Checking Documentation...${NC}"
echo ""

# Check documentation files
DOCS=("README.md" "HELP.md" "ARCHITECTURE.md" "FRONTEND_SETUP.md" "QUICK_REFERENCE.md")

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        test_pass "$doc found"
    else
        test_warn "$doc not found"
    fi
done

echo ""
echo -e "${BLUE}Checking Ports...${NC}"
echo ""

# Check if ports are available
if ! lsof -i :8080 > /dev/null 2>&1; then
    test_pass "Port 8080 is available"
else
    test_warn "Port 8080 is already in use"
fi

if ! lsof -i :3000 > /dev/null 2>&1; then
    test_pass "Port 3000 is available"
else
    test_warn "Port 3000 is already in use"
fi

echo ""
echo "========================================"
echo -e "${GREEN}Results:${NC}"
echo -e "  ${GREEN}Passed: $PASSED${NC}"
echo -e "  ${YELLOW}Warnings: $WARNINGS${NC}"
echo -e "  ${RED}Failed: $FAILED${NC}"
echo "========================================"

if [ $FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. cd frontend && npm install"
    echo "2. In Terminal 1: mvn spring-boot:run"
    echo "3. In Terminal 2: cd frontend && npm start"
    echo ""
    echo "Application will be available at http://localhost:3000"
    exit 0
else
    echo ""
    echo -e "${RED}✗ Some checks failed!${NC}"
    echo "Please fix the issues above before proceeding."
    exit 1
fi

