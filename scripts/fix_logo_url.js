const fs = require('fs');

// Replace the 46KB inline base64 with clean URL
const orgPath = 'src/fluent/pages/organizer.html';
const regPath = 'src/fluent/pages/register.html';

let orgHtml = fs.readFileSync(orgPath, 'utf8');
let regHtml = fs.readFileSync(regPath, 'utf8');

orgHtml = orgHtml.replace(/data:image\/jpeg;base64,[^"]+/g, '/api/x_2327324_konnect/konnectfest/public/logo');
regHtml = regHtml.replace(/data:image\/jpeg;base64,[^"]+/g, '/api/x_2327324_konnect/konnectfest/public/logo');

fs.writeFileSync(orgPath, orgHtml, 'utf8');
fs.writeFileSync(regPath, regHtml, 'utf8');

console.log('Replaced inline base64 with URL endpoint');
