const fs = require('fs');

let content = fs.readFileSync('src/fluent/rest_apis.now.ts', 'utf8');

// Fix root RestApi
content = content.replace(
`export const konnectfestApi = RestApi({
    $id: Now.ID['rest_konnectfest'],
    name: 'KonnectFest Commerce API',
    serviceId: 'konnectfest',
    active: true,
            authentication: false,
            authorization: false,
    routes: [`,
`export const konnectfestApi = RestApi({
    $id: Now.ID['rest_konnectfest'],
    name: 'KonnectFest Commerce API',
    serviceId: 'konnectfest',
    active: true,
    routes: [`
);

fs.writeFileSync('src/fluent/rest_apis.now.ts', content, 'utf8');
console.log('Fixed root RestApi in rest_apis.now.ts');
