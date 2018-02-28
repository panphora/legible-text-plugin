// Use this plugin to apply a legible opacity to an overlay that covers an image

(function () {
  /*
    sourceElement: can be an <img> element or an element with a background image
    overlayElement: the element we apply the opacity to (this element should cover the image completely and have a background color of black to start)
    relativeOpacity: if you want to make the opacity a little lighter relative to the image's luminosity you can do that here
      - valid values: anything between 0 and 1
  */
  function applyLegibleOpacityToElement (sourceElement, overlayElement, relativeOpacity) {
    var imgSrcString;
    
    if (sourceElement.tagName.toLowerCase() === "img") {
      imgSrcString = sourceElement.src;
    } else {
      imgSrcString = getImageFromBackgroundOnElement(sourceElement);
    }

    getLuminosityOfImage(imgSrcString, function (luminosity) {
      var relativeOpacity = relativeOpacity || .8;
      var overlayOpacityValue = luminosity * relativeOpacity;
      overlayElement.style.opacity = overlayOpacityValue;
    });
  }

  // returns 0 -> 1: 0 (black), 1 (white)
  function getLuminosityOfImage (imgSrc, callback) {
    var imgElem = new Image();
    imgElem.src = imgSrc;

    /* When the dom image loads, proceed with the calculations */
    imgElem.onload = function() {
      var luminosity = getLuminosity(imgElem);
      callback(luminosity);
    };
  }

  function getImageFromBackgroundOnElement (elem) {
    var bgImageStyleString = elem.style.backgroundImage;
    var bgImageRegex = /^url\((['"]?)(.*)\1\)$/;
    var bgImageRegexResult = bgImageRegex.exec(bgImageStyleString);
    return bgImageRegexResult ? bgImageRegexResult[2] : "";
  }

  /* Returns a luminosity value between 0 and 1 based on the image's brightness */
  function getLuminosity(img) {
    var rgb = getAverageColor(img)
    var luminosity255 = (rgb.r * 2 + rgb.g *3 + rgb.b) / 6
    var luminosity = luminosity255 / 255
    return luminosity
  }

  /* Returns an RGB object of an image's average color */
  function getAverageColor(img) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width = img.naturalWidth;
    var height = canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, width, height);
    var data = imageData.data;
    var r = 0;
    var g = 0;
    var b = 0;

    for (var i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i+1];
      b += data[i+2];
    }

    r = Math.floor(r / (data.length / 4));
    g = Math.floor(g / (data.length / 4));
    b = Math.floor(b / (data.length / 4));

    return { r: r, g: g, b: b };
  }

  window.applyLegibleOpacityToElement = applyLegibleOpacityToElement;
}());

