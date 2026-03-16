/**
 * Stats bar — PDS count chips by category
 */

export function renderStatsBar(container, { pdsAlerts, allAlertCount }) {
  if (!container) return;

  if (pdsAlerts.length === 0) {
    container.innerHTML = '';
    return;
  }

  const counts = { tornado: 0, 'svr-tstorm': 0, other: 0 };
  pdsAlerts.forEach(a => counts[a.category]++);

  const chips = [];

  if (counts.tornado > 0) {
    chips.push(`<span class="stats-chip stats-chip--tornado">Tornado PDS: ${counts.tornado}</span>`);
  }
  if (counts['svr-tstorm'] > 0) {
    chips.push(`<span class="stats-chip stats-chip--svr-tstorm">Svr T-Storm PDS: ${counts['svr-tstorm']}</span>`);
  }
  if (counts.other > 0) {
    chips.push(`<span class="stats-chip stats-chip--other">Other PDS: ${counts.other}</span>`);
  }

  chips.push(`<span class="stats-chip stats-chip--total">Monitoring ${allAlertCount} total alerts</span>`);

  container.innerHTML = `<div class="stats-bar">${chips.join('')}</div>`;
}
