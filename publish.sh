
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
echo "Going from version $prevPkgVer --- to ---> $currPkgVer ?"
echo "Is that ok? If not, type the version (it will update projects/bf-ui-lib/package.json)"
read x
if [ "$x" != "" ]; then
    cd projects/bf-ui-lib/
    npm version $x
    cd ../..
fi

lastCommitHash=`git log -1 --pretty=%h`
lastCommitMsg=`git log -1 --pretty=%s`
echo ""
echo "Do you want to squash the version change in 'package.json' into the last commit before you publish:"
echo ""
echo "     #$lastCommitHash : $lastCommitMsg"
echo ""
echo "(Enter=Yes, anything else=No)"
read x
if [ "$x" = "" ]; then
    git add -A
    git commit --fixup $lastCommitHash
    export GIT_EDITOR=true
    git rebase --autosquash -i HEAD~2
    export GIT_EDITOR=false
    echo "-- Version change squashed into last commit --"
    git log -1
fi


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
