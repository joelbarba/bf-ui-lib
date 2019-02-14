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
read ccName;                                             # ccName = bfLabel
CcName=`echo "$ccName" | sed -e "s/\b\(.\)/\u\1/g"`      # CcName = BfLabel     -> Camel Case starting with Uppercase
vName=`echo $ccName | sed -e 's/\([A-Z]\)/-\L\1/g'`      # vName  = bf-label    -> Hypens all lowercase
wName=`echo $ccName"Demo"`                               # wName  = bfLabelDemo -> Camel case sufixed (wrapper comp)

echo ""
echo "Creating component ------> $ccName / <$vName> ?"
echo ""
read x

echo ""
ng generate component $ccName --project=bf-ui-lib
ng generate component $wName --project=bf-ui-lib-sandbox

# Injects component export from lib module: @NgModule({ exports: [ NewComp, ... ]
libModFile="projects/bf-ui-lib/src/lib/bf-ui-lib.module.ts"
awk -v compName="$CcName" '{ print $0 } { if ($1 == "exports:") { print "    " compName "Component,  // <--- New component" } }' $libModFile > temp.tmp 
mv temp.tmp $libModFile

echo "New component exported from lib modile ($libModFile):"
echo ""
# cat $libModFile
# echo ""


# Add template to the HTML demo wrapper of the sandbox (-demo.component.html)
wViewFile="projects/bf-ui-lib-sandbox/src/app/"$vName"-demo/"$vName"-demo.component.html"
echo ""
echo "Templating sandbox instance to test the component ---> $wViewFile"
sed "s/\[\[COMPONENT_NAME\]\]/$vName/g" demo-comp.html.template > $wViewFile

# Add template to the TS demo wrapper  of the sandbox (-demo.component.html)
wTsFile="projects/bf-ui-lib-sandbox/src/app/"$vName"-demo/"$vName"-demo.component.ts"
echo ""
echo "Templating sandbox instance to test the component ---> $wTsFile"
sed "s/\[\[COMPONENT_NAME\]\]/$vName/g" demo-comp.ts.template > $wTsFile
sed -i "s/\[\[COMPONENT_NAME_CAMEL\]\]/$CcName/g" $wTsFile


# Add the new component to lib-register.service
echo ""
echo "Adding the new component to the list of lib-register"
libServiceFile="projects/bf-ui-lib-sandbox/src/app/lib-register.service.ts"
awk -v CcName="$CcName" -v vName="$vName" -v q="'" '{ 
    if (NR == 1) { print "import { " CcName "Doc } from " q "./" vName "-demo/" vName "-demo.component" q ";" }
    { print $0 }
    { if ($1 == "export" && $3 == "compList") { print "  " CcName "Doc," } }
  }' $libServiceFile > temp.tmp
mv temp.tmp $libServiceFile


# Export the new component from public_api.ts
echo ""
echo "Adding export in public_api.ts"
apiExportFile="projects/bf-ui-lib/src/public_api.ts"
cat $apiExportFile > temp.tmp
echo "export * from './lib/"$vName"/"$vName".component';" >> temp.tmp
mv temp.tmp $apiExportFile

echo ""
echo ""
echo "----- Done -----"
echo ""