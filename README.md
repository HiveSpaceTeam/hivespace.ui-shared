# hivespace.ui-shared

Shared Vue UI library for HiveSpace projects.

## Release Guide (NPM)

This document explains how to publish a new version of `@hivespace/shared` using the GitHub workflow in `.github/workflows/publish-new-version.yml`.

## Important Workflow Behavior

Publish workflow in `.github/workflows/publish-new-version.yml` triggers on:

- Manual run: `workflow_dispatch`
- Push tag matching `v*.*.*`

Version automation workflow in `.github/workflows/auto-bump-and-tag.yml` triggers on:

- Push to `master` (including PR merge)

What this means:

- Opening a PR does not trigger publish.
- Merging a PR to `master` triggers auto bump + auto tag.
- Auto-created tag (for example `v1.1.5`) triggers publish.
- Publish always happens from tag event, not directly from merge.

## Prerequisites

- You can push branches and tags to this repository.
- Repository has `NPM_TOKEN` configured in GitHub secrets.
- Repository has `RELEASE_PAT` configured in GitHub secrets for `.github/workflows/auto-bump-and-tag.yml`.
- You are authenticated locally for git operations.

## Recommended Team Release Flow

### 1) Create release branch

```bash
git checkout -b release/vX.Y.Z
```

### 2) Validate locally

```bash
npm ci
npm run type-check
npm run build
npm publish --dry-run
```

### 3) Commit and push

```bash
git add .
git commit -m "feat/fix/chore: your changes"
git push -u origin release/vX.Y.Z
```

### 4) Open PR to `master`

- Create PR from `release/vX.Y.Z` to `master`.
- Get approvals and merge.

### 5) Automatic release after merge

After merge to `master`, GitHub Actions will automatically:

- bump patch version in `package.json` and `package-lock.json`
- commit the version bump to `master`
- create and push matching tag `vX.Y.Z`
- trigger publish workflow from the pushed tag

The auto bump workflow skips its own release-bump commits by commit-message guard, avoiding recursion without using `[skip ci]`.

Tag-based publish validates that:

- `package.json` version equals tag version (without `v`)
- Version does not already exist on npm

Then the workflow publishes to npm.

## Troubleshooting

### `npm run patch` fails

Expected in this repo because `patch` script does not exist. Use `npm version patch --no-git-tag-version`.

### Workflow fails with version mismatch

On a tag-triggered run, ensure:

- Tag: `v1.2.3`
- `package.json` version: `1.2.3`

### Workflow fails: version already exists

That version is already published on npm. Bump to a new version and run again.

### Auto bump workflow cannot push to master

If branch protection blocks workflow pushes, allow GitHub Actions bot to push to `master` or use a PAT-based workflow.

### Auto bump runs but publish workflow does not trigger

If auto bump pushes with `GITHUB_TOKEN`, downstream workflows are not triggered. Configure `RELEASE_PAT` and use it for checkout/push so tag push triggers `.github/workflows/publish-new-version.yml`.
