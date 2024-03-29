/**
 * @file
 * Loading and intializing a javascript google map clustering library
 *
 * This is specifically to be used for marker clustering
 * Docs: https://developers.google.com/maps/documentation/javascript/marker-clustering
 */

import 'gmaps-marker-clusterer';

const gmapCluster = () => {
  const infowindow = new google.maps.InfoWindow();
  const bounds = new google.maps.LatLngBounds();
  
  const map_mc = new google.maps.Map(document.getElementById('markercluster'), {
    // disable default UI and add our own settings
    // https://developers.google.com/maps/documentation/javascript/controls#DisablingDefaults
    disableDefaultUI: true,
    fullscreenControl: true,
    scrollwheel: false,
    zoomControl: true,
    zoom: 10
    // N/A - we are centering using bounds
    // center: new google.maps.LatLng(45.5506509, -122.6624718)
  });
  
  const locations_mc = [
    ['CHIEF PDX', 45.5506509, -122.6624718, 'Portland, OR'],
    ['New Seasons Market Williams', 45.548012, -122.667328, 'Portland, OR'],
    ['La Taq', 45.5628801, -122.6483659, 'Portland, OR'],
    ['Alberta Park', 45.564469, -122.645104, 'Portland, OR'],
    ['Fernhill Park', 45.5661579, -122.6256046, 'Portland, OR'],
    ['CHIEF DC', 38.9089576, -77.0422005, 'Washington, DC']
  ];
  
  // create array for clustered points
  const cluster = [];
  
  const placeMarker = location => {
    const latLng = new google.maps.LatLng(location[1], location[2]);
    const marker2 = new google.maps.Marker({
      position: latLng,
      map_mc: map_mc,
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAtCAYAAAAk09IpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkMWJiOTlkOC0zODFlLTQxZDQtOTM0Ny05YzFjZGEzOGZjMDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTRFRDdFOEE4MzNGMTFFN0JGM0Q5MUVFQUI0RkIyRTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTRFRDdFODk4MzNGMTFFN0JGM0Q5MUVFQUI0RkIyRTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozODhhNTJiOS03YWMwLTQ1NGEtOWUxOC0xYTNmZDkzZTYwM2UiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyODFhNTBkMC1lNDU2LTExN2EtOTQ2ZC1jMjBlYzExNjVmZjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7gv1QSAAAFJklEQVR42sxYe1BUZRQ/vAUlaZH3W5ZdHissq4i8hSAcHhVmWUk04dBjJscyrT8a/rFybMpGJ5vp8U+lhiVR/GHOuI0oNELBIjQQA/EQXF4BoYC6sAt0znJ3ZrGdvd/dB9OZOfN9937nnu93z3de9zosLy/D/4WchT5wdaQ7GoctyLHIm5GjkN245XvIzcityG3IHXz6dgZKhYNBEPk47EYuab4x6DMydgcmJudgfGIWdLpFvYyrqzNEhHqnh4WIICUpYgZv1SBXI19k2cOB75gQRCIORzu6RopU7begFXl2TsOr2H2dCygSQiEpMRTi44Iu461K5N/NWcYsGARSjsMnX1c1eVy73muxL6QlR8L+0pQFnB4mfYLBIJCTDU19B+saeuDm0JTVzhngvxFyM6WQnSE5jZcHmH0GgZxAEAerfmgB3eKSTSJlFH3sXDX5NryGgHQ4vvGgjKMJIKWNzQOHvvtRZTMgBlpaWoaqGhXgi76Ol6+aBYNAwnH4go5mQbtol1xCkVf3aw9N6bjizFnm+IXaG+69AxN2TW7qkdtw9kIz7X3SJBi0inxIPb330i+da5Jtr9R3Q1fPWC7um2PKMgc4860Z1a+ki4pV0YTognEopoQmhORRwVCSJYe4zYH668aOfjivbIHhidtMz//ROUxDAe4fiSHeZwjt9N9UN31YMquBSndth6MVxavuKaQhsC9/O7zzWS1cauQ/7vsaLVnnocxUcTZe9hmOKUlIYitIlf0HiIG8NrjDp4efARlnLT66NTxNQ4Kxz8RS4WMhT491UPliAa9cZXkBG5gRPZh4YzB+d2bYjkga5gd+Ik9euXhxEARu2sgrd/culSwQmczALJZhITcXZ4gM8uGVc3LSQ9Aag3Fi7fjuaxaY5LSYaQdGJwW9qAHM5Ib1bkwPtPeqYWxqhleupWsQ1H/zh7i3aD0NQ8Zgen19PNksM6+Fj75V8sp9eE7JpC/IX+9XncZg6qKj/JjNWXO1DT44c9nk2j08xkOnqqHtLzWTLonYV5+MjfuZa8lbw8exf/GbmWWLqs9/aoB23LAwTQYx4QGwoNPBn/2j8P2VVugZGmfS4bvJE2QxgX2GdtSZ67ZGMSV/k74j8sjPSvZC2dQ5oGeKiEULep+0HfRxAWdx/+kHQ/v0nscSNQ97eQhWagkQ2qc4f8uccU/saNSLkke/W/SobE0qduHKPsdx3ymTzRUuHMP+tD4/J8auQHY9Egs5GZLrOD1mtgdGKt9bslUTI/G3CxDS+/QTCoqS55GXzYKhvoIE0UJ2AcPpJSD9vF8HHKDqbfLQ8+jQNgWCFgfUe4b75AUmMBy9XJAXN5CUGGYTIBkpYkBf7Ca9fLXJlHWoAO0ns7q6OFkFhOoedzz7qKIIBsMBojLxMZnXGiopTIDwENF7OFWxVG1zgN7Et2rOzZJaBCRvZzRZpZ77CwFWgeHohef2JC2FBosEAYkI84Znn9xG39UvCeln+KzThcMrQsM9Z0Wevou6bQaGA/RlVqr44u4iOZM8pYW05MhanH4ltNNjpbKifJlakRBiVojWMS1QQ1NmSdvJap1/qFxkp0v0/+9M/rHEdoLWSQ55xm5gOEDKuOiAE1hfTK4/9bgCcP0UTpVCdTtamDqOoHPW41GsdthMKeRlR1PX9rYlSi0Cg9ahaluGTjpP4UtEv1uz06MMxzO/ZmA4QIMU7hS+K0AkEBTgVWHo9C0hB2t/12Pv/BYVZFj5Af2+BS9lOzC2pH8FGACHpLs3zjjqTgAAAABJRU5ErkJggg==',
    });
    // add markers to custer array
    cluster.push(marker2);
    google.maps.event.addListener(marker2, 'click', () => {
      infowindow.close(); // Close previously opened infowindow
      // Set infowindow content
      infowindow.setContent("<div id='infowindow'><div><strong>" + location[0] + "</strong></div><div>" + location[3] + "</div></div>");
      infowindow.open(map_mc, marker2);
    });
    bounds.extend(latLng);
  }
  
  locations_mc.forEach(location => placeMarker(location));
  
  // Sets the viewport to contain the given bounds
  map_mc.fitBounds(bounds);
  
  // Add a marker cluster to manage the markers
  const markerCluster = new MarkerClusterer(map_mc, cluster, {
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
}

export default gmapCluster;

