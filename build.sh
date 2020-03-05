#!/usr/bin/env bash
set -eu
app_li=""
while read -r DIR; do 
    rm -r "$DIR/dist"
    npm run-script build --prefix "$DIR"
    rm -rf docs/$(basename "$DIR")
    cp -r "$DIR/dist" docs/$(basename "$DIR")
    app_li="${app_li}<li><a href=\"$(basename "$DIR")/index.html\">$(basename "$DIR")</a></li>"
done< <(find . -maxdepth  1 -type d -regextype posix-egrep   -regex ".*(leaflet|openlayers).*" | sort)
app_ul="<ul>${app_li}</ul>"
sed "s#{{ applications_list }}#${app_ul}#g" index/index.html > docs/index.html
cp index/*.css docs/