/**
 * Header component — title, last-updated time, refresh button
 */

import { formatAlertTime } from '../utils/formatting.js';

export function renderHeader(container, { lastFetchTime, isLoading, onRefresh }) {
  if (!container) return;

  const timeStr = lastFetchTime ? formatAlertTime(lastFetchTime) : '—';

  container.innerHTML = `
    <div class="header">
      <h1 class="header__title"><span>PDS</span> Tracker</h1>
      <div class="header__right">
        <span class="header__updated">Updated: ${timeStr}</span>
        <button class="header__refresh" ${isLoading ? 'disabled' : ''}>
          ${isLoading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </div>`;

  container.querySelector('.header__refresh')?.addEventListener('click', onRefresh);
}
