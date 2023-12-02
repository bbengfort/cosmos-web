const config = {
  environment: import.meta.env.NODE_ENV,
  apiBaseURL: import.meta.env.VITE_API_BASE_URL,
  appInfo: {
    version: import.meta.env.VITE_VERSION_NUMBER,
    revision: import.meta.env.VITE_GIT_REVISION,
  },
}

export const isProduction = () => {
  return config.environment === 'production';
}

export default config;