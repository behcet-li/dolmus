#!/bin/bash

set -ex

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

gempath=${DIR}/_vendor/bundle

rm -rf ${DIR}/_site || true

bundle install --path ${gempath}
# find latest
rubyversion=$(ls -LA ${gempath}/ruby | sort -t "." -n -k1,1 -k2,2 -k3,3 -k4,4 | tail -n 1)
GEM_PATH=${gempath}/ruby/${rubyversion} ${gempath}/ruby/${rubyversion}/bin/jekyll build
npm install ${DIR}
# this way I don't have to depend on grunt-cli
node -e "require('grunt').tasks(['default'], { verbose: true })"
