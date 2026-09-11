/**
 * GRC Engine REST API Client Service
 * Communicates with FastAPI backend (/api/v1) with fallback support.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';
const HEALTH_URL = import.meta.env.VITE_HEALTH_URL || 'http://127.0.0.1:8000/health';

class ApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('grc_token') : null;

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: response.statusText }));
        const error = new Error(errorData.detail || `Request failed with status ${response.status}`);
        error.status = response.status;
        error.data = errorData;
        throw error;
      }
      return await response.json();
    } catch (err) {
      console.warn(`[API] Request to ${url} failed:`, err.message);
      throw err;
    }
  }

  // Health Check
  async checkHealth() {
    try {
      const res = await fetch(HEALTH_URL, { method: 'GET', signal: AbortSignal.timeout(3000) });
      if (!res.ok) return { online: false, status: 'error' };
      const data = await res.json();
      return { online: true, ...data };
    } catch (err) {
      return { online: false, error: err.message };
    }
  }

  // Integrations Endpoints
  async getIntegrations() {
    return this.request('/integrations');
  }

  async testGitHubConnection(payload) {
    return this.request('/integrations/github/test', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async connectGitHub(payload) {
    return this.request('/integrations/github/connect', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Discovered Assets Endpoints
  async getAssets(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/assets${query ? `?${query}` : ''}`);
  }

  // Canonical Controls & Frameworks
  async getCanonicalControls() {
    return this.request('/controls/canonical');
  }

  async getFrameworks() {
    return this.request('/controls/frameworks');
  }

  // Findings Endpoints
  async getFindings(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/findings${query ? `?${query}` : ''}`);
  }

  async resolveFinding(findingId, resolutionNotes = '') {
    return this.request(`/findings/${findingId}/resolve`, {
      method: 'POST',
      body: JSON.stringify({ resolution_notes: resolutionNotes }),
    });
  }

  // Cryptographic Evidence Vault
  async getEvidence() {
    return this.request('/evidence');
  }

  async verifyEvidence(evidenceId) {
    return this.request(`/evidence/${evidenceId}/verify`);
  }

  // Continuous Scans Endpoints
  async getScans() {
    return this.request('/scans');
  }

  async triggerScan(payload = { target_scope: 'ALL' }) {
    return this.request('/scans/trigger', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Attestation Reports Summary
  async getReportSummary() {
    return this.request('/reports/summary');
  }
}

export const api = new ApiClient();
export default api;
