const fs = require('fs');

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\u00e2[^\s\w<>"'{};:]+/g, '+');
  content = content.replace(/â[^\s\w<>"'{};:]+/g, '+');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Cleaned: ' + filePath);
}

cleanFile('src/components/sections/ProjectsSection.tsx');
cleanFile('src/components/sections/ExperienceSection.tsx');
