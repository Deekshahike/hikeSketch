var content = (pcolor, backgroundColor, dataURL) =>
  `<html>
    <style>
    *
    {margin:0;padding:0;}
    .border{
      
      border:1px solid #ffffff;
      border-radius:10px;
     
    }
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
    <body>
     
      <canvas style="margin-left: 48; margin-top: 0;"></canvas>
      <div id="content" style="position:absolute; width:38 ;height:100% ;left:10; top:0; border-right:1px solid white">
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
      <div id="content" style="position:absolute; width:38 ;height:100% ;right:10; top:0; border-left:1px solid white">
      <ul style="position:fixed; top:0;overflow: hidden"> 
        <li  id="clear"><img src="data:image/png;base64,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"  height="42" width="42"></li>
        <li id="undo"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAABWVBMVEUAAAA+T2E+R1s9SFw9SFw9
R1w+R1w+S1xATWY9SFw/SF5LS2k+R1s+R1tOTmI+R1s+SFtAgIBNTWY+SFw+SFtVVYBJSW09SFs9
SFxVVXFmZmY9R1s+SFtAVWpVVao9SFw+SFxEVWaAgIA9SFw+R1xDUV7///89R1s9SFxDTmQ+SFs+
R1s/SFs/SFs9R1w/R1w9R1s9R1w+SFw/SFtASVs+R1w9R1w+SFxCSV9ASmA9SFw+SFw+R1s9R1w+
R1s9SF1ASVs+SVtATlw/SF0+SFs/SFxBSV09SFs9SFw/SFw/SVw+SVs+SFw+R1s+R10+SV0/SV09
SFs/SV4/S149SFw9SFs+R1w+R1xASlw+SVw+R1xBSV8+SV0+S10+SFxASl09SFs9SFw9SVs9R1tD
SF49R1w+SFw9SFs+R10+SF0+SVw+SVtFTmI9SFw+SV4+R1w+R1w+SFw9R1tbvoJnAAAAcnRSTlMA
HcHyjhnbOhTVORHPpQ3JsAQKwrgGB7u/CQWzxgwDq80PAqPTEwGa2ReR81E1Mnr+6blqHO/QriMw
9cri+vBHOGIkcfxyP/b9WWlG+PtrQk35SUHx7lb3SF70O3MpZzTUpnDtLkvm4IRKkJcavFeI1uNj
X9sLAAAAAWJLR0QmWgiYtQAAAAlwSFlzAAAASAAAAEgARslrPgAAAX1JREFUaN7tlUdTAkEQRgcE
A+aEiIpgABVUzKJrxiyGFRUDZsyJ+f8Hp7e8YLVcZvtgVb/jfFXvAVM1CMEwDMMwDMMw/wuHs8RF
6XeXSinL6PzlFcovPWT+yirwV5P5a2rBX1dP5W9oBH9TM5Xf2wJ+XyuV398G/vYOKn+gE/zBEJW/
qxv8Pb1U/nAE/H39VH4xAP5obLCAIYffLv+wxImPjI6N2xGYkEXw2fByTMqiTE3rBhLWV5iZLSRo
zP0U5hd0C4tR+MWXfh+Hl1ecViG5qltYW1eajU1k8VgvlNzSLWzvKEsqhk27KZj2dAv78IMfmNh0
mFbTkVu3cJxUmhP0g2ZgiugGxGlcac7OsekCLjqrXbiE20xfIUvgWi032gFxC4W7e2TJwVvl1S9Y
j9ID9qfwqIacfkA8QeEZGV7U+asNAeFS9/yGnGdU4N2OgPj4TGDHWRX4siXwByF48ygDAi6HAxzg
AHEgL2WeNGAahqlvYRiGYRiGYRh6vgHyQJcxOZPDDgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0w
Mi0wNlQwNjowNTowNy0wNjowMJRGgAwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDItMDZUMDY6
MDU6MDctMDY6MDDlGziwAAAAAElFTkSuQmCC
"  height="42" width="42"></li>
        <li id="save"><img src="data:image/png;base64,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
"  height="42" width="42"></li>
       
      </ul>
      </div>
      <script>

    document.getElementById('save').addEventListener('click', function () {
  if (signaturePad.isEmpty()) {
    return alert("Please provide a signature first.");
  }
  
  var data = signaturePad.toDataURL('image/png');
  console.log(data);
  window.open(data);
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
   
    signaturePad.penColor =color;
   }
  var SignaturePad = (function (document) {
  

  var SignaturePad = function (canvas, options) {
    var self = this,
      opts = options || {};

    this.velocityFilterWeight = opts.velocityFilterWeight || 0.7;
    this.minWidth = opts.minWidth || 0.5;
    this.maxWidth = opts.maxWidth || 2.5;
    this.minDistance = 'minDistance' in opts ? opts.minDistance : 5;
    this.dotSize = opts.dotSize || function () {
        return (this.minWidth + this.maxWidth) / 2;
      };
    this.penColor = opts.penColor || "black";
    this.backgroundColor = opts.backgroundColor || "rgba(0,0,0,0)";
    this.onEnd = opts.onEnd;
    this.onBegin = opts.onBegin;

    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");
    this.clear();

    this._handleMouseEvents();
    this._handleTouchEvents();
  };

  SignaturePad.prototype.clear = function () {
    var ctx = this._ctx,
      canvas = this._canvas;

    ctx.fillStyle = this.backgroundColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this._data =[];
    this._reset();
    this._isEmpty = true;
  };

  SignaturePad.prototype.toDataURL = function (imageType, quality) {
    var canvas = this._canvas;
    return canvas.toDataURL.apply(canvas, arguments);
  };

  SignaturePad.prototype.fromDataURL = function (dataUrl) {
    var self = this,
      image = new Image();

    this._reset();
    image.src = dataUrl;
    image.onload = function () {
      self._ctx.drawImage(image, 0, 0, self._canvas.width, self._canvas.height);
    };
    this._isEmpty = false;
  };

  SignaturePad.prototype._strokeUpdate = function (event) {
    var point = this._createPoint(event);
    this._addPoint(point);
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

  SignaturePad.prototype._strokeBegin = function (event) {
    his._data.push([]);
    this._reset();
    this._strokeUpdate(event);
    if (typeof this.onBegin === 'function') {
      this.onBegin(event);
    }

  };

  SignaturePad.prototype._strokeDraw = function (point) {
    var ctx = this._ctx,
      dotSize = typeof(this.dotSize) === 'function' ? this.dotSize() : this.dotSize;

    ctx.beginPath();
    this._drawPoint(point.x, point.y, dotSize);
    ctx.closePath();
    ctx.fill();
  };

  SignaturePad.prototype._strokeEnd = function (event) {
    var canDrawCurve = this.points.length > 2,
      point = this.points[0];

    if (!canDrawCurve && point) {
      this._strokeDraw(point);
    }
    if (typeof this.onEnd === 'function') {
      this.onEnd(event);
    }
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
  SignaturePad.prototype.fromData = function (pointGroups) {
  var _this3 = this;

  this.clear();
  alert("i m here also");
  this._fromData(pointGroups, function (curve, widths) {
    alert("i m here");
    return _this3._drawCurve(curve, widths.start, widths.end);
  }, function (rawPoint) {
    return _this3._drawDot(rawPoint);
  });

  this._data = pointGroups;
};
  SignaturePad.prototype.toData = function () {
  return this._data;
};
  SignaturePad.prototype._handleMouseEvents = function () {
    var self = this;
    this._mouseButtonDown = false;

    this._canvas.addEventListener("mousedown", function (event) {
      if (event.which === 1) {
        self._mouseButtonDown = true;
        self._strokeBegin(event);
      }
    });

    this._canvas.addEventListener("mousemove", function (event) {
      if (self._mouseButtonDown) {
        self._strokeUpdate(event);
      }
    });

    document.addEventListener("mouseup", function (event) {
      if (event.which === 1 && self._mouseButtonDown) {
        self._mouseButtonDown = false;
        self._strokeEnd(event);
      }
    });
  };

  SignaturePad.prototype._handleTouchEvents = function () {
    var self = this;

    /* Pass touch events to canvas element on mobile IE. */
    this._canvas.style.msTouchAction = 'none';

    this._canvas.addEventListener("touchstart", function (event) {
      var touch = event.changedTouches[0];
      self._strokeBegin(touch);
    });

    this._canvas.addEventListener("touchmove", function (event) {
      /* Prevent scrolling. */
      event.preventDefault();

      var touch = event.changedTouches[0];
      self._strokeUpdate(touch);
    });

    document.addEventListener("touchend", function (event) {
      var wasCanvasTouched = event.target === self._canvas;
      if (wasCanvasTouched) {
        self._strokeEnd(event);
      }
    });
  };

  SignaturePad.prototype.isEmpty = function () {
    return this._isEmpty;
  };

  SignaturePad.prototype._reset = function () {
    this.points = [];
    this._lastVelocity = 0;
    this._lastWidth = (this.minWidth + this.maxWidth) / 2;
    this._isEmpty = true;
    this._ctx.fillStyle = this.penColor;
  };

  SignaturePad.prototype._createPoint = function (event) {
    var rect = this._canvas.getBoundingClientRect();
    var point = new Point(
      event.clientX - rect.left,
      event.clientY - rect.top
    );

    if(this.translateMouseCoordinates)
      this.translateMouseCoordinates(point);

    return point;
  };

  SignaturePad.prototype._addPoint = function (point) {
    var points = this.points,
      c2, c3,
      curve, tmp;

    points.push(point);

    if (points.length > 2) {
      /* To reduce the initial lag make it work with 3 points
       by copying the first point to the beginning. */
      if (points.length === 3) points.unshift(points[0]);

      tmp = this._calculateCurveControlPoints(points[0], points[1], points[2]);
      c2 = tmp.c2;
      tmp = this._calculateCurveControlPoints(points[1], points[2], points[3]);
      c3 = tmp.c1;
      curve = new Bezier(points[1], c2, c3, points[2]);
      this._addCurve(curve);

      /* Remove the first element from the list,
       so that we always have no more than 4 points in points array. */
      points.shift();
    }
  };

  SignaturePad.prototype._calculateCurveControlPoints = function (s1, s2, s3) {
    var dx1 = s1.x - s2.x, dy1 = s1.y - s2.y,
      dx2 = s2.x - s3.x, dy2 = s2.y - s3.y,

      m1 = {x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0},
      m2 = {x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0},

      l1 = Math.sqrt(dx1*dx1 + dy1*dy1),
      l2 = Math.sqrt(dx2*dx2 + dy2*dy2),

      dxm = (m1.x - m2.x),
      dym = (m1.y - m2.y),

      k = l2 / (l1 + l2),
      cm = {x: m2.x + dxm*k, y: m2.y + dym*k},

      tx = s2.x - cm.x,
      ty = s2.y - cm.y;

    return {
      c1: new Point(m1.x + tx, m1.y + ty),
      c2: new Point(m2.x + tx, m2.y + ty)
    };
  };

  SignaturePad.prototype._addCurve = function (curve) {
    var startPoint = curve.startPoint,
      endPoint = curve.endPoint,
      velocity, newWidth;

    velocity = endPoint.velocityFrom(startPoint);
    velocity = this.velocityFilterWeight * velocity
      + (1 - this.velocityFilterWeight) * this._lastVelocity;

    newWidth = this._strokeWidth(velocity);
    this._drawCurve(curve, this._lastWidth, newWidth);

    this._lastVelocity = velocity;
    this._lastWidth = newWidth;
  };

  SignaturePad.prototype._drawPoint = function (x, y, size) {
    var ctx = this._ctx;

    ctx.moveTo(x, y);
    ctx.arc(x, y, size, 0, 2 * Math.PI, false);
    this._isEmpty = false;
  };

  SignaturePad.prototype._drawCurve = function (curve, startWidth, endWidth) {
    var ctx = this._ctx,
      widthDelta = endWidth - startWidth,
      drawSteps, width, i, t, tt, ttt, u, uu, uuu, x, y;

    drawSteps = Math.floor(curve.length());
    ctx.beginPath();
    for (i = 0; i < drawSteps; i++) {
      /* Calculate the Bezier (x, y) coordinate for this step. */
      t = i / drawSteps;
      tt = t * t;
      ttt = tt * t;
      u = 1 - t;
      uu = u * u;
      uuu = uu * u;

      x = uuu * curve.startPoint.x;
      x += 3 * uu * t * curve.control1.x;
      x += 3 * u * tt * curve.control2.x;
      x += ttt * curve.endPoint.x;

      y = uuu * curve.startPoint.y;
      y += 3 * uu * t * curve.control1.y;
      y += 3 * u * tt * curve.control2.y;
      y += ttt * curve.endPoint.y;

      width = startWidth + ttt * widthDelta;
      this._drawPoint(x, y, width);
    }
    ctx.closePath();
    ctx.fill();
  };

  SignaturePad.prototype._strokeWidth = function (velocity) {
    return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
  };


  var Point = function (x, y, time) {
    this.x = x;
    this.y = y;
    this.time = time || new Date().getTime();
  };

  Point.prototype.velocityFrom = function (start) {
    return (this.time !== start.time) ? this.distanceTo(start) / (this.time - start.time) : 1;
  };

  Point.prototype.distanceTo = function (start) {
    return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
  };

  var Bezier = function (startPoint, control1, control2, endPoint) {
    this.startPoint = startPoint;
    this.control1 = control1;
    this.control2 = control2;
    this.endPoint = endPoint;
  };

  
  Bezier.prototype.length = function () {
    var steps = 10,
      length = 0,
      i, t, cx, cy, px, py, xdiff, ydiff;

    for (i = 0; i <= steps; i++) {
      t = i / steps;
      cx = this._point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
      cy = this._point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
      if (i > 0) {
        xdiff = cx - px;
        ydiff = cy - py;
        length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
      }
      px = cx;
      py = cy;
    }
    return length;
  };

  Bezier.prototype._point = function (t, start, c1, c2, end) {
    return          start * (1.0 - t) * (1.0 - t)  * (1.0 - t)
      + 3.0 *  c1    * (1.0 - t) * (1.0 - t)  * t
      + 3.0 *  c2    * (1.0 - t) * t          * t
      +        end   * t         * t          * t;
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
  var listelem = document.querySelector('ul');
  var canvasElement = document.querySelector('canvas');
  showSignaturePad(canvasElement, bodyWidth, bodyHeight);
  
      </script>
    </body>
  </html>`;

export default content;
