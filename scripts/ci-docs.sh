#!/bin/sh
set -e
set -x

cd fitness-tracker-web
npm install
PUBLIC_URL=https://bsingr.github.io/fitness-tracker/ npm run build
cd ..
rm -rf ./docs
mv ./fitness-tracker-web/build ./docs
rm -rf ./docs/data
cp -R ./data ./docs/
