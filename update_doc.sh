npm run build_doc
cp -r dist/bf-ui-lib-sandbox  ../oauthmanager/blueface_splice
cd ../oauthmanager
git add -A
git commit -m "New version of bf-ui-lib documentation generated"
git push

