/**
 * Fetch all active NWS alerts nationwide
 */

import { NWS_ALERTS_URL, NWS_USER_AGENT } from '../config/constants.js';

/**
 * @returns {Promise<{features: Array, totalCount: number, fetchedAt: Date}>}
 */
export async function fetchAllActiveAlerts() {
  const response = await fetch(NWS_ALERTS_URL, {
    headers: {
      'Accept': 'application/geo+json',
      'User-Agent': NWS_USER_AGENT
    }
  });

  if (!response.ok) {
    throw new Error(`NWS API returned ${response.status}`);
  }

  const data = await response.json();
  const features = data.features || [];

  return {
    features,
    totalCount: features.length,
    fetchedAt: new Date()
  };
}
