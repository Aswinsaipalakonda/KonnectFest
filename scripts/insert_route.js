const fs = require('fs');
let c = fs.readFileSync('src/fluent/rest_apis.now.ts', 'utf8');
const target = `shortDescription: 'Onboard and authorize a new vendor stall',\r\n        },`;
const bulkRoute = `shortDescription: 'Onboard and authorize a new vendor stall',\r\n        },\r\n        {\r\n            $id: Now.ID['route_organizer_bulk_allocate'],\r\n            name: 'OrganizerBulkAllocateWallets',\r\n            method: 'POST',\r\n            path: '/organizer/bulk-allocate',\r\n            active: true,\r\n            authentication: false,\r\n            authorization: false,\r\n            internalRole: false,\r\n            enforceAcl: [],\r\n            script: handleBulkAllocateWallets,\r\n            shortDescription: 'Organizer bulk wallet allocation and participant coupon provisioning',\r\n        },`;
if (c.includes(target)) {
    c = c.replace(target, bulkRoute);
    fs.writeFileSync('src/fluent/rest_apis.now.ts', c, 'utf8');
    console.log('Successfully inserted bulk route!');
} else {
    // try with \n
    const targetLF = `shortDescription: 'Onboard and authorize a new vendor stall',\n        },`;
    const bulkRouteLF = `shortDescription: 'Onboard and authorize a new vendor stall',\n        },\n        {\n            $id: Now.ID['route_organizer_bulk_allocate'],\n            name: 'OrganizerBulkAllocateWallets',\n            method: 'POST',\n            path: '/organizer/bulk-allocate',\n            active: true,\n            authentication: false,\n            authorization: false,\n            internalRole: false,\n            enforceAcl: [],\n            script: handleBulkAllocateWallets,\n            shortDescription: 'Organizer bulk wallet allocation and participant coupon provisioning',\n        },`;
    if (c.includes(targetLF)) {
        c = c.replace(targetLF, bulkRouteLF);
        fs.writeFileSync('src/fluent/rest_apis.now.ts', c, 'utf8');
        console.log('Successfully inserted bulk route (LF)!');
    } else {
        console.error('Target not found in either CRLF or LF');
    }
}
