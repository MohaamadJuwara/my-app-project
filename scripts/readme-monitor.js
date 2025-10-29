#!/usr/bin/env node

/**
 * README Auto-Update Monitor
 * Watches project files and automatically updates README.md with code changes
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const README_PATH = path.join(PROJECT_ROOT, 'README.md');
const CHANGES_LOG = path.join(PROJECT_ROOT, '.readme-changes.json');
const IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/.git/**',
  '**/.next/**',
  '**/dist/**',
  '**/build/**',
  '**/*.log',
  '**/.readme-changes.json',
  '**/package-lock.json',
  '**/pnpm-lock.yaml',
  '**/tsconfig.tsbuildinfo',
];

// Track file changes
let changeQueue = new Set();
let updateTimeout = null;

// Load previous changes
function loadChanges() {
  try {
    if (fs.existsSync(CHANGES_LOG)) {
      return JSON.parse(fs.readFileSync(CHANGES_LOG, 'utf8'));
    }
  } catch (e) {
    console.warn('Could not load previous changes log:', e.message);
  }
  return { lastUpdate: null, files: {}, functions: [], dependencies: [] };
}

// Save changes
function saveChanges(changes) {
  try {
    fs.writeFileSync(CHANGES_LOG, JSON.stringify(changes, null, 2));
  } catch (e) {
    console.warn('Could not save changes log:', e.message);
  }
}

// Extract functions from code file
function extractFunctions(filePath, content) {
  const functions = [];
  const lines = content.split('\n');
  
  // Match exported functions (named, default, arrow functions)
  const patterns = [
    /^export\s+(async\s+)?function\s+(\w+)/gm,
    /^export\s+default\s+(async\s+)?function\s+(\w+)/gm,
    /^export\s+(async\s+)?const\s+(\w+)\s*=/gm,
    /^export\s+(async\s+)?function\s+(\w+)/gm,
    /^const\s+(\w+)\s*=\s*(async\s+)?\(/gm,
    /^function\s+(\w+)/gm,
  ];
  
  patterns.forEach((pattern, idx) => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const funcName = match[2] || match[1];
      if (funcName && !functions.find(f => f.name === funcName)) {
        const lineNum = content.substring(0, match.index).split('\n').length;
        functions.push({
          name: funcName,
          file: path.relative(PROJECT_ROOT, filePath),
          line: lineNum,
          exported: idx < 4,
        });
      }
    }
  });
  
  return functions;
}

// Analyze file for code information
function analyzeFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const ext = path.extname(filePath);
    
    // Only analyze code files
    if (!['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
      return null;
    }
    
    const functions = extractFunctions(filePath, content);
    const imports = extractImports(content);
    
    return {
      path: path.relative(PROJECT_ROOT, filePath),
      functions,
      imports,
      size: content.length,
      lines: content.split('\n').length,
    };
  } catch (e) {
    console.warn(`Error analyzing ${filePath}:`, e.message);
    return null;
  }
}

// Extract imports to track dependencies
function extractImports(content) {
  const imports = [];
  const importPattern = /^import\s+(?:(?:\{[^}]+\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]+\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"](.+?)['"]/gm;
  
  let match;
  while ((match = importPattern.exec(content)) !== null) {
    if (match[1]) {
      imports.push(match[1]);
    }
  }
  
  return imports.filter((imp, idx, arr) => arr.indexOf(imp) === idx);
}

// Get dependencies from package.json
function getDependencies() {
  try {
    const pkgPath = path.join(PROJECT_ROOT, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      return {
        dependencies: Object.keys(pkg.dependencies || {}),
        devDependencies: Object.keys(pkg.devDependencies || {}),
      };
    }
  } catch (e) {
    console.warn('Could not read package.json:', e.message);
  }
  return { dependencies: [], devDependencies: [] };
}

// Update README.md
function updateReadme(changes) {
  try {
    let readme = fs.existsSync(README_PATH)
      ? fs.readFileSync(README_PATH, 'utf8')
      : '';
    
    // Get current project analysis
    const deps = getDependencies();
    const allFiles = getAllCodeFiles();
    const allFunctions = [];
    
    allFiles.forEach(filePath => {
      const analysis = analyzeFile(filePath);
      if (analysis && analysis.functions.length > 0) {
        allFunctions.push(...analysis.functions);
      }
    });
    
    // Update or create sections
    readme = updateSection(readme, '## Project Structure', generateProjectStructure(allFiles));
    readme = updateSection(readme, '## Key Functions & Components', generateFunctionsList(allFunctions));
    readme = updateSection(readme, '## Dependencies', generateDependenciesList(deps));
    readme = updateChangeLog(readme, changes);
    
    fs.writeFileSync(README_PATH, readme);
    console.log('✓ README.md updated successfully');
  } catch (e) {
    console.error('Error updating README:', e.message);
  }
}

// Update or insert a section
function updateSection(readme, heading, content) {
  const headingRegex = new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const headingMatch = readme.match(headingRegex);
  
  if (headingMatch) {
    // Section exists, replace it
    const headingIndex = headingMatch.index;
    const afterHeading = readme.substring(headingIndex + headingMatch[0].length);
    
    // Find next heading (## or #) or end of file
    const nextHeadingMatch = afterHeading.match(/^(##?\s+.+)$/m);
    const sectionEnd = nextHeadingMatch ? nextHeadingMatch.index : afterHeading.length;
    
    const before = readme.substring(0, headingIndex);
    const sectionContent = afterHeading.substring(0, sectionEnd);
    const after = afterHeading.substring(sectionEnd);
    
    // Remove existing content but keep the heading
    const trimmedContent = content.trim();
    
    return before + heading + '\n\n' + trimmedContent + '\n\n' + after;
  } else {
    // Section doesn't exist, insert before "## Learn More" or at end
    const learnMoreIndex = readme.indexOf('## Learn More');
    if (learnMoreIndex !== -1) {
      return readme.substring(0, learnMoreIndex).trimEnd() + '\n\n' + heading + '\n\n' + content.trim() + '\n\n' + readme.substring(learnMoreIndex);
    }
    
    // Or before "## Deploy" 
    const deployIndex = readme.indexOf('## Deploy');
    if (deployIndex !== -1) {
      return readme.substring(0, deployIndex).trimEnd() + '\n\n' + heading + '\n\n' + content.trim() + '\n\n' + readme.substring(deployIndex);
    }
    
    return readme.trimEnd() + '\n\n' + heading + '\n\n' + content.trim();
  }
}

// Update changelog section
function updateChangeLog(readme, changes) {
  const timestamp = new Date().toISOString().split('T')[0];
  const recentChanges = changes.files && Object.keys(changes.files).length > 0
    ? Object.entries(changes.files)
        .slice(-10) // Last 10 changes
        .map(([file, time]) => {
          // Use relative paths only
          const relativeFile = file.startsWith(PROJECT_ROOT) 
            ? path.relative(PROJECT_ROOT, file)
            : file;
          return `- ${new Date(time).toLocaleDateString()}: Updated \`${relativeFile}\``;
        })
        .join('\n')
    : 'No recent changes tracked.';
  
  let changelogContent = `### Recent Changes\n\n${recentChanges}\n\n_Last updated: ${timestamp}_`;
  
  // Check if changelog section exists
  const changelogHeading = '## Changelog';
  const changelogIndex = readme.indexOf(changelogHeading);
  
  if (changelogIndex !== -1) {
    const nextHeadingMatch = readme.substring(changelogIndex).match(/^##\s+.+$/m);
    const nextHeadingIndex = nextHeadingMatch && nextHeadingMatch.index !== 0
      ? changelogIndex + readme.substring(changelogIndex).indexOf(nextHeadingMatch[0])
      : readme.length;
    
    const before = readme.substring(0, changelogIndex + changelogHeading.length);
    const after = readme.substring(nextHeadingIndex);
    
    return before + '\n\n' + changelogContent + '\n\n' + after;
  } else {
    // Insert before "## Learn More" or at end
    const learnMoreIndex = readme.indexOf('## Learn More');
    if (learnMoreIndex !== -1) {
      return readme.substring(0, learnMoreIndex) + changelogHeading + '\n\n' + changelogContent + '\n\n' + readme.substring(learnMoreIndex);
    }
    return readme + '\n\n' + changelogHeading + '\n\n' + changelogContent;
  }
}

// Generate project structure markdown
function generateProjectStructure(files) {
  const structure = {};
  
  files.forEach(file => {
    const relativePath = path.relative(PROJECT_ROOT, file);
    const parts = relativePath.split(path.sep);
    let current = structure;
    
    parts.forEach((part, idx) => {
      if (idx === parts.length - 1) {
        // File
        if (!Array.isArray(current)) {
          current[part] = 'file';
        }
      } else {
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
    });
  });
  
  function formatStructure(obj, prefix = '', isLast = true, depth = 0) {
    if (depth > 5) return ''; // Limit depth
    
    let result = '';
    const entries = Object.entries(obj).sort((a, b) => {
      // Directories first, then files
      if (a[1] === 'file' && b[1] !== 'file') return 1;
      if (a[1] !== 'file' && b[1] === 'file') return -1;
      return a[0].localeCompare(b[0]);
    });
    
    entries.forEach(([name, value], idx) => {
      const isLastItem = idx === entries.length - 1;
      const connector = isLastItem ? '└── ' : '├── ';
      const nextPrefix = prefix + (isLast ? '    ' : '│   ');
      
      result += `${prefix}${connector}${name}${value === 'file' ? '' : '/'}\n`;
      
      if (value !== 'file' && typeof value === 'object') {
        result += formatStructure(value, nextPrefix, isLastItem, depth + 1);
      }
    });
    
    return result;
  }
  
  const formatted = formatStructure(structure);
  return formatted ? '```\n' + formatted + '```' : '_No code files found_';
}

// Generate functions list
function generateFunctionsList(functions) {
  if (functions.length === 0) {
    return 'No exported functions detected.';
  }
  
  // Group by file
  const byFile = {};
  functions.forEach(func => {
    if (!byFile[func.file]) {
      byFile[func.file] = [];
    }
    byFile[func.file].push(func);
  });
  
  let content = '';
  Object.entries(byFile).forEach(([file, fileFuncs]) => {
    content += `### ${file}\n\n`;
    fileFuncs.forEach(func => {
      content += `- \`${func.name}()\` ${func.exported ? '(exported)' : ''}\n`;
    });
    content += '\n';
  });
  
  return content.trim();
}

// Generate dependencies list
function generateDependenciesList(deps) {
  if (deps.dependencies.length === 0 && deps.devDependencies.length === 0) {
    return 'No dependencies found.';
  }
  
  let content = '';
  
  if (deps.dependencies.length > 0) {
    content += '### Runtime Dependencies\n\n';
    content += deps.dependencies.map(dep => `- \`${dep}\``).join('\n');
    content += '\n\n';
  }
  
  if (deps.devDependencies.length > 0) {
    content += '### Development Dependencies\n\n';
    content += deps.devDependencies.map(dep => `- \`${dep}\``).join('\n');
  }
  
  return content.trim();
}

// Get all code files in project
function getAllCodeFiles() {
  const files = [];
  const dirs = ['app', 'lib', 'scripts'];
  
  function shouldIgnore(filePath) {
    const relativePath = path.relative(PROJECT_ROOT, filePath);
    return IGNORE_PATTERNS.some(pattern => {
      // Convert glob pattern to regex
      const regexPattern = pattern
        .replace(/\./g, '\\.')
        .replace(/\*\*/g, '___DOUBLE_STAR___')
        .replace(/\*/g, '[^/]*')
        .replace(/___DOUBLE_STAR___/g, '.*');
      const regex = new RegExp(regexPattern);
      return regex.test(relativePath) || regex.test('/' + relativePath);
    });
  }
  
  function walkDir(dir) {
    try {
      if (!fs.existsSync(dir)) return;
      
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      entries.forEach(entry => {
        const fullPath = path.join(dir, entry.name);
        
        if (shouldIgnore(fullPath)) {
          return;
        }
        
        if (entry.isDirectory()) {
          walkDir(fullPath);
        } else if (['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(entry.name))) {
          files.push(fullPath);
        }
      });
    } catch (e) {
      // Ignore permission errors
    }
  }
  
  dirs.forEach(dir => {
    const dirPath = path.join(PROJECT_ROOT, dir);
    if (fs.existsSync(dirPath)) {
      walkDir(dirPath);
    }
  });
  
  return files;
}

// Handle file change
function handleFileChange(filePath) {
  const relativePath = path.relative(PROJECT_ROOT, filePath);
  
  if (relativePath === 'README.md' || relativePath.startsWith('node_modules')) {
    return; // Don't monitor README or node_modules
  }
  
  changeQueue.add(relativePath);
  
  // Debounce updates
  if (updateTimeout) {
    clearTimeout(updateTimeout);
  }
  
  updateTimeout = setTimeout(() => {
    processChanges();
  }, 2000); // Wait 2 seconds for batch changes
}

// Process queued changes
function processChanges() {
  const changes = loadChanges();
  const now = new Date().toISOString();
  
  changeQueue.forEach(file => {
    changes.files[file] = now;
  });
  
  changes.lastUpdate = now;
  saveChanges(changes);
  
  // Update README
  updateReadme(changes);
  
  const changeCount = changeQueue.size;
  changeQueue.clear();
  console.log(`✓ Processed ${changeCount} file changes`);
}

// Start file watcher
function startWatcher() {
  console.log('🔍 Starting README monitor...');
  console.log('📁 Watching project files...\n');
  
  const watcher = chokidar.watch([
    path.join(PROJECT_ROOT, 'app/**/*'),
    path.join(PROJECT_ROOT, 'lib/**/*'),
    path.join(PROJECT_ROOT, 'scripts/**/*'),
    path.join(PROJECT_ROOT, 'package.json'),
  ], {
    ignored: IGNORE_PATTERNS,
    ignoreInitial: false,
    persistent: true,
  });
  
  watcher
    .on('add', handleFileChange)
    .on('change', handleFileChange)
    .on('unlink', handleFileChange)
    .on('error', error => console.error('Watcher error:', error));
  
  // Initial update
  setTimeout(() => {
    const changes = loadChanges();
    updateReadme(changes);
  }, 1000);
  
  console.log('✓ Monitor active. README will auto-update on file changes.\n');
}

// Run once mode (for Git hooks)
function runOnce() {
  const changes = loadChanges();
  const allFiles = getAllCodeFiles();
  
  // Update change log with current timestamp
  const now = new Date().toISOString();
  changes.lastUpdate = now;
  
  // Track any new files
  allFiles.forEach(file => {
    if (!changes.files[file]) {
      changes.files[file] = now;
    }
  });
  
  saveChanges(changes);
  updateReadme(changes);
  
  console.log('✓ README updated');
}

// Main
if (require.main === module) {
  const mode = process.argv[2];
  
  if (mode === '--once') {
    runOnce();
  } else {
    startWatcher();
  }
}

module.exports = { runOnce, updateReadme, loadChanges };

