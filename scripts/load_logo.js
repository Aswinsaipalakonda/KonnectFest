const fs = require('fs');
const path = require('path');

// Read the official base64 logo from the user's uploaded file
const logoPath = 'c:\\Users\\aswin\\.gemini\\antigravity\\brain\\5c328cbb-53f3-4fa4-83e4-de7e7ebf3769\\konnectfest_logo.jpg';
let logoBase64 = '';
if (fs.existsSync(logoPath)) {
    logoBase64 = 'data:image/jpeg;base64,' + fs.readFileSync(logoPath).toString('base64');
} else {
    logoBase64 = 'https://dev495021.service-now.com/favicon.ico';
}

console.log('Logo loaded, base64 length:', logoBase64.length);

module.exports = { logoBase64 };
