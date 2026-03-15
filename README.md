# hivespace.ui-shared

Shared Vue UI library for HiveSpace projects.

## Release Guide (NPM)

This document explains how to publish a new version of `@hivespace/shared` using the GitHub workflow in `.github/workflows/publish-new-version.yml`.

## Important Workflow Behavior

Current publish workflow triggers on:

- Manual run: `workflow_dispatch`
- Push to `master`
- Push tag matching `v*.*.*`

What this means:

- Opening a PR does not trigger publish.
- Merging a PR to `master` does trigger publish.
- Pushing a tag like `v1.1.3` also triggers publish.
- Tag validation (tag must match `package.json` version) only happens on tag-triggered runs.

## Prerequisites

- You can push branches and tags to this repository.
- Repository has `NPM_TOKEN` configured in GitHub secrets.
- You are authenticated locally for git operations.

## Version Bump Commands

There is no `npm run patch` script in this repo.
Use npm version directly:

```bash
npm version patch --no-git-tag-version
# or
npm version minor --no-git-tag-version
# or
npm version major --no-git-tag-version
```

This updates `package.json` (and lock file if changed) without creating a git tag locally.

## Recommended Team Release Flow

### 1) Create release branch

```bash
git checkout -b release/vX.Y.Z
```

### 2) Bump package version

```bash
npm version patch --no-git-tag-version
```

### 3) Validate locally

```bash
npm ci
npm run type-check
npm run build
npm publish --dry-run
```

### 4) Commit and push

```bash
git add package.json package-lock.json README.md
git commit -m "chore(release): bump version to X.Y.Z"
git push -u origin release/vX.Y.Z
```

### 5) Open PR to `master`

- Create PR from `release/vX.Y.Z` to `master`.
- Get approvals and merge.

### 6) Create and push release tag from master

After PR merge, tag the merge commit on master with the same version:

```bash
git checkout master
git pull origin master
git tag vX.Y.Z
git push origin vX.Y.Z
```

This tag-based run validates that:

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
