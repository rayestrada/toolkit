// include markerclusterer library from https://github.com/googlemaps/v3-utility-library/tree/master/markerclusterer
// @todo: look into including into node_modules
function MarkerClusterer(t, e, r) {
  this.extend(MarkerClusterer, google.maps.OverlayView), this.map_ = t, this.markers_ = [], this.clusters_ = [], this.sizes = [
    53,
    56,
    66,
    78,
    90
  ], this.styles_ = [], this.ready_ = !1;
  var s = r || {};
  this.gridSize_ = s.gridSize || 60, this.minClusterSize_ = s.minimumClusterSize || 2, this.maxZoom_ = s.maxZoom || null, this.styles_ = s.styles || [], this.imagePath_ = s.imagePath || this.MARKER_CLUSTER_IMAGE_PATH_, this.imageExtension_ = s.imageExtension || this.MARKER_CLUSTER_IMAGE_EXTENSION_, this.zoomOnClick_ = !0, void 0 != s.zoomOnClick && (this.zoomOnClick_ = s.zoomOnClick), this.averageCenter_ = !1, void 0 != s.averageCenter && (this.averageCenter_ = s.averageCenter), this.setupStyles_(), this.setMap(t), this.prevZoom_ = this.map_.getZoom();
  var o = this;
  google.maps.event.addListener(this.map_, "zoom_changed", function () {
    var t = o.map_.getZoom(), e = o.map_.minZoom || 0, r = Math.min(o.map_.maxZoom || 100, o.map_.mapTypes[o.map_.getMapTypeId()].maxZoom);
    t = Math.min(Math.max(t, e), r), o.prevZoom_ != t && (o.prevZoom_ = t, o.resetViewport())
  }), google.maps.event.addListener(this.map_, "idle", function () {
    o.redraw()
  }), e && (e.length || Object.keys(e).length) && this.addMarkers(e, !1)
}
function Cluster(t) {
  this.markerClusterer_ = t, this.map_ = t.getMap(), this.gridSize_ = t.getGridSize(), this.minClusterSize_ = t.getMinClusterSize(), this.averageCenter_ = t.isAverageCenter(), this.center_ = null, this.markers_ = [], this.bounds_ = null, this.clusterIcon_ = new ClusterIcon(this, t.getStyles(), t.getGridSize())
}
function ClusterIcon(t, e, r) {
  t.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView), this.styles_ = e, this.padding_ = r || 0, this.cluster_ = t, this.center_ = null, this.map_ = t.getMap(), this.div_ = null, this.sums_ = null, this.visible_ = !1, this.setMap(this.map_)
}
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = "../images/m", MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = "png", MarkerClusterer.prototype.extend = function (t, e) {
  return function (t) {
    for (var e in t.prototype) {
      this.prototype[e] = t.prototype[e];
    }
    return this
  }.apply(t, [e])
}, MarkerClusterer.prototype.onAdd = function () {
  this.setReady_(!0)
}, MarkerClusterer.prototype.draw = function () {
}, MarkerClusterer.prototype.setupStyles_ = function () {
  if (!this.styles_.length) {
    for (var t, e = 0; t = this.sizes[e]; e++) {
      this.styles_.push({
        url: this.imagePath_ + (e + 1) + "." + this.imageExtension_,
        height: t,
        width: t
      })
    }
  }
}, MarkerClusterer.prototype.fitMapToMarkers = function () {
  for (var t, e = this.getMarkers(), r = new google.maps.LatLngBounds, s = 0; t = e[s]; s++) {
    r.extend(t.getPosition());
  }
  this.map_.fitBounds(r)
}, MarkerClusterer.prototype.setStyles = function (t) {
  this.styles_ = t
}, MarkerClusterer.prototype.getStyles = function () {
  return this.styles_
}, MarkerClusterer.prototype.isZoomOnClick = function () {
  return this.zoomOnClick_
}, MarkerClusterer.prototype.isAverageCenter = function () {
  return this.averageCenter_
}, MarkerClusterer.prototype.getMarkers = function () {
  return this.markers_
}, MarkerClusterer.prototype.getTotalMarkers = function () {
  return this.markers_.length
}, MarkerClusterer.prototype.setMaxZoom = function (t) {
  this.maxZoom_ = t
}, MarkerClusterer.prototype.getMaxZoom = function () {
  return this.maxZoom_
}, MarkerClusterer.prototype.calculator_ = function (t, e) {
  for (var r = 0, s = t.length, o = s; 0 !== o;) {
    o = parseInt(o / 10, 10), r++;
  }
  return r = Math.min(r, e), {text: s, index: r}
}, MarkerClusterer.prototype.setCalculator = function (t) {
  this.calculator_ = t
}, MarkerClusterer.prototype.getCalculator = function () {
  return this.calculator_
}, MarkerClusterer.prototype.addMarkers = function (t, e) {
  if (t.length) {
    for (var r, s = 0; r = t[s]; s++) {
      this.pushMarkerTo_(r);
    }
  }
  else if (Object.keys(t).length) {
    for (var r in t) {
      this.pushMarkerTo_(t[r]);
    }
  }
  e || this.redraw()
}, MarkerClusterer.prototype.pushMarkerTo_ = function (t) {
  if (t.isAdded = !1, t.draggable) {
    var e = this;
    google.maps.event.addListener(t, "dragend", function () {
      t.isAdded = !1, e.repaint()
    })
  }
  this.markers_.push(t)
}, MarkerClusterer.prototype.addMarker = function (t, e) {
  this.pushMarkerTo_(t), e || this.redraw()
}, MarkerClusterer.prototype.removeMarker_ = function (t) {
  var e = -1;
  if (this.markers_.indexOf) {
    e = this.markers_.indexOf(t);
  }
  else {
    for (var r, s = 0; r = this.markers_[s]; s++) {
      if (r == t) {
        e = s;
        break
      }
    }
  }
  return -1 == e ? !1 : (t.setMap(null), this.markers_.splice(e, 1), !0)
}, MarkerClusterer.prototype.removeMarker = function (t, e) {
  var r = this.removeMarker_(t);
  return !e && r ? (this.resetViewport(), this.redraw(), !0) : !1
}, MarkerClusterer.prototype.removeMarkers = function (t, e) {
  for (var r, s = t === this.getMarkers() ? t.slice() : t, o = !1, i = 0; r = s[i]; i++) {
    var a = this.removeMarker_(r);
    o = o || a
  }
  return !e && o ? (this.resetViewport(), this.redraw(), !0) : void 0
}, MarkerClusterer.prototype.setReady_ = function (t) {
  this.ready_ || (this.ready_ = t, this.createClusters_())
}, MarkerClusterer.prototype.getTotalClusters = function () {
  return this.clusters_.length
}, MarkerClusterer.prototype.getMap = function () {
  return this.map_
}, MarkerClusterer.prototype.setMap = function (t) {
  this.map_ = t
}, MarkerClusterer.prototype.getGridSize = function () {
  return this.gridSize_
}, MarkerClusterer.prototype.setGridSize = function (t) {
  this.gridSize_ = t
}, MarkerClusterer.prototype.getMinClusterSize = function () {
  return this.minClusterSize_
}, MarkerClusterer.prototype.setMinClusterSize = function (t) {
  this.minClusterSize_ = t
}, MarkerClusterer.prototype.getExtendedBounds = function (t) {
  var e = this.getProjection(), r = new google.maps.LatLng(t.getNorthEast().lat(), t.getNorthEast().lng()), s = new google.maps.LatLng(t.getSouthWest().lat(), t.getSouthWest().lng()), o = e.fromLatLngToDivPixel(r);
  o.x += this.gridSize_, o.y -= this.gridSize_;
  var i = e.fromLatLngToDivPixel(s);
  i.x -= this.gridSize_, i.y += this.gridSize_;
  var a = e.fromDivPixelToLatLng(o), n = e.fromDivPixelToLatLng(i);
  return t.extend(a), t.extend(n), t
}, MarkerClusterer.prototype.isMarkerInBounds_ = function (t, e) {
  return e.contains(t.getPosition())
}, MarkerClusterer.prototype.clearMarkers = function () {
  this.resetViewport(!0), this.markers_ = []
}, MarkerClusterer.prototype.resetViewport = function (t) {
  for (var e, r = 0; e = this.clusters_[r]; r++) {
    e.remove();
  }
  for (var s, r = 0; s = this.markers_[r]; r++) {
    s.isAdded = !1, t && s.setMap(null);
  }
  this.clusters_ = []
}, MarkerClusterer.prototype.repaint = function () {
  var t = this.clusters_.slice();
  this.clusters_.length = 0, this.resetViewport(), this.redraw(), window.setTimeout(function () {
    for (var e, r = 0; e = t[r]; r++) {
      e.remove()
    }
  }, 0)
}, MarkerClusterer.prototype.redraw = function () {
  this.createClusters_()
}, MarkerClusterer.prototype.distanceBetweenPoints_ = function (t, e) {
  if (!t || !e) {
    return 0;
  }
  var r = 6371, s = (e.lat() - t.lat()) * Math.PI / 180, o = (e.lng() - t.lng()) * Math.PI / 180, i = Math.sin(s / 2) * Math.sin(s / 2) + Math.cos(t.lat() * Math.PI / 180) * Math.cos(e.lat() * Math.PI / 180) * Math.sin(o / 2) * Math.sin(o / 2), a = 2 * Math.atan2(Math.sqrt(i), Math.sqrt(1 - i)), n = r * a;
  return n
}, MarkerClusterer.prototype.addToClosestCluster_ = function (t) {
  for (var e, r = 4e4, s = null, o = (t.getPosition(), 0); e = this.clusters_[o]; o++) {
    var i = e.getCenter();
    if (i) {
      var a = this.distanceBetweenPoints_(i, t.getPosition());
      r > a && (r = a, s = e)
    }
  }
  if (s && s.isMarkerInClusterBounds(t)) {
    s.addMarker(t);
  }
  else {
    var e = new Cluster(this);
    e.addMarker(t), this.clusters_.push(e)
  }
}, MarkerClusterer.prototype.createClusters_ = function () {
  if (this.ready_) {
    for (var t, e = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast()), r = this.getExtendedBounds(e), s = 0; t = this.markers_[s]; s++) {
      !t.isAdded && this.isMarkerInBounds_(t, r) && this.addToClosestCluster_(t)
    }
  }
}, Cluster.prototype.isMarkerAlreadyAdded = function (t) {
  if (this.markers_.indexOf) {
    return -1 != this.markers_.indexOf(t);
  }
  for (var e, r = 0; e = this.markers_[r]; r++) {
    if (e == t) {
      return !0;
    }
  }
  return !1
}, Cluster.prototype.addMarker = function (t) {
  if (this.isMarkerAlreadyAdded(t)) {
    return !1;
  }
  if (this.center_) {
    if (this.averageCenter_) {
      var e = this.markers_.length + 1, r = (this.center_.lat() * (e - 1) + t.getPosition().lat()) / e, s = (this.center_.lng() * (e - 1) + t.getPosition().lng()) / e;
      this.center_ = new google.maps.LatLng(r, s), this.calculateBounds_()
    }
  }
  else {
    this.center_ = t.getPosition(), this.calculateBounds_();
  }
  t.isAdded = !0, this.markers_.push(t);
  var o = this.markers_.length;
  if (o < this.minClusterSize_ && t.getMap() != this.map_ && t.setMap(this.map_), o == this.minClusterSize_) {
    for (var i = 0; o > i; i++) {
      this.markers_[i].setMap(null);
    }
  }
  return o >= this.minClusterSize_ && t.setMap(null), this.updateIcon(), !0
}, Cluster.prototype.getMarkerClusterer = function () {
  return this.markerClusterer_
}, Cluster.prototype.getBounds = function () {
  for (var t, e = new google.maps.LatLngBounds(this.center_, this.center_), r = this.getMarkers(), s = 0; t = r[s]; s++) {
    e.extend(t.getPosition());
  }
  return e
}, Cluster.prototype.remove = function () {
  this.clusterIcon_.remove(), this.markers_.length = 0, delete this.markers_
}, Cluster.prototype.getSize = function () {
  return this.markers_.length
}, Cluster.prototype.getMarkers = function () {
  return this.markers_
}, Cluster.prototype.getCenter = function () {
  return this.center_
}, Cluster.prototype.calculateBounds_ = function () {
  var t = new google.maps.LatLngBounds(this.center_, this.center_);
  this.bounds_ = this.markerClusterer_.getExtendedBounds(t)
}, Cluster.prototype.isMarkerInClusterBounds = function (t) {
  return this.bounds_.contains(t.getPosition())
}, Cluster.prototype.getMap = function () {
  return this.map_
}, Cluster.prototype.updateIcon = function () {
  var t = this.map_.getZoom(), e = this.markerClusterer_.getMaxZoom();
  if (e && t > e) {
    for (var r, s = 0; r = this.markers_[s]; s++) {
      r.setMap(this.map_);
    }
  }
  else {
    if (this.markers_.length < this.minClusterSize_) {
      return void this.clusterIcon_.hide();
    }
    var o = this.markerClusterer_.getStyles().length, i = this.markerClusterer_.getCalculator()(this.markers_, o);
    this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.setSums(i), this.clusterIcon_.show()
  }
}, ClusterIcon.prototype.triggerClusterClick = function () {
  var t = this.cluster_.getMarkerClusterer();
  google.maps.event.trigger(t, "clusterclick", this.cluster_), t.isZoomOnClick() && this.map_.fitBounds(this.cluster_.getBounds())
}, ClusterIcon.prototype.onAdd = function () {
  if (this.div_ = document.createElement("DIV"), this.visible_) {
    var t = this.getPosFromLatLng_(this.center_);
    this.div_.style.cssText = this.createCss(t), this.div_.innerHTML = this.sums_.text
  }
  var e = this.getPanes();
  e.overlayMouseTarget.appendChild(this.div_);
  var r = this;
  google.maps.event.addDomListener(this.div_, "click", function () {
    r.triggerClusterClick()
  })
}, ClusterIcon.prototype.getPosFromLatLng_ = function (t) {
  var e = this.getProjection().fromLatLngToDivPixel(t);
  return e.x -= parseInt(this.width_ / 2, 10), e.y -= parseInt(this.height_ / 2, 10), e
}, ClusterIcon.prototype.draw = function () {
  if (this.visible_) {
    var t = this.getPosFromLatLng_(this.center_);
    this.div_.style.top = t.y + "px", this.div_.style.left = t.x + "px"
  }
}, ClusterIcon.prototype.hide = function () {
  this.div_ && (this.div_.style.display = "none"), this.visible_ = !1
}, ClusterIcon.prototype.show = function () {
  if (this.div_) {
    var t = this.getPosFromLatLng_(this.center_);
    this.div_.style.cssText = this.createCss(t), this.div_.style.display = ""
  }
  this.visible_ = !0
}, ClusterIcon.prototype.remove = function () {
  this.setMap(null)
}, ClusterIcon.prototype.onRemove = function () {
  this.div_ && this.div_.parentNode && (this.hide(), this.div_.parentNode.removeChild(this.div_), this.div_ = null)
}, ClusterIcon.prototype.setSums = function (t) {
  this.sums_ = t, this.text_ = t.text, this.index_ = t.index, this.div_ && (this.div_.innerHTML = t.text), this.useStyle()
}, ClusterIcon.prototype.useStyle = function () {
  var t = Math.max(0, this.sums_.index - 1);
  t = Math.min(this.styles_.length - 1, t);
  var e = this.styles_[t];
  this.url_ = e.url, this.height_ = e.height, this.width_ = e.width, this.textColor_ = e.textColor, this.anchor_ = e.anchor, this.textSize_ = e.textSize, this.backgroundPosition_ = e.backgroundPosition
}, ClusterIcon.prototype.setCenter = function (t) {
  this.center_ = t
}, ClusterIcon.prototype.createCss = function (t) {
  var e = [];
  e.push("background-image:url(" + this.url_ + ");");
  var r = this.backgroundPosition_ ? this.backgroundPosition_ : "0 0";
  e.push("background-position:" + r + ";"), "object" == typeof this.anchor_ ? ("number" == typeof this.anchor_[0] && this.anchor_[0] > 0 && this.anchor_[0] < this.height_ ? e.push("height:" + (this.height_ - this.anchor_[0]) + "px; padding-top:" + this.anchor_[0] + "px;") : e.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px;"), "number" == typeof this.anchor_[1] && this.anchor_[1] > 0 && this.anchor_[1] < this.width_ ? e.push("width:" + (this.width_ - this.anchor_[1]) + "px; padding-left:" + this.anchor_[1] + "px;") : e.push("width:" + this.width_ + "px; text-align:center;")) : e.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px; width:" + this.width_ + "px; text-align:center;");
  var s = this.textColor_ ? this.textColor_ : "black", o = this.textSize_ ? this.textSize_ : 11;
  return e.push("cursor:pointer; top:" + t.y + "px; left:" + t.x + "px; color:" + s + "; position:absolute; font-size:" + o + "px; font-family:Arial,sans-serif; font-weight:bold"), e.join("")
}, window.MarkerClusterer = MarkerClusterer, MarkerClusterer.prototype.addMarker = MarkerClusterer.prototype.addMarker, MarkerClusterer.prototype.addMarkers = MarkerClusterer.prototype.addMarkers, MarkerClusterer.prototype.clearMarkers = MarkerClusterer.prototype.clearMarkers, MarkerClusterer.prototype.fitMapToMarkers = MarkerClusterer.prototype.fitMapToMarkers, MarkerClusterer.prototype.getCalculator = MarkerClusterer.prototype.getCalculator, MarkerClusterer.prototype.getGridSize = MarkerClusterer.prototype.getGridSize, MarkerClusterer.prototype.getExtendedBounds = MarkerClusterer.prototype.getExtendedBounds, MarkerClusterer.prototype.getMap = MarkerClusterer.prototype.getMap, MarkerClusterer.prototype.getMarkers = MarkerClusterer.prototype.getMarkers, MarkerClusterer.prototype.getMaxZoom = MarkerClusterer.prototype.getMaxZoom, MarkerClusterer.prototype.getStyles = MarkerClusterer.prototype.getStyles, MarkerClusterer.prototype.getTotalClusters = MarkerClusterer.prototype.getTotalClusters, MarkerClusterer.prototype.getTotalMarkers = MarkerClusterer.prototype.getTotalMarkers, MarkerClusterer.prototype.redraw = MarkerClusterer.prototype.redraw, MarkerClusterer.prototype.removeMarker = MarkerClusterer.prototype.removeMarker, MarkerClusterer.prototype.removeMarkers = MarkerClusterer.prototype.removeMarkers, MarkerClusterer.prototype.resetViewport = MarkerClusterer.prototype.resetViewport, MarkerClusterer.prototype.repaint = MarkerClusterer.prototype.repaint, MarkerClusterer.prototype.setCalculator = MarkerClusterer.prototype.setCalculator, MarkerClusterer.prototype.setGridSize = MarkerClusterer.prototype.setGridSize, MarkerClusterer.prototype.setMaxZoom = MarkerClusterer.prototype.setMaxZoom, MarkerClusterer.prototype.onAdd = MarkerClusterer.prototype.onAdd, MarkerClusterer.prototype.draw = MarkerClusterer.prototype.draw, Cluster.prototype.getCenter = Cluster.prototype.getCenter, Cluster.prototype.getSize = Cluster.prototype.getSize, Cluster.prototype.getMarkers = Cluster.prototype.getMarkers, ClusterIcon.prototype.onAdd = ClusterIcon.prototype.onAdd, ClusterIcon.prototype.draw = ClusterIcon.prototype.draw, ClusterIcon.prototype.onRemove = ClusterIcon.prototype.onRemove, Object.keys = Object.keys || function (t) {
    var e = [];
    for (var r in t) {
      t.hasOwnProperty(r) && e.push(r);
    }
    return e
  };

var infowindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();

var map_mc = new google.maps.Map(document.getElementById('markercluster'), {
  // disable default UI and add our own settings
  // https://developers.google.com/maps/documentation/javascript/controls#DisablingDefaults
  disableDefaultUI: true,
  fullscreenControl: true,
  scrollwheel: false,
  zoomControl: true,
  zoom: 10,
  // N/A - we are centering using bounds
  // center: new google.maps.LatLng(45.5506509, -122.6624718)
});

var locations_mc = [
  ['CHIEF PDX', 45.5506509, -122.6624718, 'Portland, OR'],
  ['New Seasons Market Williams', 45.548012, -122.667328, 'Portland, OR'],
  ['La Taq', 45.5628801, -122.6483659, 'Portland, OR'],
  ['Alberta Park', 45.564469, -122.645104, 'Portland, OR'],
  ['Fernhill Park', 45.5661579, -122.6256046, 'Portland, OR'],
  ['CHIEF DC', 38.9089576, -77.0422005, 'Washington, DC'],
];

// create array for clustered points
var cluster = [];
function placeMarker(location) {
  var latLng = new google.maps.LatLng(location[1], location[2]);
  var marker2 = new google.maps.Marker({
    position: latLng,
    map_mc: map_mc,
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAtCAYAAAAk09IpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkMWJiOTlkOC0zODFlLTQxZDQtOTM0Ny05YzFjZGEzOGZjMDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTRFRDdFOEE4MzNGMTFFN0JGM0Q5MUVFQUI0RkIyRTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTRFRDdFODk4MzNGMTFFN0JGM0Q5MUVFQUI0RkIyRTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozODhhNTJiOS03YWMwLTQ1NGEtOWUxOC0xYTNmZDkzZTYwM2UiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyODFhNTBkMC1lNDU2LTExN2EtOTQ2ZC1jMjBlYzExNjVmZjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7gv1QSAAAFJklEQVR42sxYe1BUZRQ/vAUlaZH3W5ZdHissq4i8hSAcHhVmWUk04dBjJscyrT8a/rFybMpGJ5vp8U+lhiVR/GHOuI0oNELBIjQQA/EQXF4BoYC6sAt0znJ3ZrGdvd/dB9OZOfN9937nnu93z3de9zosLy/D/4WchT5wdaQ7GoctyLHIm5GjkN245XvIzcityG3IHXz6dgZKhYNBEPk47EYuab4x6DMydgcmJudgfGIWdLpFvYyrqzNEhHqnh4WIICUpYgZv1SBXI19k2cOB75gQRCIORzu6RopU7begFXl2TsOr2H2dCygSQiEpMRTi44Iu461K5N/NWcYsGARSjsMnX1c1eVy73muxL6QlR8L+0pQFnB4mfYLBIJCTDU19B+saeuDm0JTVzhngvxFyM6WQnSE5jZcHmH0GgZxAEAerfmgB3eKSTSJlFH3sXDX5NryGgHQ4vvGgjKMJIKWNzQOHvvtRZTMgBlpaWoaqGhXgi76Ol6+aBYNAwnH4go5mQbtol1xCkVf3aw9N6bjizFnm+IXaG+69AxN2TW7qkdtw9kIz7X3SJBi0inxIPb330i+da5Jtr9R3Q1fPWC7um2PKMgc4860Z1a+ki4pV0YTognEopoQmhORRwVCSJYe4zYH668aOfjivbIHhidtMz//ROUxDAe4fiSHeZwjt9N9UN31YMquBSndth6MVxavuKaQhsC9/O7zzWS1cauQ/7vsaLVnnocxUcTZe9hmOKUlIYitIlf0HiIG8NrjDp4efARlnLT66NTxNQ4Kxz8RS4WMhT491UPliAa9cZXkBG5gRPZh4YzB+d2bYjkga5gd+Ik9euXhxEARu2sgrd/culSwQmczALJZhITcXZ4gM8uGVc3LSQ9Aag3Fi7fjuaxaY5LSYaQdGJwW9qAHM5Ib1bkwPtPeqYWxqhleupWsQ1H/zh7i3aD0NQ8Zgen19PNksM6+Fj75V8sp9eE7JpC/IX+9XncZg6qKj/JjNWXO1DT44c9nk2j08xkOnqqHtLzWTLonYV5+MjfuZa8lbw8exf/GbmWWLqs9/aoB23LAwTQYx4QGwoNPBn/2j8P2VVugZGmfS4bvJE2QxgX2GdtSZ67ZGMSV/k74j8sjPSvZC2dQ5oGeKiEULep+0HfRxAWdx/+kHQ/v0nscSNQ97eQhWagkQ2qc4f8uccU/saNSLkke/W/SobE0qduHKPsdx3ymTzRUuHMP+tD4/J8auQHY9Egs5GZLrOD1mtgdGKt9bslUTI/G3CxDS+/QTCoqS55GXzYKhvoIE0UJ2AcPpJSD9vF8HHKDqbfLQ8+jQNgWCFgfUe4b75AUmMBy9XJAXN5CUGGYTIBkpYkBf7Ca9fLXJlHWoAO0ns7q6OFkFhOoedzz7qKIIBsMBojLxMZnXGiopTIDwENF7OFWxVG1zgN7Et2rOzZJaBCRvZzRZpZ77CwFWgeHohef2JC2FBosEAYkI84Znn9xG39UvCeln+KzThcMrQsM9Z0Wevou6bQaGA/RlVqr44u4iOZM8pYW05MhanH4ltNNjpbKifJlakRBiVojWMS1QQ1NmSdvJap1/qFxkp0v0/+9M/rHEdoLWSQ55xm5gOEDKuOiAE1hfTK4/9bgCcP0UTpVCdTtamDqOoHPW41GsdthMKeRlR1PX9rYlSi0Cg9ahaluGTjpP4UtEv1uz06MMxzO/ZmA4QIMU7hS+K0AkEBTgVWHo9C0hB2t/12Pv/BYVZFj5Af2+BS9lOzC2pH8FGACHpLs3zjjqTgAAAABJRU5ErkJggg=='
  });
  // add markers to custer array
  cluster.push(marker2);
  google.maps.event.addListener(marker2, 'click', function () {
    infowindow.close(); // Close previously opened infowindow
    // Set infowindow content
    infowindow.setContent("<div id='infowindow'><div><strong>" + location[0] + "</strong></div><div>" + location[3] + "</div></div>");
    infowindow.open(map_mc, marker2);
  });
  bounds.extend(latLng);
}

for (var i = 0; i < locations_mc.length; i++) {
  placeMarker(locations_mc[i]);
}

// Sets the viewport to contain the given bounds
map_mc.fitBounds(bounds);

// Add a marker cluster to manage the markers
// Resource: https://developers.google.com/maps/documentation/javascript/marker-clustering
var markerCluster = new MarkerClusterer(map_mc, cluster, {
  // define our custom settings (see https://googlemaps.github.io/js-marker-clusterer/docs/reference.html for additional options)
  // grid size of a cluster in pixels
  gridSize: 34,
  // maximum zoom level that a marker can be part of a cluster
  maxZoom: 12,
  // marker cluster requires 5 images (see https://googlemaps.github.io/js-marker-clusterer/examples/advanced_example.html)
  // cluster images are determined based on how many pins are included in the cluster
  // include path/image prefix to custom images (e.g images/m1.png, images/m2.png, etc)
  //imagePath: '/images/m',
  // alternatively, we can define individual images using styles
  // this example uses the same image for each of the 5 sizes
  styles: [
    {
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1QzFBQ0JGREEwNzQxMUU3ODk0RUFCOTlGQUI3QUM5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1QzFBQ0JGRUEwNzQxMUU3ODk0RUFCOTlGQUI3QUM5NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVDMUFDQkZCQTA3NDExRTc4OTRFQUI5OUZBQjdBQzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVDMUFDQkZDQTA3NDExRTc4OTRFQUI5OUZBQjdBQzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+R2qhJAAABbJJREFUeNrcWl9sU1UY/9asywZr1wHrNsPixsaUyZaJTAFBiCRmgQThhRcHuAcMiZrIg39efPLB6IP6gCbwgsY/jzJNJJKh6YQxAooLMAWGYQbi2o7o1nV2aZvO71dO9dzT03brvaXXfckvdzv33u/8fqfnft/5VzI3N0eLzUog6q0TnywaQW/uOUClFvuEvycYTzHWMloZDzCWMqoYU4wZxh+MG4wRxiBjiBG1koRZczCeZhxgPMtwZXm2SgBC10vl04yvGOgy3zMSZgmZaZB9jKuMfkZPDkHZzCXe7xf+9ptpcO2Lxz+7mfWl3p6WLXz5SHQxq22N+MVeZbzIXH7IwcVc92MH5Xx5j3EIQUb3zN+ROI37IxQIztJUKEqhUIzi8QRFYwkqczqotNRBbreTqtxlVOstp/q6ClpSoaWBBvNxnUf5epjFzVr+TbHzRr6cYHSq9xKJObr1e5hGb4bIH4xQpiwBYQCE+wMRuj46RSXcNLXeCmptdlNTYyU5HIa2KhENuIHr38PCxiwTxQ47+PIto169N/pbiIav/EXhcCyvvoYGgEDg0uU/qbO9mlazQMXQkOeYRzcLu2w6ULCjR/kyoAoKTcfom1N36OxQMG9BqsEP/MEv/CuG+geYT7spUeygmS+nGB65HF3t65O3KTgxS4Uw+IX/W2Nh9RZ4nGReTXmJ4heX8OVLRo1cPnJtknxn/BSLJaiQBv++s34a+XVSvbWS0Sf4LfiXep/RYRDEFVz48e59HfZc+OkuXU0X1iH4zV8Ut8J2vhxUuxwqKIZd5HpRv2IHBc95iUJEPCLnIeSawfPBog5UUT/ynhLuj+giuE7U84yH5YIzQ4GCf0Pz+cYQGRUDz95covD/62oeKlSUyycqgo9ir6k6VFEYbbfIIwUkVjvZMCdo8JIMfLdnE7XfEBw4T1iVWK2y8Excl7/2ZRLlZOyWb95I/6ltYRpeuwX/NFFd8nwIg84AD07taOAFfsp8rEsnapv8FKYPdl2TAS/wU2yrTlSbGmnsbBjVK/aITpQhN01ORm0tanIqqstZaaIa5CembRb1dFFQsTqdqGp1lmpn04xwXJlCeraX7C7KrRNl6G9Op8PWojT8pnWiDOOhsv+fqJBO1G1DB6102lpU5dK0GYdfJ+q6YTHAU2ZrUZ6qNH7XdKJG5Ce8NeW2FlVXW6EW/aIT5ZOfwMqpnU3Dz6cTdVGOIFgKtuuvBV7KUnVY8NeG9D75yYdWV9lSlIZXn5yS1Lj4qfzPqsZKXZQpetQDr2y8VVHfMf7dx8FifWfHMluJAh9lEwF8T2cThbHHO3IBFuvt8m3VrCjXbR68S8rOo27Y8LEc82GbN3qLPmxC/Vs2eXW56bhaqGOKMf1LmGCmCrBB9uQGb1FFoX7wkCfAjJcF35yisD2Kb+uoXNb0YCV1rVtRFEHr1y1P1q/YMeZ5Wvd8tj51mPGzXLC2zUNdj91fYaivva1aLQavVzK9k1GU2GPdy5gwCFvjoW2b68hZWthvDP5RD+pT7A54ZdsDzsqMX0S47MaSgKErcp7YtbOBapYXJirC764dDcl61KUJxg7Bi/ISJYRdonvLT+OGaabLSTu7VyYjo1UJGn7gD36xg68Y6t/KfK7k8jMvNtg87u1p2UTK7jx21pE3mptcyaVgrJwGggtbL0zuztdUUGuLdnc+ZcMMa3fnhbAxFraR//yA8QJJ+1cg0rzKlUTyHMV4hAIT/52jiMUTyTUF5BqnfI6Ck3p9fcZzFKmwfQxBoSDnKKTgcYjFfcHXD0lz4gUEUwJNGuZ3OPEysNAXzRyNQ4M8x3iDlIVQk4YZ+NuMz3WJNZfhaJyZuIwK0RpY7n1GkAjn6WtGvA8/bcJvPF9iVoQtDCb7BRCyHqf0836IzW6x4gPhqfN+mIKfp3tn/ixbvLd6shQTBAeLOU4sWYxnaP8RYAArBAM3cLcJyQAAAABJRU5ErkJggg==',
      height: 53,
      width: 53,
      textSize: '20',
      textColor: '#fff'
    },
    {
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1QzFBQ0JGREEwNzQxMUU3ODk0RUFCOTlGQUI3QUM5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1QzFBQ0JGRUEwNzQxMUU3ODk0RUFCOTlGQUI3QUM5NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVDMUFDQkZCQTA3NDExRTc4OTRFQUI5OUZBQjdBQzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVDMUFDQkZDQTA3NDExRTc4OTRFQUI5OUZBQjdBQzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+R2qhJAAABbJJREFUeNrcWl9sU1UY/9asywZr1wHrNsPixsaUyZaJTAFBiCRmgQThhRcHuAcMiZrIg39efPLB6IP6gCbwgsY/jzJNJJKh6YQxAooLMAWGYQbi2o7o1nV2aZvO71dO9dzT03brvaXXfckvdzv33u/8fqfnft/5VzI3N0eLzUog6q0TnywaQW/uOUClFvuEvycYTzHWMloZDzCWMqoYU4wZxh+MG4wRxiBjiBG1koRZczCeZhxgPMtwZXm2SgBC10vl04yvGOgy3zMSZgmZaZB9jKuMfkZPDkHZzCXe7xf+9ptpcO2Lxz+7mfWl3p6WLXz5SHQxq22N+MVeZbzIXH7IwcVc92MH5Xx5j3EIQUb3zN+ROI37IxQIztJUKEqhUIzi8QRFYwkqczqotNRBbreTqtxlVOstp/q6ClpSoaWBBvNxnUf5epjFzVr+TbHzRr6cYHSq9xKJObr1e5hGb4bIH4xQpiwBYQCE+wMRuj46RSXcNLXeCmptdlNTYyU5HIa2KhENuIHr38PCxiwTxQ47+PIto169N/pbiIav/EXhcCyvvoYGgEDg0uU/qbO9mlazQMXQkOeYRzcLu2w6ULCjR/kyoAoKTcfom1N36OxQMG9BqsEP/MEv/CuG+geYT7spUeygmS+nGB65HF3t65O3KTgxS4Uw+IX/W2Nh9RZ4nGReTXmJ4heX8OVLRo1cPnJtknxn/BSLJaiQBv++s34a+XVSvbWS0Sf4LfiXep/RYRDEFVz48e59HfZc+OkuXU0X1iH4zV8Ut8J2vhxUuxwqKIZd5HpRv2IHBc95iUJEPCLnIeSawfPBog5UUT/ynhLuj+giuE7U84yH5YIzQ4GCf0Pz+cYQGRUDz95covD/62oeKlSUyycqgo9ir6k6VFEYbbfIIwUkVjvZMCdo8JIMfLdnE7XfEBw4T1iVWK2y8Excl7/2ZRLlZOyWb95I/6ltYRpeuwX/NFFd8nwIg84AD07taOAFfsp8rEsnapv8FKYPdl2TAS/wU2yrTlSbGmnsbBjVK/aITpQhN01ORm0tanIqqstZaaIa5CembRb1dFFQsTqdqGp1lmpn04xwXJlCeraX7C7KrRNl6G9Op8PWojT8pnWiDOOhsv+fqJBO1G1DB6102lpU5dK0GYdfJ+q6YTHAU2ZrUZ6qNH7XdKJG5Ce8NeW2FlVXW6EW/aIT5ZOfwMqpnU3Dz6cTdVGOIFgKtuuvBV7KUnVY8NeG9D75yYdWV9lSlIZXn5yS1Lj4qfzPqsZKXZQpetQDr2y8VVHfMf7dx8FifWfHMluJAh9lEwF8T2cThbHHO3IBFuvt8m3VrCjXbR68S8rOo27Y8LEc82GbN3qLPmxC/Vs2eXW56bhaqGOKMf1LmGCmCrBB9uQGb1FFoX7wkCfAjJcF35yisD2Kb+uoXNb0YCV1rVtRFEHr1y1P1q/YMeZ5Wvd8tj51mPGzXLC2zUNdj91fYaivva1aLQavVzK9k1GU2GPdy5gwCFvjoW2b68hZWthvDP5RD+pT7A54ZdsDzsqMX0S47MaSgKErcp7YtbOBapYXJirC764dDcl61KUJxg7Bi/ISJYRdonvLT+OGaabLSTu7VyYjo1UJGn7gD36xg68Y6t/KfK7k8jMvNtg87u1p2UTK7jx21pE3mptcyaVgrJwGggtbL0zuztdUUGuLdnc+ZcMMa3fnhbAxFraR//yA8QJJ+1cg0rzKlUTyHMV4hAIT/52jiMUTyTUF5BqnfI6Ck3p9fcZzFKmwfQxBoSDnKKTgcYjFfcHXD0lz4gUEUwJNGuZ3OPEysNAXzRyNQ4M8x3iDlIVQk4YZ+NuMz3WJNZfhaJyZuIwK0RpY7n1GkAjn6WtGvA8/bcJvPF9iVoQtDCb7BRCyHqf0836IzW6x4gPhqfN+mIKfp3tn/ixbvLd6shQTBAeLOU4sWYxnaP8RYAArBAM3cLcJyQAAAABJRU5ErkJggg==',
      height: 53,
      width: 53,
      textSize: '20',
      textColor: '#fff'
    },
    {
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1QzFBQ0JGREEwNzQxMUU3ODk0RUFCOTlGQUI3QUM5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1QzFBQ0JGRUEwNzQxMUU3ODk0RUFCOTlGQUI3QUM5NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVDMUFDQkZCQTA3NDExRTc4OTRFQUI5OUZBQjdBQzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVDMUFDQkZDQTA3NDExRTc4OTRFQUI5OUZBQjdBQzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+R2qhJAAABbJJREFUeNrcWl9sU1UY/9asywZr1wHrNsPixsaUyZaJTAFBiCRmgQThhRcHuAcMiZrIg39efPLB6IP6gCbwgsY/jzJNJJKh6YQxAooLMAWGYQbi2o7o1nV2aZvO71dO9dzT03brvaXXfckvdzv33u/8fqfnft/5VzI3N0eLzUog6q0TnywaQW/uOUClFvuEvycYTzHWMloZDzCWMqoYU4wZxh+MG4wRxiBjiBG1koRZczCeZhxgPMtwZXm2SgBC10vl04yvGOgy3zMSZgmZaZB9jKuMfkZPDkHZzCXe7xf+9ptpcO2Lxz+7mfWl3p6WLXz5SHQxq22N+MVeZbzIXH7IwcVc92MH5Xx5j3EIQUb3zN+ROI37IxQIztJUKEqhUIzi8QRFYwkqczqotNRBbreTqtxlVOstp/q6ClpSoaWBBvNxnUf5epjFzVr+TbHzRr6cYHSq9xKJObr1e5hGb4bIH4xQpiwBYQCE+wMRuj46RSXcNLXeCmptdlNTYyU5HIa2KhENuIHr38PCxiwTxQ47+PIto169N/pbiIav/EXhcCyvvoYGgEDg0uU/qbO9mlazQMXQkOeYRzcLu2w6ULCjR/kyoAoKTcfom1N36OxQMG9BqsEP/MEv/CuG+geYT7spUeygmS+nGB65HF3t65O3KTgxS4Uw+IX/W2Nh9RZ4nGReTXmJ4heX8OVLRo1cPnJtknxn/BSLJaiQBv++s34a+XVSvbWS0Sf4LfiXep/RYRDEFVz48e59HfZc+OkuXU0X1iH4zV8Ut8J2vhxUuxwqKIZd5HpRv2IHBc95iUJEPCLnIeSawfPBog5UUT/ynhLuj+giuE7U84yH5YIzQ4GCf0Pz+cYQGRUDz95covD/62oeKlSUyycqgo9ir6k6VFEYbbfIIwUkVjvZMCdo8JIMfLdnE7XfEBw4T1iVWK2y8Excl7/2ZRLlZOyWb95I/6ltYRpeuwX/NFFd8nwIg84AD07taOAFfsp8rEsnapv8FKYPdl2TAS/wU2yrTlSbGmnsbBjVK/aITpQhN01ORm0tanIqqstZaaIa5CembRb1dFFQsTqdqGp1lmpn04xwXJlCeraX7C7KrRNl6G9Op8PWojT8pnWiDOOhsv+fqJBO1G1DB6102lpU5dK0GYdfJ+q6YTHAU2ZrUZ6qNH7XdKJG5Ce8NeW2FlVXW6EW/aIT5ZOfwMqpnU3Dz6cTdVGOIFgKtuuvBV7KUnVY8NeG9D75yYdWV9lSlIZXn5yS1Lj4qfzPqsZKXZQpetQDr2y8VVHfMf7dx8FifWfHMluJAh9lEwF8T2cThbHHO3IBFuvt8m3VrCjXbR68S8rOo27Y8LEc82GbN3qLPmxC/Vs2eXW56bhaqGOKMf1LmGCmCrBB9uQGb1FFoX7wkCfAjJcF35yisD2Kb+uoXNb0YCV1rVtRFEHr1y1P1q/YMeZ5Wvd8tj51mPGzXLC2zUNdj91fYaivva1aLQavVzK9k1GU2GPdy5gwCFvjoW2b68hZWthvDP5RD+pT7A54ZdsDzsqMX0S47MaSgKErcp7YtbOBapYXJirC764dDcl61KUJxg7Bi/ISJYRdonvLT+OGaabLSTu7VyYjo1UJGn7gD36xg68Y6t/KfK7k8jMvNtg87u1p2UTK7jx21pE3mptcyaVgrJwGggtbL0zuztdUUGuLdnc+ZcMMa3fnhbAxFraR//yA8QJJ+1cg0rzKlUTyHMV4hAIT/52jiMUTyTUF5BqnfI6Ck3p9fcZzFKmwfQxBoSDnKKTgcYjFfcHXD0lz4gUEUwJNGuZ3OPEysNAXzRyNQ4M8x3iDlIVQk4YZ+NuMz3WJNZfhaJyZuIwK0RpY7n1GkAjn6WtGvA8/bcJvPF9iVoQtDCb7BRCyHqf0836IzW6x4gPhqfN+mIKfp3tn/ixbvLd6shQTBAeLOU4sWYxnaP8RYAArBAM3cLcJyQAAAABJRU5ErkJggg==',
      height: 53,
      width: 53,
      textSize: '20',
      textColor: '#fff'
    },
    {
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1QzFBQ0JGREEwNzQxMUU3ODk0RUFCOTlGQUI3QUM5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1QzFBQ0JGRUEwNzQxMUU3ODk0RUFCOTlGQUI3QUM5NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVDMUFDQkZCQTA3NDExRTc4OTRFQUI5OUZBQjdBQzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVDMUFDQkZDQTA3NDExRTc4OTRFQUI5OUZBQjdBQzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+R2qhJAAABbJJREFUeNrcWl9sU1UY/9asywZr1wHrNsPixsaUyZaJTAFBiCRmgQThhRcHuAcMiZrIg39efPLB6IP6gCbwgsY/jzJNJJKh6YQxAooLMAWGYQbi2o7o1nV2aZvO71dO9dzT03brvaXXfckvdzv33u/8fqfnft/5VzI3N0eLzUog6q0TnywaQW/uOUClFvuEvycYTzHWMloZDzCWMqoYU4wZxh+MG4wRxiBjiBG1koRZczCeZhxgPMtwZXm2SgBC10vl04yvGOgy3zMSZgmZaZB9jKuMfkZPDkHZzCXe7xf+9ptpcO2Lxz+7mfWl3p6WLXz5SHQxq22N+MVeZbzIXH7IwcVc92MH5Xx5j3EIQUb3zN+ROI37IxQIztJUKEqhUIzi8QRFYwkqczqotNRBbreTqtxlVOstp/q6ClpSoaWBBvNxnUf5epjFzVr+TbHzRr6cYHSq9xKJObr1e5hGb4bIH4xQpiwBYQCE+wMRuj46RSXcNLXeCmptdlNTYyU5HIa2KhENuIHr38PCxiwTxQ47+PIto169N/pbiIav/EXhcCyvvoYGgEDg0uU/qbO9mlazQMXQkOeYRzcLu2w6ULCjR/kyoAoKTcfom1N36OxQMG9BqsEP/MEv/CuG+geYT7spUeygmS+nGB65HF3t65O3KTgxS4Uw+IX/W2Nh9RZ4nGReTXmJ4heX8OVLRo1cPnJtknxn/BSLJaiQBv++s34a+XVSvbWS0Sf4LfiXep/RYRDEFVz48e59HfZc+OkuXU0X1iH4zV8Ut8J2vhxUuxwqKIZd5HpRv2IHBc95iUJEPCLnIeSawfPBog5UUT/ynhLuj+giuE7U84yH5YIzQ4GCf0Pz+cYQGRUDz95covD/62oeKlSUyycqgo9ir6k6VFEYbbfIIwUkVjvZMCdo8JIMfLdnE7XfEBw4T1iVWK2y8Excl7/2ZRLlZOyWb95I/6ltYRpeuwX/NFFd8nwIg84AD07taOAFfsp8rEsnapv8FKYPdl2TAS/wU2yrTlSbGmnsbBjVK/aITpQhN01ORm0tanIqqstZaaIa5CembRb1dFFQsTqdqGp1lmpn04xwXJlCeraX7C7KrRNl6G9Op8PWojT8pnWiDOOhsv+fqJBO1G1DB6102lpU5dK0GYdfJ+q6YTHAU2ZrUZ6qNH7XdKJG5Ce8NeW2FlVXW6EW/aIT5ZOfwMqpnU3Dz6cTdVGOIFgKtuuvBV7KUnVY8NeG9D75yYdWV9lSlIZXn5yS1Lj4qfzPqsZKXZQpetQDr2y8VVHfMf7dx8FifWfHMluJAh9lEwF8T2cThbHHO3IBFuvt8m3VrCjXbR68S8rOo27Y8LEc82GbN3qLPmxC/Vs2eXW56bhaqGOKMf1LmGCmCrBB9uQGb1FFoX7wkCfAjJcF35yisD2Kb+uoXNb0YCV1rVtRFEHr1y1P1q/YMeZ5Wvd8tj51mPGzXLC2zUNdj91fYaivva1aLQavVzK9k1GU2GPdy5gwCFvjoW2b68hZWthvDP5RD+pT7A54ZdsDzsqMX0S47MaSgKErcp7YtbOBapYXJirC764dDcl61KUJxg7Bi/ISJYRdonvLT+OGaabLSTu7VyYjo1UJGn7gD36xg68Y6t/KfK7k8jMvNtg87u1p2UTK7jx21pE3mptcyaVgrJwGggtbL0zuztdUUGuLdnc+ZcMMa3fnhbAxFraR//yA8QJJ+1cg0rzKlUTyHMV4hAIT/52jiMUTyTUF5BqnfI6Ck3p9fcZzFKmwfQxBoSDnKKTgcYjFfcHXD0lz4gUEUwJNGuZ3OPEysNAXzRyNQ4M8x3iDlIVQk4YZ+NuMz3WJNZfhaJyZuIwK0RpY7n1GkAjn6WtGvA8/bcJvPF9iVoQtDCb7BRCyHqf0836IzW6x4gPhqfN+mIKfp3tn/ixbvLd6shQTBAeLOU4sWYxnaP8RYAArBAM3cLcJyQAAAABJRU5ErkJggg==',
      height: 53,
      width: 53,
      textSize: '20',
      textColor: '#fff'
    },
    {
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1QzFBQ0JGREEwNzQxMUU3ODk0RUFCOTlGQUI3QUM5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1QzFBQ0JGRUEwNzQxMUU3ODk0RUFCOTlGQUI3QUM5NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVDMUFDQkZCQTA3NDExRTc4OTRFQUI5OUZBQjdBQzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVDMUFDQkZDQTA3NDExRTc4OTRFQUI5OUZBQjdBQzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+R2qhJAAABbJJREFUeNrcWl9sU1UY/9asywZr1wHrNsPixsaUyZaJTAFBiCRmgQThhRcHuAcMiZrIg39efPLB6IP6gCbwgsY/jzJNJJKh6YQxAooLMAWGYQbi2o7o1nV2aZvO71dO9dzT03brvaXXfckvdzv33u/8fqfnft/5VzI3N0eLzUog6q0TnywaQW/uOUClFvuEvycYTzHWMloZDzCWMqoYU4wZxh+MG4wRxiBjiBG1koRZczCeZhxgPMtwZXm2SgBC10vl04yvGOgy3zMSZgmZaZB9jKuMfkZPDkHZzCXe7xf+9ptpcO2Lxz+7mfWl3p6WLXz5SHQxq22N+MVeZbzIXH7IwcVc92MH5Xx5j3EIQUb3zN+ROI37IxQIztJUKEqhUIzi8QRFYwkqczqotNRBbreTqtxlVOstp/q6ClpSoaWBBvNxnUf5epjFzVr+TbHzRr6cYHSq9xKJObr1e5hGb4bIH4xQpiwBYQCE+wMRuj46RSXcNLXeCmptdlNTYyU5HIa2KhENuIHr38PCxiwTxQ47+PIto169N/pbiIav/EXhcCyvvoYGgEDg0uU/qbO9mlazQMXQkOeYRzcLu2w6ULCjR/kyoAoKTcfom1N36OxQMG9BqsEP/MEv/CuG+geYT7spUeygmS+nGB65HF3t65O3KTgxS4Uw+IX/W2Nh9RZ4nGReTXmJ4heX8OVLRo1cPnJtknxn/BSLJaiQBv++s34a+XVSvbWS0Sf4LfiXep/RYRDEFVz48e59HfZc+OkuXU0X1iH4zV8Ut8J2vhxUuxwqKIZd5HpRv2IHBc95iUJEPCLnIeSawfPBog5UUT/ynhLuj+giuE7U84yH5YIzQ4GCf0Pz+cYQGRUDz95covD/62oeKlSUyycqgo9ir6k6VFEYbbfIIwUkVjvZMCdo8JIMfLdnE7XfEBw4T1iVWK2y8Excl7/2ZRLlZOyWb95I/6ltYRpeuwX/NFFd8nwIg84AD07taOAFfsp8rEsnapv8FKYPdl2TAS/wU2yrTlSbGmnsbBjVK/aITpQhN01ORm0tanIqqstZaaIa5CembRb1dFFQsTqdqGp1lmpn04xwXJlCeraX7C7KrRNl6G9Op8PWojT8pnWiDOOhsv+fqJBO1G1DB6102lpU5dK0GYdfJ+q6YTHAU2ZrUZ6qNH7XdKJG5Ce8NeW2FlVXW6EW/aIT5ZOfwMqpnU3Dz6cTdVGOIFgKtuuvBV7KUnVY8NeG9D75yYdWV9lSlIZXn5yS1Lj4qfzPqsZKXZQpetQDr2y8VVHfMf7dx8FifWfHMluJAh9lEwF8T2cThbHHO3IBFuvt8m3VrCjXbR68S8rOo27Y8LEc82GbN3qLPmxC/Vs2eXW56bhaqGOKMf1LmGCmCrBB9uQGb1FFoX7wkCfAjJcF35yisD2Kb+uoXNb0YCV1rVtRFEHr1y1P1q/YMeZ5Wvd8tj51mPGzXLC2zUNdj91fYaivva1aLQavVzK9k1GU2GPdy5gwCFvjoW2b68hZWthvDP5RD+pT7A54ZdsDzsqMX0S47MaSgKErcp7YtbOBapYXJirC764dDcl61KUJxg7Bi/ISJYRdonvLT+OGaabLSTu7VyYjo1UJGn7gD36xg68Y6t/KfK7k8jMvNtg87u1p2UTK7jx21pE3mptcyaVgrJwGggtbL0zuztdUUGuLdnc+ZcMMa3fnhbAxFraR//yA8QJJ+1cg0rzKlUTyHMV4hAIT/52jiMUTyTUF5BqnfI6Ck3p9fcZzFKmwfQxBoSDnKKTgcYjFfcHXD0lz4gUEUwJNGuZ3OPEysNAXzRyNQ4M8x3iDlIVQk4YZ+NuMz3WJNZfhaJyZuIwK0RpY7n1GkAjn6WtGvA8/bcJvPF9iVoQtDCb7BRCyHqf0836IzW6x4gPhqfN+mIKfp3tn/ixbvLd6shQTBAeLOU4sWYxnaP8RYAArBAM3cLcJyQAAAABJRU5ErkJggg==',
      height: 53,
      width: 53,
      textSize: '20',
      textColor: '#fff'
    }
  ]
});
