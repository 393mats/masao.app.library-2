# masao.app.library-2

This is the Javascript library to make your Super Masao Editor on your website.

You can customize the editor with the HTML, JS and CSS.

## Getting started

Please import JS and CSS files into <head\>
```
<link rel="stylesheet" href="./css/mal.css">
<script type="text/javascript" src="./js/mal.js"></script>
```

## Initialize

Please make boxes to place editor components.

This is an example:
```
<!-- Complete map view -->
<div id="cmv"></div>

<!-- Main editor -->

<div id="edt"></div>

<!-- Normal layer palette -->

<div id="plt1"></div>

<!-- Background layer palette -->

<div id="plt2"></div>
```

And then, write an initialize method with the JS into <body\>


```
<script type="text/javascript">

new mal.init({
  "editor": {
    "id": "edt",                // Element id for main editor
    "grid": "1",                // Show grid, or not. 1: show, 0: hidden
    "map-view-id": "cmv"        // Element id for complete map view
  },
  "palette": {
    "id-1": "plt1",             // Element id for Normal layer palette
    "id-2": "plt2",             // Element id for Background layer palette
    "parts": "./parts.png",     // Parts image file name
    "mapchip": "./mapchip.gif"  // Mapchip image file name
  }
});

</script>
```

## Methods
