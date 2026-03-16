/**
 * PDS Tracker — Entry point
 * Monitors all active NWS alerts for "Particularly Dangerous Situation" designations
 */

import { REFRESH_INTERVAL } from './config/constants.js';
import { store } from './state/store.js';
import { fetchAllActiveAlerts } from './api/nwsAlerts.js';
import { filterPDSAlerts } from './utils/pdsFilter.js';
import { renderHeader } from './ui/header.js';
import { renderStatsBar } from './ui/statsBar.js';
import { renderAlertList } from './ui/alertList.js';

let headerEl, statsBarEl, alertListEl;
let refreshTimer = null;

function render() {
  const pdsAlerts = store.get('pdsAlerts');
  const allAlertCount = store.get('allAlertCount');
  const lastFetchTime = store.get('lastFetchTime');
  const isLoading = store.get('isLoading');
  const error = store.get('error');

  renderHeader(headerEl, { lastFetchTime, isLoading, onRefresh: fetchAndRender });
  renderStatsBar(statsBarEl, { pdsAlerts, allAlertCount });
  renderAlertList(alertListEl, { pdsAlerts, allAlertCount, isLoading, error });
}

async function fetchAndRender() {
  store.set('isLoading', true);
  store.set('error', null);

  try {
    const { features, totalCount, fetchedAt } = await fetchAllActiveAlerts();
    const pdsAlerts = filterPDSAlerts(features);

    store.update({
      pdsAlerts,
      allAlertCount: totalCount,
      lastFetchTime: fetchedAt,
      isLoading: false
    });
  } catch (err) {
    console.error('Fetch failed:', err);
    store.update({
      error: err.message,
      isLoading: false
    });
  }

  render();
}

function init() {
  headerEl = document.getElementById('header');
  statsBarEl = document.getElementById('stats-bar');
  alertListEl = document.getElementById('alert-list');

  // Initial render (loading state)
  render();

  // Fetch immediately, then on interval
  fetchAndRender();
  refreshTimer = setInterval(fetchAndRender, REFRESH_INTERVAL);
}

document.addEventListener('DOMContentLoaded', init);
