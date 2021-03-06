# Angular Skeleton

https://github.com/vinsproduction/angular_skeleton/wiki

##### Install

Download 'install.sh' to the project folder

```
wget  https://raw.githubusercontent.com/vinsproduction/angular_skeleton/master/install.sh
```

and run command

```
sh install.sh
```

##### Add new view
```
sh tools/view.sh myNewView
```

##### Add new component
```
sh tools/component.sh myNewComponent
```
##### DEBUG MODE

Add prefix 'debug' to URL

example
```
http://localhost:3000/?debug
```

## App directory structure


### Jade

```
ppc
|
├── jade
|   |
|   ├── index.jade
|   |
|   ├── base
|   |   |
|   |   ├── layout.jade
|   |   ├── header.jade
|   |   ├── footer.jade
|   |   └── popups.jade
|   |   
|   └── views
|       |
|       ├── home.jade
|       └── about.jade
|
```
### Stylus

```
ppc
|
├── styl
|    ├── app
|    |   |
|    |   ├── app.styl
|    |   |
|    |   ├── base
|    |   |   |
|    |   |   ├── layout
|    |   |   |   ├── layout.styl
|    |   |   |   └── requires
|    |   |   |       └── layout.media.styl
|    |   |   └── popups
|    |   |       ├── popups.styl
|    |   |       └── requires
|    |   |           └── popups.media.styl
|    |   |   
|    |   └── views
|    |       |
|    |       ├── home
|    |       |   ├── home.styl
|    |       |   └── requires
|    |       |       └── home.media.styl
|    |       └── about
|    |           ├── about.styl
|    |           └── requires
|    |               └── about.media.styl
|    |   
|    └── libs
|
|
```
### CoffeeScript

```
ppc
|
├── coffee
|    ├── app
|    |   |
|    |   ├── app.coffee
|    |   ├── app.config.coffee
|    |   ├── app.commons.coffee
|    |   ├── app.controllers.coffee
|    |   ├── app.directives.coffee
|    |   ├── app.services.coffee
|    |   |
|    |   ├── base
|    |   |   |
|    |   |   ├── layout
|    |   |   |   ├── layout.controllers.coffee
|    |   |   |   └── layout.directives.coffee
|    |   |   |  
|    |   |   └── popups
|    |   |       ├── popups.controllers.coffee
|    |   |       └── popups.directives.coffee
|    |   |   
|    |   ├── components
|    |   |   |
|    |   |   ├── timer
|    |   |   |   ├── index.jade
|    |   |   |   ├── index.styl
|    |   |   |   ├── controller.coffee
|    |   |   |   ├── directive.coffee
|    |   |   |   └── service.coffee
|    |   |   |
|    |   |   └── captha
|    |   |       ├── index.jade
|    |   |       ├── index.styl
|    |   |       ├── controller.coffee
|    |   |       ├── directive.coffee
|    |   |       └── service.coffee
|    |   |   
|    |   └── views
|    |       |
|    |       ├── home
|    |       |   ├── home.controllers.coffee
|    |       |   └── home.directives.coffee
|    |       |  
|    |       └── about
|    |           ├── about.controllers.coffee
|    |           └── about.directives.coffee
|    |   
|    └── libs
|
```
