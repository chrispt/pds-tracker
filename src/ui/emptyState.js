/**
 * Empty state — no active PDS alerts
 */

export function renderEmptyState(allAlertCount) {
  return `
    <div class="empty-state">
      <div class="empty-state__icon">&#x2714;</div>
      <div class="empty-state__title">No active PDS alerts nationwide</div>
      <p>No Particularly Dangerous Situation designations are currently in effect.</p>
      ${allAlertCount > 0
        ? `<div class="empty-state__monitoring">Monitoring <span class="empty-state__count">${allAlertCount}</span> active NWS alerts</div>`
        : '<div class="empty-state__monitoring">Connected to NWS API</div>'
      }
    </div>`;
}
