#/bin/bash

# Add Component

lower () {
 	echo $1 | perl -ne 'print lc(join("-", split(/(?=[A-Z])/)))'
}


tools="./tools/templates"

echo "\\r\\n"

if [ "$1" = "" ]
	then
    echo "!!! Enter [ComponentName]"
    echo "\\r\\n"
    exit 1
fi

name=$1
component_path="./ppc/coffee/app/components/$(lower $name)"
template_path="$component_path/$(lower $name).pug"

if [ -d $component_path ]
	then
		echo "!!! $component_path allready exist"
		echo "\\r\\n"
		exit 1
	else
    mkdir -p $component_path

    if [ ! -f $template_path ]
			then
    		cat $tools/component/index.pug | sed "s/\[componentName\]/$(lower $name)/g" | sed "s/\[controllerName\]/$name/g" > $template_path
   			
   			echo ">> $template_path created"
				echo "\\r\\n"
   fi

fi


controller_path="$component_path/$(lower $name).controllers.coffee"

if [ ! -f $controller_path ]
	then
		cat $tools/component/controller.coffee | sed "s/\[componentName\]/$name/g" > $controller_path
		echo ">> $controller_path created"
		echo "\\r\\n"
fi

directive_path="$component_path/$(lower $name).directives.coffee"

if [ ! -f $directive_path ]
	then
		cat $tools/component/directive.coffee | sed "s/\[componentDir\]/$(lower $name)/g" | sed "s/\[componentName\]/$name/g" > $directive_path
		echo ">> $directive_path created"
		echo "\\r\\n"
fi

styl_path="$component_path/$(lower $name).styl"

if [ ! -f $styl_path ]
	then
		cat $tools/component/index.styl | sed "s/\[componentName\]/$(lower $name)/g" > $styl_path
		echo ">> $styl_path created"
		echo "\\r\\n"
fi

echo ">> gulp build"
echo "\\r\\n"

gulp build

echo "\\r\\n"
echo ">> Component $name created. Use 'gulp' to continue"
echo "\\r\\n"
exit 1

