const fs = require('fs');
['src/fluent/pages/register.html', 'src/fluent/pages/organizer.html', 'src/fluent/pages/finance.html', 'src/fluent/pages/vendor.html', 'src/fluent/pages/participant.html'].forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/src="\/api\/x_2327324_konnect\/konnectfest\/public\/logo"/g, 'src=""');
    fs.writeFileSync(f, c, 'utf8');
  }
});
console.log('Cleaned redundant logo requests from all HTML files.');
