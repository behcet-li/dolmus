#!/bin/bash

function run {
  "$@"
  local status=$?
  if [ $status -ne 0 ]; then
    echo "error with $1" >&2;
    exit 1;
  fi
  return $status
}

run bundle install
run jekyll build