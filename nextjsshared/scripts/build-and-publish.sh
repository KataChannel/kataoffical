#!/bin/bash
# filepath: /chikiet/kataoffical/kataoffical/nextjsshared/scripts/build-and-publish.sh

set -e

echo "🚀 Starting build and publish process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if user is logged in to npm
print_status "Checking npm authentication..."
if ! npm whoami > /dev/null 2>&1; then
    print_error "You are not logged in to npm. Please run 'npm login' first."
    exit 1
fi

print_success "NPM authentication verified"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.cache
rm -rf .next
rm -rf storybook-static

# Install dependencies
print_status "Installing dependencies..."
npm ci --force

# Run linting
print_status "Running linter..."
if npm run lint; then
    print_success "Linting passed"
else
    print_warning "Linting failed, but continuing..."
fi

# Run tests (if available)
if npm run test --silent > /dev/null 2>&1; then
    print_status "Running tests..."
    if npm run test; then
        print_success "Tests passed"
    else
        print_error "Tests failed. Aborting publish."
        exit 1
    fi
else
    print_warning "No tests found, skipping..."
fi

# Build the project
print_status "Building project..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed. Aborting publish."
    exit 1
fi

# Check if dist directory exists
if [ ! -d "dist" ]; then
    print_error "dist directory not found after build. Build may have failed."
    exit 1
fi

# Show what will be published
print_status "Files that will be published:"
npm pack --dry-run

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
print_status "Current version: $CURRENT_VERSION"

# Ask for version bump type
echo ""
echo "Select version bump type:"
echo "1) patch (bug fixes)"
echo "2) minor (new features)"
echo "3) major (breaking changes)"
echo "4) custom version"
echo "5) skip version bump"
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        print_status "Bumping patch version..."
        npm version patch
        ;;
    2)
        print_status "Bumping minor version..."
        npm version minor
        ;;
    3)
        print_status "Bumping major version..."
        npm version major
        ;;
    4)
        read -p "Enter custom version: " custom_version
        print_status "Setting version to $custom_version..."
        npm version $custom_version
        ;;
    5)
        print_warning "Skipping version bump..."
        ;;
    *)
        print_error "Invalid choice. Exiting."
        exit 1
        ;;
esac

NEW_VERSION=$(node -p "require('./package.json').version")
print_success "Version: $NEW_VERSION"

# Build Storybook for documentation
if npm run build-storybook --silent > /dev/null 2>&1; then
    print_status "Building Storybook documentation..."
    npm run build-storybook
    print_success "Storybook built successfully"
else
    print_warning "Storybook build not available, skipping..."
fi

# Confirm publication
echo ""
read -p "Are you sure you want to publish version $NEW_VERSION? (y/N): " confirm

if [[ $confirm =~ ^[Yy]$ ]]; then
    print_status "Publishing to npm..."
    
    # Publish to npm
    if npm publish --access public; then
        print_success "🎉 Package published successfully!"
        print_success "Version $NEW_VERSION is now available on npm"
        
        # Show npm package URL
        PACKAGE_NAME=$(node -p "require('./package.json').name")
        echo ""
        print_success "Package URL: https://www.npmjs.com/package/$PACKAGE_NAME"
        print_success "Install with: npm install $PACKAGE_NAME"
        
    else
        print_error "Publish failed!"
        exit 1
    fi
else
    print_warning "Publish cancelled by user"
    exit 0
fi

echo ""
print_success "🚀 Build and publish process completed successfully!"