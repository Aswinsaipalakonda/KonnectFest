import { UiPage } from '@servicenow/sdk/core'

export const pageOrganizerDashboard = UiPage({
    $id: Now.ID['page_organizer_dashboard'],
    endpoint: 'x_2327324_konnect_organizer_dashboard.do',
    direct: true,
    category: 'general',
    description: 'KonnectFest Organizer Command Center',
    html: Now.include('./pages/organizer.html'),
})

export const pageFinanceWorkspace = UiPage({
    $id: Now.ID['page_finance_workspace'],
    endpoint: 'x_2327324_konnect_financer_workspace.do',
    direct: true,
    category: 'general',
    description: 'KonnectFest Finance & Settlement Workspace',
    html: Now.include('./pages/finance.html'),
})

export const pageVendorWorkspace = UiPage({
    $id: Now.ID['page_vendor_workspace'],
    endpoint: 'x_2327324_konnect_vendor_workspace.do',
    direct: true,
    category: 'general',
    description: 'KonnectFest Vendor Terminal with 120s Scannable QR',
    html: Now.include('./pages/vendor.html'),
})

export const pageParticipantPortal = UiPage({
    $id: Now.ID['page_participant_portal'],
    endpoint: 'x_2327324_konnect_participant_portal.do',
    direct: true,
    category: 'general',
    description: 'KonnectFest Participant Mobile Portal',
    html: Now.include('./pages/participant.html'),
})

export const pagePublicRegister = UiPage({
    $id: Now.ID['page_public_register'],
    endpoint: 'x_2327324_konnect_register.do',
    direct: true,
    category: 'general',
    description: 'Public Participant Registration & UPI Funding QR',
    html: Now.include('./pages/register.html'),
})
