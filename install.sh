#/bin/bash

echo "\\n"
echo ">> git clone..."
echo "\\n"

git clone https://github.com/vinsproduction/angular_skeleton repo

mv repo/* .

rm -rf repo

echo "\\n"
echo ">> done."
echo "\\n"

echo ">> npm install..."
echo "\\n"

npm install

echo "\\n"
echo ">> done."

echo "\\n"
echo ">> continue to use - grunt"


echo "\\n"

exit 1