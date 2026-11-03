#!/bin/sh
# Generate env-config.js dynamically from container environment variables at runtime
cat <<EOF > /usr/share/nginx/html/env-config.js
window.__ENV__ = {
  VITE_API_URL: "${VITE_API_URL}"
};
EOF

# Execute container CMD (start Nginx)
exec "$@"

