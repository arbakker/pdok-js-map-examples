#!/usr/bin/env bash
set -eu
app_li=""
rm -rf ./dist
mkdir -p ./dist
while read -r DIR; do
    echo "###"
    echo "### ${DIR} ###"
    echo "###"
    cd "$DIR"
    rm -rf "./dist"
    npm install .
    npm run-script build
    cd ..
    cp -r "$DIR/dist" "dist/$(basename "$DIR")"
    app_li="${app_li}<li><a href=\"$(basename "$DIR")/\">$(basename "$DIR")</a></li>"
done < <(find . -maxdepth 1 -type d -regextype posix-egrep -regex ".*(leaflet|openlayers|maplibre).*" | sort)
app_ul="<ul>${app_li}</ul>"
sed "s#{{ applications_list }}#${app_ul}#g" index/index.html > ./dist/index.html
cp index/*.css dist/
