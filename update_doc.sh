#!/usr/bin/env bash

#npm run build_doc
#cp -r dist/bf-ui-lib-sandbox  ../oauthmanager/blueface_splice
#cd ../oauthmanager
#git add -A
#git commit -m "New version of bf-ui-lib documentation generated"
#git push


ng build bf-ui-lib-sandbox

ver=$(node -p -e "require('./projects/bf-ui-lib/package.json').version")
echo "Deploying document reference. version = $ver"
cp -r dist/bf-ui-lib-sandbox/* ../doc-bf-ui-lib
cd ../doc-bf-ui-lib
git add -A
git commit -m "bf-ui-lib: $ver"
git push
cd ../bf-ui-lib
