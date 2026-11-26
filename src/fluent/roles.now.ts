import { Role } from '@servicenow/sdk/core'

export const roleOrganizerAdmin = Role({
    name: 'x_495021_konnect.organizer_admin',
    description: 'KonnectFest Event Organizer and Administrator - manages events, stalls, vendors, bulk allocation and reports',
})

export const roleFinancer = Role({
    name: 'x_495021_konnect.financer',
    description: 'KonnectFest Finance Officer - verifies bank payments, approves wallet funding, reviews refunds and settlements',
})

export const roleVendor = Role({
    name: 'x_495021_konnect.vendor',
    description: 'KonnectFest Event Vendor - operates assigned stall, creates purchase requests, generates 60s QR and views stall sales',
})

export const roleParticipant = Role({
    name: 'x_495021_konnect.participant',
    description: 'KonnectFest Event Participant - views wallet balance, requests top-ups, scans QR to confirm purchases and requests refunds',
})
