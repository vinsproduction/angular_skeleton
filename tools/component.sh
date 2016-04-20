#/bin/bash

# Add Component

lower () {
 	echo $1 | perl -ne 'print lc(join("-", split(/(?=[A-Z])/)))'
}


tools="./tools/templates"

echo "\\n"

if [ "$1" = "" ]
	then
    echo "!!! Enter [ComponentName]"
    echo "\\n"
    exit 1
fi

name=$1
component_path="./ppc/coffee/app/components/$(lower $name)"
template_path="$component_path/$(lower $name).jade"

if [ -d $component_path ]
	then
		echo "!!! $component_path allready exist"
		echo "\\n"
		exit 1
	else
    mkdir -p $component_path

    if [ ! -f $template_path ]
			then
    		cat $tools/component/index.jade | sed "s/\[componentName\]/$(lower $name)/g" | sed "s/\[controllerName\]/$name/g" > $template_path
   			
   			echo ">> $template_path created"
				echo "\\n"
   fi

fi


controller_path="$component_path/$(lower $name).controllers.coffee"

if [ ! -f $controller_path ]
	then
		cat $tools/component/controller.coffee | sed "s/\[componentName\]/$name/g" > $controller_path
		echo ">> $controller_path created"
		echo "\\n"
fi

directive_path="$component_path/$(lower $name).directives.coffee"

if [ ! -f $directive_path ]
	then
		cat $tools/component/directive.coffee | sed "s/\[componentDir\]/$(lower $name)/g" | sed "s/\[componentName\]/$name/g" > $directive_path
		echo ">> $directive_path created"
		echo "\\n"
fi

styl_path="$component_path/$(lower $name).styl"

if [ ! -f $styl_path ]
	then
		cat $tools/component/index.styl | sed "s/\[componentName\]/$(lower $name)/g" > $styl_path
		echo ">> $styl_path created"
		echo "\\n"
fi

echo ">> grunt build"
echo "\\n"

grunt build

echo "\\n"
echo ">> Component $name created. Use 'grunt' to continue"
echo "\\n"
exit 1

