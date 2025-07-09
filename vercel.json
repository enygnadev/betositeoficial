{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "redirects": [
    {
      "source": "/admin",
      "destination": "/trap/honeypot",
      "statusCode": 301
    },
    {
      "source": "/phpmyadmin",
      "destination": "/trap/honeypot",
      "statusCode": 301
    },
    {
      "source": "/.env",
      "destination": "/trap/honeypot",
      "statusCode": 301
    },
    {
      "source": "/wp-login.php",
      "destination": "/trap/honeypot",
      "statusCode": 301
    },
    {
      "source": "/config.json",
      "destination": "/trap/honeypot",
      "statusCode": 301
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src *; font-src 'self'; frame-ancestors 'none'"
        }
      ]
    }
  ]
}
