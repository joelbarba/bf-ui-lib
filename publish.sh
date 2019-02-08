
# Check git status
isClean=`git status | grep "nothing to commit, working directory clean" | wc -l`
if [ "$isClean" = "0" ]; then
    echo ""
    git status
    echo ""
    echo "ALERT!!! The repository is not clean. You should commit your last changes to set a label. Proceed anyway?"
    read x
fi

# Versioning
prevPkgVer=`cat projects/bf-ui-lib/package.json | grep version | cut -d"\"" -f 4`
echo "Increment version:"
npm run version_up
currPkgVer=`cat projects/bf-ui-lib/package.json | grep version | cut -d"\"" -f 4`
echo ""
echo "Going from versioin $prevPkgVer --- to ---> $currPkgVer ?"
echo "If that ok? If not, go to projects/bf-ui-lib/package.json and change it"
read x

# Packing
echo ""
echo "Generate library:"
npm run pack_all

# Publishing
echo ""
echo "Login into NPM register (as joel.blueface)"
npm login

pkgVer=`cat dist/bf-ui-lib/package.json | grep version | cut -d"\"" -f 4`
pkgTar="./dist/bf-ui-lib/bf-ui-lib-$pkgVer.tgz"
echo ""
echo "Publish the library (version $pkgVer) Tar File: $pkgTar"
npm publish $pkgTar