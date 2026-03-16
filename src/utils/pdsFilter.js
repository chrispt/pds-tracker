/**
 * Filter NWS alert features for "particularly dangerous situation" and categorize
 */

import { PDS_PHRASE } from '../config/constants.js';

/**
 * @param {Array} features - GeoJSON alert features
 * @returns {Array} PDS alerts with category and simplified properties
 */
export function filterPDSAlerts(features) {
  return features
    .filter(isPDS)
    .map(transformPDSAlert);
}

function isPDS(feature) {
  const p = feature.properties;
  const phrase = PDS_PHRASE;

  const description = (p.description || '').toLowerCase();
  if (description.includes(phrase)) return true;

  const headline = (p.headline || '').toLowerCase();
  if (headline.includes(phrase)) return true;

  const nwsHeadlines = p.parameters?.NWSheadline || [];
  for (const h of nwsHeadlines) {
    if (h.toLowerCase().includes(phrase)) return true;
  }

  return false;
}

function transformPDSAlert(feature) {
  const p = feature.properties;
  return {
    id: p.id,
    event: p.event,
    severity: p.severity,
    urgency: p.urgency,
    headline: p.headline,
    description: p.description,
    instruction: p.instruction,
    areaDesc: p.areaDesc,
    senderName: p.senderName,
    onset: p.onset ? new Date(p.onset) : null,
    expires: p.expires ? new Date(p.expires) : null,
    category: categorize(p.event)
  };
}

function categorize(event) {
  const e = (event || '').toLowerCase();
  if (e.includes('tornado')) return 'tornado';
  if (e.includes('severe thunderstorm') || e.includes('severe tstorm')) return 'svr-tstorm';
  return 'other';
}
