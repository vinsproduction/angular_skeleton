#/bin/bash

# Add View

lower () {
 	echo $1 | perl -ne 'print lc(join("-", split(/(?=[A-Z])/)))'
}


tools="./tools/templates"

echo "\\n"

if [ "$1" = "" ]
	then
    echo "!!! Enter [ViewName]"
    echo "\\n"
    exit 1
fi

name=$1
view_path="./ppc/coffee/app/views/$(lower $name)"

if [ -d $view_path ]
	then
		echo "!!! $view_path allready exist"
		echo "\\n"
		exit 1
	else
    mkdir -p $view_path
fi

template_path="./ppc/jade/$(lower $name).jade"

if [ ! -f $template_path ]
	then
		cat $tools/view/index.jade | sed "s/\[viewName\]/$(lower $name)/g" | sed "s/\[controllerName\]/$name/g" > $template_path
			
		echo ">> $template_path created"
		echo "\\n"
fi


controller_path="$view_path/$(lower $name).controllers.coffee"

if [ ! -f $controller_path ]
	then
		cat $tools/view/controller.coffee | sed "s/\[viewName\]/$name/g" > $controller_path
		echo ">> $controller_path created"
		echo "\\n"

fi


directive_path="$view_path/$(lower $name).directives.coffee"

if [ ! -f $directive_path ]
	then
		cat $tools/view/directive.coffee | sed "s/\[viewName\]/$name/g" > $directive_path
		echo ">> $directive_path created"
		echo "\\n"
fi

styl_dir="./ppc/styl/app/views/$(lower $name)"

if [ ! -d $styl_dir ]
	then
    mkdir -p $styl_dir
fi

styl_path="$styl_dir/$(lower $name).styl"

if [ ! -f $styl_path ]
	then
		cat $tools/view/index.styl | sed "s/\[viewName\]/$(lower $name)/g" > $styl_path
		echo ">> $styl_path created"
		echo "\\n"
fi

styl_requires_dir="$styl_dir/requires"

if [ ! -d $styl_requires_dir ]
	then
    mkdir -p $styl_requires_dir
fi

styl_meida_path="$styl_requires_dir/$(lower $name).media.styl"

if [ ! -f $styl_meida_path ]
	then
		cat $tools/view/media.styl | sed "s/\[viewName\]/$(lower $name)/g" > $styl_meida_path
		echo ">> $styl_meida_path media created"
		echo "\\n"
fi

echo ">> grunt build"
echo "\\n"

grunt build

echo "\\n"
echo ">> View $name created. Use 'grunt' to continue"
echo "\\n"
exit 1

