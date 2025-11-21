const domain = "http://localhost:4000/"

function sanitizeDomain(domain) {
  if (!domain) return "";
  return domain.endsWith("/") ? domain.slice(0, -1) : domain;
}

const api_url = sanitizeDomain(domain);

const summaryApi = {
  auth: {
    login: `${api_url}/api/auth/login`,
    register: `${api_url}/api/auth/register`,
    me: `${api_url}/api/auth/me`,
    logout: `${api_url}/api/auth/logout`
  }
}

export default summaryApi