# masao.app.library-2

This is the Javascript library to make your Super Masao Editor on your website.

You can customize the editor with the HTML, JS and CSS.

## Getting started

Please import JS and CSS files into <head\>.
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

And then, write an Initialization method with the JS into <body\>.


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

### mal.init(Data)

Initialize editor.

### mal.add(Event name, Func)

Add your functions into an event.

|Event name|Arguments|イベント|
|---|---|---|
|edt_clicked|x, y, chip|Clicked on the main editor|
|edt_moved|x, y, chip|Moved on the main editor|
|plt1_clicked|x, y, chip|Clicked on the Normal layer editor|
|plt2_clicked|x, y, chip|Clicked on the Background layer editor|

### mal.switchLayer(Int)

Switch layer mode.

|Int|Layer mode|
|---|---|
|0|Background layer|
|1|Normal layer|

### mal.getLayerMode()

Get now layer mode.

### mal.switchGrid(Int)

Switch layer mode.

|Int|grid mode|
|---|---|
|0|Hidden|
|1|Visible|

### mal.getGridMode()

Get now grid mode.

### mal.getHTML()

Get Canvas Masao's stage data
