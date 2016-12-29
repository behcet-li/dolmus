#!/bin/bash

set -ex

(rvm && rvm use $(cat .ruby-version) --install) || true

(nvm && nvm install $(cat .node-version)) || true

ruby --version
bundle --version
npm --version
node --version

SOURCE="${BASH_SOURCE[0]}"
# resolve $SOURCE until the file is no longer a symlink
while [ -h "$SOURCE" ]; do
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

rm -rf ${DIR}/_site || true

gempath=${DIR}/_vendor/bundle
bundle install --path ${gempath}
JEKYLL_ENV=production bundle exec jekyll build
npm install ${DIR}
# this way I don't have to depend on grunt-cli
node -e "require('grunt').tasks(['default'], { verbose: true })"
