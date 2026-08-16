## Summary

Describe the problem and the change.

## Verification

- [ ] `npm run lint`
- [ ] `npm test`
- [ ] Integration tests run when persistence or authorization changes
- [ ] `npm run build`
- [ ] `npm audit --omit=dev --audit-level=high`
- [ ] Playwright E2E run when a user-facing workflow changes

## Security and tenancy review

- [ ] Workspace scoping remains enforced in database/API logic
- [ ] Role authorization is enforced server-side
- [ ] No secrets, tokens, client data, or billing data are committed
- [ ] Session/authentication impact has been reviewed when applicable
- [ ] OpenAPI/docs/changelog updated when behaviour changes

## Provenance and licensing

- [ ] `NOTICE` and AGPL-3.0-only provenance are preserved
- [ ] Corresponding-source obligations are considered for deployment changes

## Operational notes

Document migrations, queue/Redis impact, environment changes, deployment steps, or rollback considerations when relevant.
