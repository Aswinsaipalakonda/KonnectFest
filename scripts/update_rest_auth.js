const fs = require('fs');

let content = fs.readFileSync('src/fluent/rest_apis.now.ts', 'utf8');

// Replace all occurrences of "active: true," where authentication: false is missing
content = content.replace(/active:\s*true,(?!\s*authentication:\s*false)/g, 'active: true,\n            authentication: false,\n            authorization: false,');

fs.writeFileSync('src/fluent/rest_apis.now.ts', content, 'utf8');
console.log('Updated all routes in rest_apis.now.ts with authentication: false');
