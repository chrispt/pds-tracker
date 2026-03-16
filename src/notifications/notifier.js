/**
 * Desktop notification support for new PDS alerts.
 * In-memory seen-ID tracking — resets on page refresh (no spam on reload).
 */

const STORAGE_KEY = 'pds-notify-enabled';

let seenIds = new Set();
let isFirstLoad = true;
let enabled = false;

export function initNotifier() {
  if (!('Notification' in window)) return;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'true' && Notification.permission === 'granted') {
    enabled = true;
  } else if (stored === 'true' && Notification.permission !== 'granted') {
    // Permission was revoked after user enabled — auto-disable
    localStorage.setItem(STORAGE_KEY, 'false');
    enabled = false;
  }
}

export function isNotificationsEnabled() {
  return enabled;
}

export async function toggleNotifications() {
  if (enabled) {
    enabled = false;
    localStorage.setItem(STORAGE_KEY, 'false');
    return false;
  }

  if (Notification.permission === 'granted') {
    enabled = true;
    localStorage.setItem(STORAGE_KEY, 'true');
    return true;
  }

  if (Notification.permission === 'denied') {
    return false;
  }

  const result = await Notification.requestPermission();
  if (result === 'granted') {
    enabled = true;
    localStorage.setItem(STORAGE_KEY, 'true');
    return true;
  }

  return false;
}

export function processAlerts(pdsAlerts) {
  const currentIds = new Set(pdsAlerts.map(a => a.id));

  if (isFirstLoad) {
    seenIds = currentIds;
    isFirstLoad = false;
    return;
  }

  if (enabled && Notification.permission === 'granted') {
    for (const alert of pdsAlerts) {
      if (!seenIds.has(alert.id)) {
        const area = alert.properties?.areaDesc ?? '';
        new Notification(`PDS Alert: ${alert.properties?.event ?? 'Unknown'}`, {
          body: area.length > 100 ? area.slice(0, 100) + '…' : area,
          tag: alert.id
        });
      }
    }
  }

  seenIds = currentIds;
}
