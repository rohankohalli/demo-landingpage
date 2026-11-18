// Disallowed consumer freemail domains per B2B qualification policy
export const PERSONAL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'aol.com',
  'live.com',
  'mail.com',
  'protonmail.com',
  'ymail.com',
  'msn.com',
  'zoho.com',
])

export const APAC_COUNTRIES = [
  'Singapore',
  'Australia',
  'India',
  'Japan',
  'Malaysia',
  'Indonesia',
  'New Zealand',
  'Philippines',
  'Vietnam',
  'Thailand',
  'Other APAC',
]

// Extracts UTM parameters dynamically from a URL search query string
export function readUtm(searchString = window.location.search) {
  const params = new URLSearchParams(searchString)
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
  }
}

// Strict work email validation logic
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Work email is required.'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid work email address.'
  }
  const domain = email.trim().split('@')[1]?.toLowerCase()
  if (PERSONAL_DOMAINS.has(domain)) {
    return 'Personal email domains (Gmail, Yahoo, Outlook, etc.) are not accepted. Please use your corporate work email.'
  }
  return null
}
