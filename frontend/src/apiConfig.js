// Auto-detects backend URL:
// - In development: empty string → Vite proxy handles /api/* → localhost:3001
// - In production: use VITE_API_URL env var set in Vercel dashboard
const API_BASE = import.meta.env.VITE_API_URL || '';

export default API_BASE;
