# Security Documentation

## Secrets Strategy

### Approach: GitHub Secrets + AWS OIDC (Federated Auth)

#### Current Implementation (GitHub Secrets)
All sensitive values are stored as GitHub Actions secrets:
- `AWS_ROLE_ARN` — AWS IAM role for OIDC federation

#### Why NOT long-lived AWS access keys:
Long-lived credentials stored in GitHub secrets are a permanent risk:
- If GitHub is compromised, credentials are exposed indefinitely
- Keys must be manually rotated
- No audit trail of which pipeline run used which credentials

#### Why OIDC (Federated Auth) is better:
```
GitHub Actions → proves identity to AWS via OIDC token
AWS IAM        → verifies token, issues SHORT-LIVED credentials (1 hour)
Pipeline       → uses temporary credentials, they expire automatically
```
- No permanent credentials stored anywhere
- Each pipeline run gets fresh credentials
- Credentials expire after 1 hour automatically
- Full audit trail in AWS CloudTrail

## What is NEVER Committed to Git
- `.env` files (blocked by `.gitignore`)
- Database passwords
- AWS access keys
- API keys or tokens
- SSL certificates

## Runtime Secret Injection
Secrets are injected as environment variables at runtime:

### In Docker Compose (local):
```bash
# Use .env file locally (never committed)
DB_PASSWORD=localpassword docker compose up
```

### In GitHub Actions (CI):
```yaml
env:
  DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
```

### In AWS ECS (production):
- Secrets stored in AWS Secrets Manager
- ECS task definition references secrets by ARN
- Container receives them as environment variables at startup

## Risk Notes and Mitigations

| Risk | Mitigation |
|------|-----------|
| DB credentials in logs | `spring.jpa.show-sql=false` in production |
| Container runs as root | Non-root user in Dockerfile (appuser) |
| Exposed ports in prod | ALB/security groups restrict access |
| Dependency vulnerabilities | `npm audit` + Maven dependency scan in pipeline |
| Secrets in git history | `.gitignore` + pre-commit hooks |

## Red Flags We Avoided
- ❌ No secrets committed to git
- ❌ No `.env` with real values committed  
- ❌ No secrets printed in pipeline logs
- ❌ No hardcoded passwords in source code
