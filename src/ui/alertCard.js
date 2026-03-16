/**
 * Individual expandable PDS alert card
 */

import { escapeHtml, formatAlertTime, timeUntilExpiry } from '../utils/formatting.js';

const CATEGORY_LABELS = {
  tornado: 'Tornado',
  'svr-tstorm': 'Severe T-Storm',
  other: 'PDS'
};

export function renderAlertCard(alert) {
  const cat = alert.category;
  const badgeLabel = CATEGORY_LABELS[cat] || 'PDS';

  return `
    <div class="alert-card alert-card--${cat}" data-alert-id="${escapeHtml(alert.id)}">
      <div class="alert-card__top">
        <span class="alert-card__event">${escapeHtml(alert.event)}</span>
        <span class="alert-card__badge alert-card__badge--${cat}">${badgeLabel}</span>
      </div>
      ${alert.senderName ? `<div class="alert-card__meta">${escapeHtml(alert.senderName)}</div>` : ''}
      ${alert.areaDesc ? `<div class="alert-card__area">${escapeHtml(alert.areaDesc)}</div>` : ''}
      <div class="alert-card__times">
        ${alert.onset ? `<span>Onset: ${formatAlertTime(alert.onset)}</span>` : ''}
        ${alert.expires ? `<span>Expires: ${formatAlertTime(alert.expires)} (${timeUntilExpiry(alert.expires)})</span>` : ''}
      </div>
      <button class="alert-card__toggle">Show details</button>
      <div class="alert-card__details hidden">
        ${alert.description ? `<div class="alert-card__description">${escapeHtml(alert.description)}</div>` : ''}
        ${alert.instruction ? `<div class="alert-card__instruction">${escapeHtml(alert.instruction)}</div>` : ''}
      </div>
    </div>`;
}
