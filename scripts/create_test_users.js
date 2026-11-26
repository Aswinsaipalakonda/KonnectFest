// Script to create or update test users for each role
var roles = [
    {
        user_name: 'konnect.organizer',
        first_name: 'Aswin',
        last_name: 'Organizer',
        email: 'organizer@konnectfest.com',
        role_name: 'x_2327324_konnect.organizer_admin',
        title: 'Event Organizer'
    },
    {
        user_name: 'konnect.finance',
        first_name: 'Rohan',
        last_name: 'Financer',
        email: 'finance@konnectfest.com',
        role_name: 'x_2327324_konnect.financer',
        title: 'Finance Administrator'
    },
    {
        user_name: 'konnect.vendor',
        first_name: 'Vikram',
        last_name: 'Cafe Mocha',
        email: 'vendor@konnectfest.com',
        role_name: 'x_2327324_konnect.vendor',
        title: 'Authorized Stall Vendor'
    },
    {
        user_name: 'konnect.participant',
        first_name: 'Ananya',
        last_name: 'Participant',
        email: 'ananya@konnectfest.com',
        role_name: 'x_2327324_konnect.participant',
        title: 'Event Attendee'
    }
];

var defaultPassword = 'Konnect@2026!';

for (var i = 0; i < roles.length; i++) {
    var uDef = roles[i];
    var u = new GlideRecord('sys_user');
    u.addQuery('user_name', uDef.user_name);
    u.query();
    var userSysId = '';
    if (!u.next()) {
        u.initialize();
        u.user_name = uDef.user_name;
        u.first_name = uDef.first_name;
        u.last_name = uDef.last_name;
        u.email = uDef.email;
        u.title = uDef.title;
        u.user_password.setDisplayValue(defaultPassword);
        u.active = true;
        userSysId = u.insert();
        gs.info('Created user: ' + uDef.user_name + ' sys_id: ' + userSysId);
    } else {
        u.first_name = uDef.first_name;
        u.last_name = uDef.last_name;
        u.email = uDef.email;
        u.title = uDef.title;
        u.user_password.setDisplayValue(defaultPassword);
        u.active = true;
        u.update();
        userSysId = u.sys_id.toString();
        gs.info('Updated user: ' + uDef.user_name);
    }

    // Now assign role
    var rGr = new GlideRecord('sys_user_role');
    rGr.addQuery('name', uDef.role_name);
    rGr.query();
    if (rGr.next()) {
        var roleSysId = rGr.sys_id.toString();
        var ur = new GlideRecord('sys_user_has_role');
        ur.addQuery('user', userSysId);
        ur.addQuery('role', roleSysId);
        ur.query();
        if (!ur.next()) {
            ur.initialize();
            ur.user = userSysId;
            ur.role = roleSysId;
            ur.insert();
            gs.info('Assigned role ' + uDef.role_name + ' to ' + uDef.user_name);
        } else {
            gs.info('Role ' + uDef.role_name + ' already assigned to ' + uDef.user_name);
        }
    } else {
        gs.warn('Role not found: ' + uDef.role_name);
    }
}
