#!/bin/sh
set -e
set -x

npm install
npm test
npm run inbox-runs
npm run data:refresh
./scripts/ci-git-commit-and-push
