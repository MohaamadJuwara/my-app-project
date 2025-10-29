#!/usr/bin/env node

/**
 * Git Hooks Setup
 * Installs pre-commit and pre-push hooks for README auto-updates
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const GIT_HOOKS_DIR = path.join(PROJECT_ROOT, '.git', 'hooks');
const README_MONITOR = path.join(__dirname, 'readme-monitor.js');

function installHooks() {
  try {
    // Ensure .git/hooks directory exists
    if (!fs.existsSync(GIT_HOOKS_DIR)) {
      fs.mkdirSync(GIT_HOOKS_DIR, { recursive: true });
    }
    
    // Pre-commit hook
    const preCommitHook = `#!/bin/sh
# Auto-update README before commit
node "${README_MONITOR}" --once

# Add README to staging if it changed
git add README.md 2>/dev/null || true
`;
    
    const preCommitPath = path.join(GIT_HOOKS_DIR, 'pre-commit');
    fs.writeFileSync(preCommitPath, preCommitHook);
    fs.chmodSync(preCommitPath, '755');
    
    // Pre-push hook
    const prePushHook = `#!/bin/sh
# Auto-update README before push
node "${README_MONITOR}" --once

# Add README to staging if it changed
git add README.md 2>/dev/null || true

# Commit if README changed and not already committed
if ! git diff --staged --quiet -- README.md 2>/dev/null; then
  git commit --no-verify -m "docs: auto-update README.md" -- README.md 2>/dev/null || true
fi
`;
    
    const prePushPath = path.join(GIT_HOOKS_DIR, 'pre-push');
    fs.writeFileSync(prePushPath, prePushHook);
    fs.chmodSync(prePushPath, '755');
    
    console.log('✓ Git hooks installed successfully:');
    console.log('  - pre-commit: Updates README before commit');
    console.log('  - pre-push: Updates README before push\n');
  } catch (e) {
    console.error('Error installing hooks:', e.message);
    process.exit(1);
  }
}

if (require.main === module) {
  installHooks();
}

module.exports = { installHooks };

