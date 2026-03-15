# hivespace.ui-shared

Shared Vue UI library for HiveSpace projects.

## Release Guide (NPM)

This guide explains how to publish a new version of `@hivespace/shared` using `.github/workflows/publish-new-version.yml`.

## Workflow Triggers

The publish workflow runs on:

- Manual trigger (`workflow_dispatch`)
- Push to `master`
- Push tag matching `v*.*.*`

Notes:

- PR creation does not publish.
- Merging to `master` can publish.
- Pushing a tag publishes and also validates that tag version matches `package.json`.

## Release Steps

1. Bump version:

```bash
npm version patch --no-git-tag-version
```

2. Validate locally:

```bash
npm ci
npm run type-check
npm run build
npm publish --dry-run
```

3. Commit and push release branch:

```bash
git add package.json package-lock.json README.md
git commit -m "chore(release): bump version to X.Y.Z"
git push -u origin features/version-X.Y.Z
```

4. Open PR to `master`.

5. After PR merge, create matching tag and push:

```bash
git checkout master
git pull origin master
git tag vX.Y.Z
git push origin vX.Y.Z
```

## Troubleshooting

- `npm run patch` fails: this repo has no `patch` script. Use `npm version patch --no-git-tag-version`.
- Version mismatch in workflow: ensure tag `vX.Y.Z` matches `package.json` version `X.Y.Z`.
- Version already exists on npm: bump to a new version and rerun.
