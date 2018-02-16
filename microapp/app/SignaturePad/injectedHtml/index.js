var content = (pcolor, backgroundColor, dataURL) =>
  `<html>
    <head>
    <style>
    *
    {margin:0;padding:0;overflow:hidden}
    .border{
      
      border:1px solid 	#C0C0C0;
      border-radius:10px;
     
    }
    html, body 
    {margin: 0; height: 100%; overflow: hidden
    },
    
    canvas
    {
      position:absolute;transform:translateZ(0);
      /* In case the React Transformation is not performant, we'll fall back to this one

      transform-origin:left top;
      -ms-transform-origin:left top;
      -webkit-transform-origin:left top;
      transform:rotate(-90deg) translate(-100%, 0px);
      -ms-transform:rotate(-90deg)  translate(-100%, 0px);
      -webkit-transform:rotate(-90deg)  translate(-100%, 0px);*/
    }

    </style>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
    </head>
    <body >
      
      <canvas style="margin-left: 48;margin-right:48; margin-top: 0;overflow:hidden"></canvas>
      <div id="content" style="background-color:#2b2b2b;position:absolute; width:38 ;height:100% ;left:10; top:0; border-right:1px solid #898989">
      <ul style="position:fixed; top:0;overflow: hidden"> 
        <li class= "border" data-value="#808080" style = "background-color :#808080; width:20;height:20; border-radius: 11px;margin-top:10" onclick="myFunction('#808080')" ></li>
        <li data-value="#FF0000" style = "background-color :#FF0000; width:20;height:20;border-radius:11px;margin-top:10" onclick="myFunction('#FF0000')"></li>
        <li data-value="#0000FF" style = "background-color :#0000FF; width:20;height:20;border-radius:11px;;margin-top:10" onclick="myFunction('#0000FF')"></li>
        <li data-value="#800080" style = "background-color :#800080; width:20;height:20;border-radius:11px;;margin-top:10" onclick="myFunction('#800080')"></li>
        <li data-value="#FFFF00" style = "background-color :#FFFF00; width:20;height:20;border-radius:11px;;margin-top:10" onclick="myFunction('#FFFF00')"></li>
        <li data-value="#FFA500" style = "background-color :#FFA500; width:20;height:20;border-radius:11px;;margin-top:10" onclick="myFunction('#FFA500')"></li>
        <li data-value="#FFFFFF" style = "background-color :#FFFFFF; width:20;height:20;border-radius:11px;;margin-top:10" onclick="myFunction('#FFFFFF')"></li>
        <li data-value="#00FF00" style = "background-color :#00FF00; width:20;height:20;border-radius:11px;;margin-top:10" onclick="myFunction('#00FF00')"></li>
        <li data-value="#00FFFF" style = "background-color :#00FFFF; width:20;height:20;border-radius:11px;;margin-top:10" onclick="myFunction('#00FFFF')"></li>
      </ul>
      </div>
      <div style="background-color:#2b2b2b;position:absolute; width:48 ;height:100% ;right:0; top:0; border-left:1px solid #898989">
      <ul style="position:fixed; top:0;overflow: hidden"> 
        <li data-value="#00FFFF" id="clear"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAAGVn0euAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAFlElEQVR4Ae1dv28cRRS2CSYEBEqKIIFSuDIoCCFRI7lACRINHUEgXOAULpCQEkVKqvwBUNAhpSBKQRQ7DYgiCGpKCn5VFEHCFgakYGSMIkHsfN9mRn47ntud29vdm7O/kZ7mzZv33rz3zeze3u7s3dTUPi07KEwN1c3aFKG0UaX0UKyTI7iyZ4SogXHyveHjLDwfifdIOjEIYBJvhMHWLY1Qf6rOYHqPRSjgKvUyy3uZ6n2NAKc8KEspCVcuLDpMcUKdaZRU3ZIexijOy6i32OEHRT0PWi4pRxp1h441ecw2wL8HSs4wsN1tIsrfd1tlDn2flSUNW3B0FrSnNHQnMyEgBCYOgeRTLM8TNrvGp2frxPLw/79vh4N5eaweeLqGk8t05AuMDxm++Fyw7ZjzJBmdDFKs6vM2AzPwCr6Gs0ugebZTHHu72to7Q30HtGIH8H1VTpIzqHJS1TfMAD/AEandUgVDVZ+PYpgMvE1Rw/kFMGslYdMGI42U9ab+ZCcEhIAQEAJC4EAjgA/VY6DVyIcrRVeyB8cHHgvU9e25YR3TTZUlf/GwDhHIV2ifsrI2+Na/zKQEhWQ2iGyKrtWByY0mdtYH+cZXpKGjcbVbT4CootxhQqhX2PDJkUdp9RhoPQEfbF/1xCfwcNtI2TMJ+Desf9tn5WPlsaavFyt7Z2d2mEBgs027YWxiuiPPAFB9C3H8C+e3XTzfgP8pNhhkj4LeBh1if5YzwsBUhIAQEAJCQAgIASEgBISAEBACQkAIHEQE8MX+CihWeMv9WNaYIMClWORW1nYCbd+Ze8UF+AhvmdgC+V9tB09/bSdQxIjA/+si2JjPpg84Rr6jFgnmayR+OiKvFHUyA5UjDu7kHb3+iztAa3cMh5E5u79D+bDtnGZg2NgLfSVgYcOymOfS8DKwW6BLbKO+yLbvy6ZGUCzFMYA69kzMPy/j1kGbHJs6BnQMjHstawaCGYjtjvWy+pcMA2e9NHkqQZn4T+LDDdG629CuPbMHE7CzPYxH2Mw6u+vD2HWii0B+dcFwP3VScfqsjiQZVCg1+j4Q+mMkTnYP9aegQUvjJPpedrqf4Pp/0fHjr5DDOhNJLGfHH7EiEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIgQwQwGPmw6AfEx83x9Ro23TrRi8IjPwWfcdRfgz/z5sxroLnRga+hU/iFq0Y/yrkMyDa0se7oCxL7hPwRIDaInaE+J0kQdduE6ueezv92xWhj13FDLjeJgCgPI58zxhgUtKfM0r8ndNz8GNEA1n+XoUvc7A57xsJNV/MWMZE97KruJX9TQlJcas0dxU/maKbgc4mJqCXWHubAIKKSTiO6mgA8Ldo+9PELfDvB/1tNz+Cw9ec039QvxQMsAHw/wxknTV7OwUxA5dYKTlMit2fyZX3c2fZwjHG2zT+t7sez4wVZSd+o3c0qwkSZj8BWLFHQSdimNb0nWB/xK7X025k/JIo6wkAgNcQLa9KuBN7zUZe07dKG9o6PWuaFZ/1BAApu43d8gTRti3PPvtHJ5ZnX9J1LBX7KLlPQB8YjHUMTcBY4e/ozfkx5zRRw+/XI8Ce5y3PycnqKqjXL2INluY7sPkO9BTog8C+qu9F6PLdtT9AHwZ2aloEcJlY/LY2apZl29cFjzGK3+QuRmvhrfdRY8zhFPSLSeJZw3fFPmcc3zb8wWSxEs+41eirL7tCAgPc8oO4+s2uxpoovwBjIQCGzS9Az4yaCH04X6hKZWFU3/vKHtDMgK6WIOqmwTH4uDKLktUlmUcEAPmnZ69D9gLoaZB9yuVVq2q+9P4biL9a8TloBbeeef9fRQgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAiBg4jAfQE3DV7uQV+lAAAAAElFTkSuQmCC" height="42" width="42"></li>
        <li data-value="#00FFFF" id="undo"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAA4RJREFUeAHtmjtoVEEUhnMTY1CUKFE0opVp0oiFhdHCRyHGYGFjsElhIyqIj87awirESkgbtBFEsDEoLFoIFmLhA8RGRUQRH9EQHzGu38AGxuF6SdyTO87uf+Anc+bOPf/MN7t7b+5uS4tCBERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABEogUK1WN6Db6DMaLsFSFrMEAN6NniE/ts0eb5S/rf/jQiC+inndQj3B/KpBrtSaAPBXogf+y77WvmTtpXoBAUAvR/dy4F+jb1EwXKklAQAvRXdy4N+gb7Gll2oFBADcgW7mwK/QtyQYrtSSAIDb0XUUxl06lll6qVZAAMBt6EpInvw+6gyGK7UkAOBWNIbCeEhHl6WXagUEAJyh0ZA8+VO0Jhje0GkWY3VAvoDvicB7knwIvQr655rOMPAdepNl2fRcT2q6ccA/ixYyflH8LRpHx9D6poNctGCAfERlRwXDvqJ5xToW41nQiwiL3Ymnu629ijZG8P+rZenXAABsZjYVtCKY1RT546BvPmkbg1ejtai94MQJjg1ynRgvGNPYh9iEregL8sN9dh+ud+XUcHdYPegUct8l5MVPOk/X65X0+QDYgaaQHzMkhywXRr0+lPeMyfketfRKrhYA9qBvjoQX07QPWC+GmseRq+2Hy3dbeyVVDwD70Q+fCu3vqN96IdTchSaQHx9Iuq29kqoHgIPIfS778ZXE/NVJzb0o9BpNCthCTBYoQ8hdiP2YJNlu7UfNM74JbbchvdY+ydUDwpEAjEvdR8YWy8VQzz2FfYT8uGzpkWwtiJz0qdTa7/m7yXJR1BsIfNxtcYelR7K1AJH3vOg1/abfEVDvOfJjIFlo1hOHyjmfTK29z9KHmiOBx0XL+snXAs6wB8hdkNdZLop67o7ID/dbJIVPADqD6Dxyz5BMg5q9yI8npgYqVkwA8p0+fdqfis+wP1r601D7JdRX0W2AX4GnpKUyifF9gL/epm9rAyK/BLQB2oDIBCLb6x2gDYhMILK93gHagMgEItvrHfDnTyH/9WeRkbcxYXv+Ee5HL2sy/x46YTSaugiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIwDwJ/AZX3IIocQaCWgAAAABJRU5ErkJggg=="  height="42" width="42"></li>
        <li data-value="#00FFFF" id="save"><img src="data:image/png;base64,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" height="42" width="42"></li>
      </ul>
      </div>
      
      <script>
  function dataURLToBlob(dataURL) {
  
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  function download(dataURL, filename) {
  alert("1")
  var blob = dataURLToBlob(dataURL);
  alert(blob)
  var url = window.URL.createObjectURL(blob); 
  alert(url)
  var a = document.createElement("a");
  alert("2")
  a.style = "display: none";
  alert("3")
  a.href = url;
  alert("4")
  a.download = filename;
   alert("5")
  document.body.appendChild(a);
  alert("6")
  a.click();
  alert("7")

  window.URL.revokeObjectURL(url);
  alert("8")
}
  return new Blob([uInt8Array], { type: contentType });
}
    document.getElementById('save').addEventListener('click', function () {
  if (signaturePad.isEmpty()) {
    return alert("Please provide a signature first.");
  }
  var data = signaturePad.toDataURL('image/png');
  var parts = data.split(';base64,');
   window.postMessage(parts[1]);
 });

    document.getElementById('undo').addEventListener('click', function () {
	     var data = signaturePad.toData();
        if (data) {
          data.pop(); 
          signaturePad.fromData(data);
        }
    });
    document.getElementById('clear').addEventListener('click', function () {
      signaturePad.clear();
    });
  var myFunction= function(color){
    
    try {document.getElementsByClassName('border')[0].classList.remove('border');}catch(e){}
    var el = event.target;
    el.classList.add("border");
    

   
    signaturePad.penColor =color;
   }





  var SignaturePad = (function (document) {
  



function Point(x, y, time) {
  this.x = x;
  this.y = y;
  this.time = time || new Date().getTime();
}

Point.prototype.velocityFrom = function (start) {
  return this.time !== start.time ? this.distanceTo(start) / (this.time - start.time) : 1;
};

Point.prototype.distanceTo = function (start) {
  return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
};

Point.prototype.equals = function (other) {
  return this.x === other.x && this.y === other.y && this.time === other.time;
};

function Bezier(startPoint, control1, control2, endPoint) {
  this.startPoint = startPoint;
  this.control1 = control1;
  this.control2 = control2;
  this.endPoint = endPoint;
}

// Returns approximated length.
Bezier.prototype.length = function () {
  var steps = 10;
  var length = 0;
  var px = void 0;
  var py = void 0;

  for (var i = 0; i <= steps; i += 1) {
    var t = i / steps;
    var cx = this._point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
    var cy = this._point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
    if (i > 0) {
      var xdiff = cx - px;
      var ydiff = cy - py;
      length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
    }
    px = cx;
    py = cy;
  }

  return length;
};

/* eslint-disable no-multi-spaces, space-in-parens */
Bezier.prototype._point = function (t, start, c1, c2, end) {
  return start * (1.0 - t) * (1.0 - t) * (1.0 - t) + 3.0 * c1 * (1.0 - t) * (1.0 - t) * t + 3.0 * c2 * (1.0 - t) * t * t + end * t * t * t;
};

/* eslint-disable */

// http://stackoverflow.com/a/27078401/815507
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function later() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

function SignaturePad(canvas, options) {
  var self = this;
  var opts = options || {};

  this.velocityFilterWeight = opts.velocityFilterWeight || 0.7;
  this.minWidth = opts.minWidth || 0.5;
  this.maxWidth = opts.maxWidth || 2.5;
  this.throttle = 'throttle' in opts ? opts.throttle : 16; // in miliseconds
  this.minDistance = 'minDistance' in opts ? opts.minDistance : 5;

  if (this.throttle) {
    this._strokeMoveUpdate = throttle(SignaturePad.prototype._strokeUpdate, this.throttle);
  } else {
    this._strokeMoveUpdate = SignaturePad.prototype._strokeUpdate;
  }

  this.dotSize = opts.dotSize || function () {
    return (this.minWidth + this.maxWidth) / 2;
  };
  this.penColor = opts.penColor || 'black';
  this.backgroundColor = opts.backgroundColor || 'rgba(0,0,0,0)';
  this.onBegin = opts.onBegin;
  this.onEnd = opts.onEnd;

  this._canvas = canvas;
  this._ctx = canvas.getContext('2d');
  this.clear();

  // We need add these inline so they are available to unbind while still having
  // access to 'self' we could use _.bind but it's not worth adding a dependency.
  this._handleMouseDown = function (event) {
    if (event.which === 1) {
      self._mouseButtonDown = true;
      self._strokeBegin(event);
    }
  };

  this._handleMouseMove = function (event) {
    if (self._mouseButtonDown) {
      self._strokeMoveUpdate(event);
    }
  };

  this._handleMouseUp = function (event) {
    if (event.which === 1 && self._mouseButtonDown) {
      self._mouseButtonDown = false;
      self._strokeEnd(event);
    }
  };

  this._handleTouchStart = function (event) {
    if (event.targetTouches.length === 1) {
      var touch = event.changedTouches[0];
      self._strokeBegin(touch);
    }
  };

  this._handleTouchMove = function (event) {
    // Prevent scrolling.
    event.preventDefault();

    var touch = event.targetTouches[0];
    self._strokeMoveUpdate(touch);
  };

  this._handleTouchEnd = function (event) {
    var wasCanvasTouched = event.target === self._canvas;
    if (wasCanvasTouched) {
      event.preventDefault();
      self._strokeEnd(event);
    }
  };

  // Enable mouse and touch event handlers
  this.on();
}

// Public methods
SignaturePad.prototype.clear = function () {
  var ctx = this._ctx;
  var canvas = this._canvas;

  ctx.fillStyle = this.backgroundColor;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  this._data = [];
  this._reset();
  this._isEmpty = true;
};

SignaturePad.prototype.fromDataURL = function (dataUrl) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var image = new Image();
  var ratio = options.ratio || window.devicePixelRatio || 1;
  var width = options.width || this._canvas.width / ratio;
  var height = options.height || this._canvas.height / ratio;

  this._reset();
  image.src = dataUrl;
  image.onload = function () {
    _this._ctx.drawImage(image, 0, 0, width, height);
  };
  this._isEmpty = false;
};

SignaturePad.prototype.toDataURL = function (type) {
  var _canvas;

  switch (type) {
    case 'image/svg+xml':
      return this._toSVG();
    default:
      for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        options[_key - 1] = arguments[_key];
      }

      return (_canvas = this._canvas).toDataURL.apply(_canvas, [type].concat(options));
  }
};

SignaturePad.prototype.on = function () {
  this._handleMouseEvents();
  this._handleTouchEvents();
};

SignaturePad.prototype.off = function () {
  this._canvas.removeEventListener('mousedown', this._handleMouseDown);
  this._canvas.removeEventListener('mousemove', this._handleMouseMove);
  document.removeEventListener('mouseup', this._handleMouseUp);

  this._canvas.removeEventListener('touchstart', this._handleTouchStart);
  this._canvas.removeEventListener('touchmove', this._handleTouchMove);
  this._canvas.removeEventListener('touchend', this._handleTouchEnd);
};

SignaturePad.prototype.isEmpty = function () {
  return this._isEmpty;
};

// Private methods
SignaturePad.prototype._strokeBegin = function (event) {
  this._data.push([]);
  this._reset();
  this._strokeUpdate(event);

  if (typeof this.onBegin === 'function') {
    this.onBegin(event);
  }
};

SignaturePad.prototype._strokeUpdate = function (event) {
  var x = event.clientX;
  var y = event.clientY;

  var point = this._createPoint(x, y);
  var lastPointGroup = this._data[this._data.length - 1];
  var lastPoint = lastPointGroup && lastPointGroup[lastPointGroup.length - 1];
  var isLastPointTooClose = lastPoint && point.distanceTo(lastPoint) < this.minDistance;

  // Skip this point if it's too close to the previous one
  if (!(lastPoint && isLastPointTooClose)) {
    var _addPoint = this._addPoint(point),
        curve = _addPoint.curve,
        widths = _addPoint.widths;

    if (curve && widths) {
      this._drawCurve(curve, widths.start, widths.end);
    }

    this._data[this._data.length - 1].push({
      x: point.x,
      y: point.y,
      time: point.time,
      color: this.penColor
    });
  }
};

SignaturePad.prototype._strokeEnd = function (event) {
  var canDrawCurve = this.points.length > 2;
  var point = this.points[0]; // Point instance

  if (!canDrawCurve && point) {
    this._drawDot(point);
  }

  if (point) {
    var lastPointGroup = this._data[this._data.length - 1];
    var lastPoint = lastPointGroup[lastPointGroup.length - 1]; // plain object

    // When drawing a dot, there's only one point in a group, so without this check
    // such group would end up with exactly the same 2 points.
    if (!point.equals(lastPoint)) {
      lastPointGroup.push({
        x: point.x,
        y: point.y,
        time: point.time,
        color: this.penColor
      });
    }
  }

  if (typeof this.onEnd === 'function') {
    this.onEnd(event);
  }
};

SignaturePad.prototype._handleMouseEvents = function () {
  this._mouseButtonDown = false;

  this._canvas.addEventListener('mousedown', this._handleMouseDown);
  this._canvas.addEventListener('mousemove', this._handleMouseMove);
  document.addEventListener('mouseup', this._handleMouseUp);
};

SignaturePad.prototype._handleTouchEvents = function () {
  // Pass touch events to canvas element on mobile IE11 and Edge.
  this._canvas.style.msTouchAction = 'none';
  this._canvas.style.touchAction = 'none';

  this._canvas.addEventListener('touchstart', this._handleTouchStart);
  this._canvas.addEventListener('touchmove', this._handleTouchMove);
  this._canvas.addEventListener('touchend', this._handleTouchEnd);
};

SignaturePad.prototype._reset = function () {
  this.points = [];
  this._lastVelocity = 0;
  this._lastWidth = (this.minWidth + this.maxWidth) / 2;
  this._ctx.fillStyle = this.penColor;
};

SignaturePad.prototype._createPoint = function (x, y, time) {
  var rect = this._canvas.getBoundingClientRect();

  return new Point(x - rect.left, y - rect.top, time || new Date().getTime());
};

SignaturePad.prototype._addPoint = function (point) {
  var points = this.points;
  var tmp = void 0;

  points.push(point);

  if (points.length > 2) {
    // To reduce the initial lag make it work with 3 points
    // by copying the first point to the beginning.
    if (points.length === 3) points.unshift(points[0]);

    tmp = this._calculateCurveControlPoints(points[0], points[1], points[2]);
    var c2 = tmp.c2;
    tmp = this._calculateCurveControlPoints(points[1], points[2], points[3]);
    var c3 = tmp.c1;
    var curve = new Bezier(points[1], c2, c3, points[2]);
    var widths = this._calculateCurveWidths(curve);

    // Remove the first element from the list,
    // so that we always have no more than 4 points in points array.
    points.shift();

    return { curve: curve, widths: widths };
  }

  return {};
};

SignaturePad.prototype._calculateCurveControlPoints = function (s1, s2, s3) {
  var dx1 = s1.x - s2.x;
  var dy1 = s1.y - s2.y;
  var dx2 = s2.x - s3.x;
  var dy2 = s2.y - s3.y;

  var m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };
  var m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };

  var l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  var l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

  var dxm = m1.x - m2.x;
  var dym = m1.y - m2.y;

  var k = l2 / (l1 + l2);
  var cm = { x: m2.x + dxm * k, y: m2.y + dym * k };

  var tx = s2.x - cm.x;
  var ty = s2.y - cm.y;

  return {
    c1: new Point(m1.x + tx, m1.y + ty),
    c2: new Point(m2.x + tx, m2.y + ty)
  };
};

SignaturePad.prototype._calculateCurveWidths = function (curve) {
  var startPoint = curve.startPoint;
  var endPoint = curve.endPoint;
  var widths = { start: null, end: null };

  var velocity = this.velocityFilterWeight * endPoint.velocityFrom(startPoint) + (1 - this.velocityFilterWeight) * this._lastVelocity;

  var newWidth = this._strokeWidth(velocity);

  widths.start = this._lastWidth;
  widths.end = newWidth;

  this._lastVelocity = velocity;
  this._lastWidth = newWidth;

  return widths;
};

SignaturePad.prototype._strokeWidth = function (velocity) {
  return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
};

SignaturePad.prototype._drawPoint = function (x, y, size) {
  var ctx = this._ctx;

  ctx.moveTo(x, y);
  ctx.arc(x, y, size, 0, 2 * Math.PI, false);
  this._isEmpty = false;
};

SignaturePad.prototype._drawCurve = function (curve, startWidth, endWidth) {
  var ctx = this._ctx;
  var widthDelta = endWidth - startWidth;
  var drawSteps = Math.floor(curve.length());

  ctx.beginPath();

  for (var i = 0; i < drawSteps; i += 1) {
    // Calculate the Bezier (x, y) coordinate for this step.
    var t = i / drawSteps;
    var tt = t * t;
    var ttt = tt * t;
    var u = 1 - t;
    var uu = u * u;
    var uuu = uu * u;

    var x = uuu * curve.startPoint.x;
    x += 3 * uu * t * curve.control1.x;
    x += 3 * u * tt * curve.control2.x;
    x += ttt * curve.endPoint.x;

    var y = uuu * curve.startPoint.y;
    y += 3 * uu * t * curve.control1.y;
    y += 3 * u * tt * curve.control2.y;
    y += ttt * curve.endPoint.y;

    var width = startWidth + ttt * widthDelta;
    this._drawPoint(x, y, width);
  }

  ctx.closePath();
  ctx.fill();
};

SignaturePad.prototype._drawDot = function (point) {
  var ctx = this._ctx;
  var width = typeof this.dotSize === 'function' ? this.dotSize() : this.dotSize;

  ctx.beginPath();
  this._drawPoint(point.x, point.y, width);
  ctx.closePath();
  ctx.fill();
};

SignaturePad.prototype._fromData = function (pointGroups, drawCurve, drawDot) {
  for (var i = 0; i < pointGroups.length; i += 1) {
    var group = pointGroups[i];

    if (group.length > 1) {
      for (var j = 0; j < group.length; j += 1) {
        var rawPoint = group[j];
        var point = new Point(rawPoint.x, rawPoint.y, rawPoint.time);
        var color = rawPoint.color;

        if (j === 0) {
          // First point in a group. Nothing to draw yet.

          // All points in the group have the same color, so it's enough to set
          // penColor just at the beginning.
          this.penColor = color;
          this._reset();

          this._addPoint(point);
        } else if (j !== group.length - 1) {
          // Middle point in a group.
          var _addPoint2 = this._addPoint(point),
              curve = _addPoint2.curve,
              widths = _addPoint2.widths;

          if (curve && widths) {
            drawCurve(curve, widths, color);
          }
        } else {
          // Last point in a group. Do nothing.
        }
      }
    } else {
      this._reset();
      var _rawPoint = group[0];
      drawDot(_rawPoint);
    }
  }
};

SignaturePad.prototype._toSVG = function () {
  var _this2 = this;

  var pointGroups = this._data;
  var canvas = this._canvas;
  var ratio = Math.max(window.devicePixelRatio || 1, 1);
  var minX = 0;
  var minY = 0;
  var maxX = canvas.width / ratio;
  var maxY = canvas.height / ratio;
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svg.setAttributeNS(null, 'width', canvas.width);
  svg.setAttributeNS(null, 'height', canvas.height);

  this._fromData(pointGroups, function (curve, widths, color) {
    var path = document.createElement('path');

    // Need to check curve for NaN values, these pop up when drawing
    // lines on the canvas that are not continuous. E.g. Sharp corners
    // or stopping mid-stroke and than continuing without lifting mouse.
    if (!isNaN(curve.control1.x) && !isNaN(curve.control1.y) && !isNaN(curve.control2.x) && !isNaN(curve.control2.y)) {
      var attr = 'M ' + curve.startPoint.x.toFixed(3) + ',' + curve.startPoint.y.toFixed(3) + ' ' + ('C ' + curve.control1.x.toFixed(3) + ',' + curve.control1.y.toFixed(3) + ' ') + (curve.control2.x.toFixed(3) + ',' + curve.control2.y.toFixed(3) + ' ') + (curve.endPoint.x.toFixed(3) + ',' + curve.endPoint.y.toFixed(3));

      path.setAttribute('d', attr);
      path.setAttribute('stroke-width', (widths.end * 2.25).toFixed(3));
      path.setAttribute('stroke', color);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');

      svg.appendChild(path);
    }
  }, function (rawPoint) {
    var circle = document.createElement('circle');
    var dotSize = typeof _this2.dotSize === 'function' ? _this2.dotSize() : _this2.dotSize;
    circle.setAttribute('r', dotSize);
    circle.setAttribute('cx', rawPoint.x);
    circle.setAttribute('cy', rawPoint.y);
    circle.setAttribute('fill', rawPoint.color);

    svg.appendChild(circle);
  });

  var prefix = 'data:image/svg+xml;base64,';
  var header = '<svg' + ' xmlns="http://www.w3.org/2000/svg"' + ' xmlns:xlink="http://www.w3.org/1999/xlink"' + (' viewBox="' + minX + ' ' + minY + ' ' + maxX + ' ' + maxY + '"') + (' width="' + maxX + '"') + (' height="' + maxY + '"') + '>';
  var body = svg.innerHTML;

  // IE hack for missing innerHTML property on SVGElement
  if (body === undefined) {
    var dummy = document.createElement('dummy');
    var nodes = svg.childNodes;
    dummy.innerHTML = '';

    for (var i = 0; i < nodes.length; i += 1) {
      dummy.appendChild(nodes[i].cloneNode(true));
    }

    body = dummy.innerHTML;
  }

  var footer = '</svg>';
  var data = header + body + footer;

  return prefix + btoa(data);
};

SignaturePad.prototype.fromData = function (pointGroups) {
  var _this3 = this;

  this.clear();

  this._fromData(pointGroups, function (curve, widths) {
    return _this3._drawCurve(curve, widths.start, widths.end);
  }, function (rawPoint) {
    return _this3._drawDot(rawPoint);
  });

  this._data = pointGroups;
};

SignaturePad.prototype.toData = function () {
  return this._data;
};







  return SignaturePad;
})(document);
  var showSignaturePad = function (signaturePadCanvas, bodyWidth, bodyHeight) {
    /*We're rotating by 90% -> Flip X and Y*/
    /*var width = bodyHeight;
    var height = bodyWidth;*/

    var width = bodyWidth;
    var height = bodyHeight;

    var sizeSignaturePad = function () {
      var devicePixelRatio = 1; /*window.devicePixelRatio || 1;*/
      var canvasWidth = width * devicePixelRatio;
      var canvasHeight = height * devicePixelRatio;
      signaturePadCanvas.width = canvasWidth;
      signaturePadCanvas.height = canvasHeight;
      signaturePadCanvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
    };
    
    var finishedStroke = function(base64DataUrl) {
       executeNativeFunction('finishedStroke', {base64DataUrl: base64DataUrl});
    };

    var enableSignaturePadFunctionality = function () {
       signaturePad =   new SignaturePad(signaturePadCanvas, {
        penColor:'#808080' ,
        backgroundColor: '${backgroundColor || 'white'}',
        onEnd: function() { finishedStroke(signaturePad.toDataURL()); }
      });
      /* signaturePad.translateMouseCoordinates = function (point) {
        var translatedY = point.x;
        var translatedX = width - point.y;
        point.x = translatedX;
        point.y = translatedY;
      }; */
      signaturePad.minWidth = 1;
      signaturePad.maxWidth = 4;
      if ('${dataURL}') {
        signaturePad.fromDataURL('${dataURL}');
      }
    };

    sizeSignaturePad();
    enableSignaturePadFunctionality();
  };




 
 




  var signaturePad;
  var bodyWidth = document.body.clientWidth;
  var bodyHeight = document.body.clientHeight;
  if(!bodyWidth) {
    bodyWidth = window.innerWidth;
  }
  if(!bodyHeight) {
    bodyHeight = window.innerHeight;
  }
  
  var canvasElement = document.querySelector('canvas');
  showSignaturePad(canvasElement, bodyWidth, bodyHeight);
  
      </script>
    </body>
  </html>`;

export default content;
