const testCases = [
    {
        name: 'test_css_html',
        html: `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
<style>
  body { background: #f0f0f0; font-family: sans-serif; padding: 20px; }
  .box { background: white; padding: 15px; border-radius: 8px; }
</style>
<div class="box">
  <h2>Hello from CSS + HTML in Jelly!</h2>
  <p>Testing ServiceNow Jelly rendering</p>
</div>
</j:jelly>`
    },
    {
        name: 'test_with_script',
        html: `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
<style>
  body { background: #e0f2fe; font-family: sans-serif; padding: 20px; }
</style>
<div>
  <h2 id="msg">Loading JS...</h2>
</div>
<script>
//<![CDATA[
document.getElementById('msg').textContent = 'JavaScript executed successfully in Jelly!';
//]]>
</script>
</j:jelly>`
    },
    {
        name: 'test_with_cdata_tags',
        html: `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
<div>
  <h2>Testing CDATA with &amp; and brackets</h2>
</div>
<script><![CDATA[
var x = 10;
var y = 20;
if (x < y && y > 5) {
    console.log('Math logic ok');
}
]]></script>
</j:jelly>`
    }
];

const fs = require('fs');
for (const tc of testCases) {
    fs.writeFileSync('scripts/' + tc.name + '.xml', tc.html, 'utf8');
}
console.log('Created test files');
