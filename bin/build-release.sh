#!/bin/bash

( cd dist
 git init
 git config user.name ${GIT_NAME}
 git config user.email ${GIT_EMAIL}
 git add .
 git commit -m "Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)
