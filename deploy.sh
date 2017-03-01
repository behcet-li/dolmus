#! /bin/bash

set -ex

host=deployer@${DEPLOY_SERVER:-dolm.us}
deploysign=$(date +%m-%d-%y-%H_%M)
target=/home/deployer/dolmus/$deploysign

function link {
  if [[ -L "$2" ]]; then
    # it is a symlink. delete it
    rm -rf "$2" 2>/dev/null
  elif [[ -e "$2" ]]; then
    # back up old file
    mv -f "$2" "$2.old" 2>/dev/null
  fi
  ln -s "$1" "$2"
}

rsync -avz ~/clone/_site/ $host:$target
ssh $host "$(typeset -f); link $target /var/dolmus/live"
