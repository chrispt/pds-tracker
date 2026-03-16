/**
 * Alert list — renders sorted PDS alert cards
 */

import { renderAlertCard } from './alertCard.js';
import { renderEmptyState } from './emptyState.js';

const CATEGORY_ORDER = { tornado: 0, 'svr-tstorm': 1, other: 2 };

export function renderAlertList(container, { pdsAlerts, allAlertCount, isLoading, error }) {
  if (!container) return;

  // Error banner (shown above alerts, doesn't replace them)
  const errorHtml = error
    ? `<div class="error-banner">Failed to fetch alerts: ${error}. Showing last successful data.</div>`
    : '';

  if (isLoading && pdsAlerts.length === 0) {
    container.innerHTML = errorHtml + '<div class="loading-indicator">Loading alerts…</div>';
    return;
  }

  if (pdsAlerts.length === 0) {
    container.innerHTML = errorHtml + renderEmptyState(allAlertCount);
    return;
  }

  const sorted = [...pdsAlerts].sort((a, b) => {
    const catDiff = (CATEGORY_ORDER[a.category] ?? 3) - (CATEGORY_ORDER[b.category] ?? 3);
    if (catDiff !== 0) return catDiff;
    // Newest onset first within category
    return (b.onset?.getTime() || 0) - (a.onset?.getTime() || 0);
  });

  const cards = sorted.map(renderAlertCard).join('');
  container.innerHTML = errorHtml + cards;

  // Wire up expand/collapse toggles
  container.querySelectorAll('.alert-card__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      const isHidden = details.classList.contains('hidden');
      details.classList.toggle('hidden');
      btn.textContent = isHidden ? 'Hide details' : 'Show details';
    });
  });
}
