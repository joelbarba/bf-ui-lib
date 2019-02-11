# Check git status
isClean=`git status | grep "nothing to commit, working directory clean" | wc -l`
if [ "$isClean" = "0" ]; then
    echo ""
    git status
    echo ""
    echo "ALERT!!! The repository is not clean. You should commit your last changes to set a label. Proceed anyway?"
    read x
fi


echo ""
echo "What is the name for the new component? (camelCase):"
read ccName;
viewName=`echo $ccName |sed -e 's/\([A-Z]\)/-\L\1/g'`
wName=`echo $ccName"Demo"`

echo ""
echo "Creating component ------> $ccName / <$viewName> ?"
echo ""
read x

echo ""
ng generate component $ccName --project=bf-ui-lib
# ng g c $$wName --project=bf-ui-lib-sandbox