/** NWS API — all active alerts nationwide */
export const NWS_ALERTS_URL = 'https://api.weather.gov/alerts/active';

/** User-Agent header required by NWS API */
export const NWS_USER_AGENT = '(PDSTracker, pds-tracker@example.com)';

/** Auto-refresh interval in milliseconds (2 minutes) */
export const REFRESH_INTERVAL = 2 * 60 * 1000;

/** Case-insensitive search phrase */
export const PDS_PHRASE = 'particularly dangerous situation';
