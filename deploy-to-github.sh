#!/bin/bash
# ==============================================================================
# ListenMaster - GitHub Publishing Helper
# ==============================================================================

set -e

echo "🚀 Preparing ListenMaster for GitHub deployment..."

# 1. Ensure production build
echo "📦 Building static web application..."
npm run build:static

# 2. Check for git remote
if ! git remote | grep -q "origin"; then
  echo ""
  echo "⚠️  No remote origin configured yet."
  echo "Please enter your GitHub repository URL (e.g. https://github.com/your-username/listenmaster.git):"
  read -r REPO_URL
  if [ -n "$REPO_URL" ]; then
    git remote add origin "$REPO_URL"
  else
    echo "❌ Error: Repository URL cannot be empty."
    exit 1
  fi
fi

# 3. Push main branch
echo "📤 Pushing main branch..."
git push -u origin main

echo ""
echo "🎉 Main branch pushed successfully!"
echo "If you enabled GitHub Actions in repository Settings -> Pages, your site will be live automatically!"
