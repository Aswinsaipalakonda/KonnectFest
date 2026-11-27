import os

# 1. Update src/server/restEndpoints.ts
with open('src/server/restEndpoints.ts', 'r', encoding='utf-8') as f:
    rep_content = f.read()

auth_dispatcher = """

/**
 * Participant Authentication Router (Login, Forgot Password OTP, Reset Password, Change Password)
 */
export function handleParticipantAuth(request: any, response: any) {
    try {
        const body = request.body.data || {}
        const action = body.action || ''
        if (action === 'login') {
            return handleParticipantLogin(request, response)
        } else if (action === 'forgot_password') {
            return handleParticipantForgotPassword(request, response)
        } else if (action === 'reset_password') {
            return handleParticipantResetPassword(request, response)
        } else if (action === 'change_password') {
            return handleParticipantChangePassword(request, response)
        } else {
            response.setStatus(400)
            response.setBody({ success: false, message: 'Invalid action specified for participant auth: ' + action })
        }
    } catch (e: any) {
        response.setStatus(500)
        response.setBody({ success: false, message: 'Auth router error: ' + (e.message || String(e)) })
    }
}
"""

if 'export function handleParticipantAuth' not in rep_content:
    rep_content += auth_dispatcher
    with open('src/server/restEndpoints.ts', 'w', encoding='utf-8') as f:
        f.write(rep_content)
    print('Added handleParticipantAuth to restEndpoints.ts')

# 2. Update src/fluent/rest_apis.now.ts
with open('src/fluent/rest_apis.now.ts', 'r', encoding='utf-8') as f:
    api_content = f.read()

# Add handleParticipantAuth to imports
old_import = "handlePaySettlement,\n} from '../server/restEndpoints'"
new_import = "handlePaySettlement,\n    handleParticipantAuth,\n} from '../server/restEndpoints'"

if "handleParticipantAuth" not in api_content[:api_content.find("from '../server/restEndpoints'")]:
    api_content = api_content.replace(old_import, new_import)

# Fix route definition
old_route = """        {
            $id: Now.ID['route_participant_auth'],
            name: 'participant_auth',
            path: '/participant/auth',
            method: 'POST',
            handler: handleParticipantAuth,
            consumes: ['application/json'],
            produces: ['application/json'],
            requiresAuthentication: false,
        },"""

new_route = """        {
            $id: Now.ID['route_participant_auth'],
            name: 'ParticipantAuth',
            method: 'POST',
            path: '/participant/auth',
            active: true,
            authentication: false,
            authorization: false,
            internalRole: false,
            enforceAcl: [],
            script: handleParticipantAuth,
            shortDescription: 'Participant authentication, PIN reset, and change password',
        },"""

api_content = api_content.replace(old_route, new_route)

with open('src/fluent/rest_apis.now.ts', 'w', encoding='utf-8') as f:
    f.write(api_content)
print('Updated rest_apis.now.ts with standard route syntax and import')
