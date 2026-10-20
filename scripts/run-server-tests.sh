#!/bin/bash

# Determine project root
if [[ $(basename $(pwd)) == "scripts" || $(basename $(pwd)) == "server" ]]; then
    PROJECT_ROOT=$(pwd)/..
else
    PROJECT_ROOT=$(pwd)
fi

# Activate virtual environment
source "$PROJECT_ROOT/venv/bin/activate" || . "$PROJECT_ROOT/venv/bin/activate"

# Check if the virtual environment is activated
if [[ "$VIRTUAL_ENV" == "" ]]; then
    echo "Virtual environment not activated. Running setup-env.sh..."
    bash "$PROJECT_ROOT/scripts/setup-env.sh"
    
    # Re-activate virtual environment after setup
    source "$PROJECT_ROOT/venv/bin/activate" || . "$PROJECT_ROOT/venv/bin/activate"
fi

# Ensure coverage is installed (idempotent, fast if already present)
pip install -q -r "$PROJECT_ROOT/server/requirements-dev.txt"

# Run server tests with coverage
cd "$PROJECT_ROOT/server" || exit 1
echo "Running server tests with coverage..."

coverage run -m unittest discover -s tests -p "*.py"
TEST_EXIT_CODE=$?

# Generate the Cobertura-compatible XML coverage report
coverage xml

exit $TEST_EXIT_CODE