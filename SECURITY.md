# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

Please report security vulnerabilities by emailing the project maintainers. Do not create public GitHub issues for security vulnerabilities.

In your report, please include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes

We will respond to security reports within 48 hours and will keep you informed of the progress towards a fix.

## Security Best Practices

When contributing to this project:

1. Never commit sensitive information (API keys, passwords, etc.)
2. Use environment variables for all secrets
3. Keep dependencies up to date
4. Follow OWASP security guidelines
5. Enable 2FA on your GitHub account

## API Key Security

This project uses OpenAI API keys. To keep them secure:

- Never commit `.env` or `.env.local` files
- Use the `.env.example` template
- Rotate your API keys regularly
- Monitor API usage for anomalies
- Set usage limits on your OpenAI account
