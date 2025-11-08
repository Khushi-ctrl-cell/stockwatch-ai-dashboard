// Public configuration values that can be safely exposed in the codebase
export const ENV_CONFIG = {
  // API Base URL - Update this to your actual API endpoint
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://yourapi.com",
  
  // Feature flags for enabling/disabling features
  FEATURE_FLAG: import.meta.env.VITE_FEATURE_FLAG === "true" || false,
  
  // Add other non-sensitive configuration here
} as const;

// Type-safe way to access config
export type EnvConfig = typeof ENV_CONFIG;
