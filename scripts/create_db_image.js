// Insert logo into db_image table
var fs = require('fs');
// Let's create a script for ServiceNow to create db_image
var logoGr = new GlideRecord('db_image');
logoGr.addQuery('name', 'konnectfest_logo.jpg');
logoGr.query();
if (!logoGr.next()) {
    logoGr.initialize();
    logoGr.name = 'konnectfest_logo.jpg';
    logoGr.category = 'general';
    var imgSysId = logoGr.insert();
    gs.info('Created db_image record: ' + imgSysId);
} else {
    gs.info('db_image konnectfest_logo.jpg already exists');
}
