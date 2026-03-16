/**
 * Simplified pub/sub store for PDS Tracker
 */

const initialState = {
  pdsAlerts: [],
  allAlertCount: 0,
  lastFetchTime: null,
  isLoading: false,
  error: null
};

class Store {
  constructor() {
    this._state = { ...initialState };
    this._listeners = new Map();
  }

  get(key) {
    return this._state[key];
  }

  set(key, value) {
    const oldValue = this._state[key];
    if (oldValue === value) return;
    this._state[key] = value;
    this._notify(key, value, oldValue);
  }

  update(updates) {
    Object.entries(updates).forEach(([key, value]) => this.set(key, value));
  }

  subscribe(key, callback) {
    if (!this._listeners.has(key)) {
      this._listeners.set(key, new Set());
    }
    this._listeners.get(key).add(callback);
    return () => this._listeners.get(key)?.delete(callback);
  }

  _notify(key, newVal, oldVal) {
    this._listeners.get(key)?.forEach(cb => {
      try { cb(newVal, oldVal, key); }
      catch (e) { console.error(`Store listener error [${key}]:`, e); }
    });
    this._listeners.get('*')?.forEach(cb => {
      try { cb(newVal, oldVal, key); }
      catch (e) { console.error('Store global listener error:', e); }
    });
  }
}

export const store = new Store();
