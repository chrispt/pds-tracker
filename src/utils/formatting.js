/**
 * Formatting utilities
 */

export function formatAlertTime(date) {
  if (!(date instanceof Date)) date = new Date(date);
  return date.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true
  });
}

export function timeUntilExpiry(expires) {
  if (!expires) return '';
  const now = Date.now();
  const diff = expires.getTime() - now;
  if (diff <= 0) return 'Expired';

  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);

  if (hours > 0) return `${hours}h ${mins}m remaining`;
  return `${mins}m remaining`;
}

export function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
