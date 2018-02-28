# Create overlays on top of images while keeping your text legible

### Usage:

Include the plugin's css in your `<head>`:

```html
  <link rel="stylesheet" type="text/css" href="legible-text-plugin.css">
```

Include the plugin's js in your `<body>` somewhere before your own js loads:

```html
  <script src="legible-text-plugin.js" type="text/javascript"></script>
```

Add an image to your page with an `.overlay` element and some white overlay text inside of it:

```html
<div class="legible-text-area" style="background: url('images/some-image.jpg');">
  <div class="overlay"></div>
  <span class="overlay-text">Hello there, I'm some legible text over an image!</span>
</div>
```

Initialize the plugin in your own js file, passing in the source element (with the image background on it) and the overlay element (to which the dynamic opacity will be applied):

```javascript
document.querySelectorAll('.legible-text-area').forEach(function(elem) {
  applyLegibleOpacityToElement(elem, elem.querySelector(".overlay"));
});
```