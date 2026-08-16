# Security Policy

## Reporting a vulnerability

Do not open a public issue for suspected vulnerabilities involving authentication, authorization, tenant isolation, billing data, session tokens, secrets, or data exposure.

Report security concerns privately to the maintainer with:

- the affected endpoint, component, or workflow;
- reproducible steps;
- expected and observed behaviour;
- likely impact;
- sanitized logs or screenshots when useful.

Never include passwords, JWTs, refresh tokens, API keys, database credentials, client data, invoice data, or other confidential material in a report.

## Security-sensitive areas

Changes require particular care when they affect:

- workspace/tenant scoping;
- Owner, Manager, Member, or Client authorization;
- access and refresh-session rotation;
- password reset and email verification;
- invoices, proposals, time-entry billing conversion, or client portal visibility;
- audit logs and administrative actions;
- Redis/BullMQ jobs, email delivery, metrics exposure, or deployment configuration.

Frontend visibility is never sufficient authorization. Tenant and role restrictions must remain enforced server-side and in database queries.

## Dependencies and secrets

Production secrets must remain outside source control. Before merge, run the documented quality gate including the production dependency audit.

If a credential is committed accidentally, revoke and rotate it immediately. Removing it from the current tree does not remove it from Git history.

## License and source obligations

WorkClub is licensed under AGPL-3.0-only and retains upstream provenance documented in `NOTICE`. Security fixes and deployments must continue to comply with the corresponding-source obligations described in the repository documentation.
