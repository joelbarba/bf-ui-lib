
prevPkgVer=`cat projects/bf-ui-lib/package.json | grep version | cut -d"\"" -f 4`
echo "Increment version:"
npm run version_up
currPkgVer=`cat projects/bf-ui-lib/package.json | grep version | cut -d"\"" -f 4`
echo ""
echo "Going from versioin $prevPkgVer --- to ---> $currPkgVer ?"
echo "If that ok? If not, go to projects/bf-ui-lib/package.json and change it"
read x

echo ""
echo "Generate library:"
npm run pack_all

echo ""
echo "Login into NPM register (as joel.blueface)"
npm login

pkgVer=`cat dist/bf-ui-lib/package.json | grep version | cut -d"\"" -f 4`
pkgTar="./bf-ui-lib/dist/bf-ui-lib/bf-ui-lib-$pkgVer.tgz"
echo ""
echo "Publish the library (version $pkgVer)"
npm publish $pkgTar