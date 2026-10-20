#!/bin/bash

# Run end-to-end tests: Playwright will automatically start servers via webServer config

# Define color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Determine project root
if [[ $(basename $(pwd)) == "scripts" ]]; then
    PROJECT_ROOT=$(pwd)/..
else
    PROJECT_ROOT=$(pwd)
fi

cd "$PROJECT_ROOT/client" || exit 1

echo -e "${BLUE}Starting Tailspin Toys E2E Tests${NC}"
echo -e "${GREEN}Starting servers...${NC}"
echo -e "  • Flask API server: http://localhost:5100"
echo -e "  • Astro client server: http://localhost:4321"
echo ""
echo -e "${BLUE}Running tests:${NC}"

# Enable Istanbul instrumentation (vite-plugin-istanbul, see astro.config.mjs)
# and have the coverage-fixtures.ts page fixture write per-test coverage data
# to .nyc_output so it can be merged into a Cobertura report afterwards.
export VITE_COVERAGE=true
rm -rf .nyc_output coverage

# Run Playwright tests - this will automatically start the servers silently
npm run test:e2e

# Store the exit code
TEST_EXIT_CODE=$?

# Merge the collected Istanbul coverage into a Cobertura XML report
if [ -d .nyc_output ] && [ -n "$(ls -A .nyc_output 2>/dev/null)" ]; then
    echo -e "${BLUE}Generating Cobertura coverage report...${NC}"
    npx nyc report
fi

echo ""
echo -e "${BLUE}E2E tests completed with exit code: $TEST_EXIT_CODE${NC}"
exit $TEST_EXIT_CODE