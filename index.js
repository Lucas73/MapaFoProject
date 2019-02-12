var enlace = jQuery('.ubicar');
var longitud = jQuery('.longitud');
var latitud = jQuery('.latitud');
var mensaje = jQuery('.mensaje');

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 34.397, lng: 150.644 },
      scrollwheel: false,
      zoom: 2
  })};

if (navigator.geolocation) {
  enlace.click(function(e) {
    console.log('entra');
    e.preventDefault();
    mensaje.html("Cargando...");
    navigator.geolocation.getCurrentPosition(insertarUbicacion, errorUbicacion);
  });
} else {
  alert('Lo sentimos, tu navegador no soporta geolocation');
}

function insertarUbicacion(posicion) {
  let glatitud = posicion.coords.latitude;
  console.log(posicion.coords.latitude);
  let glongitud  = posicion.coords.longitude;
  console.log(posicion.coords.longitude);
  jQuery('#mapa').html('<iframe width="400" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.co.uk/?ie=UTF8&amp;ll='+glatitud+','+glongitud+'&amp;spn=0.332359,0.617294&amp;t=m&amp;z=11&amp;output=embed"></iframe>');
 
  longitud.html('Longitud: '+glongitud);
  latitud.html('Latitud: '+glatitud);
 
  //Llamada a la API de Google <----------------------
  jQuery.ajax({
      url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+glatitud+','+glongitud+'&sensor=true&callback=initMap',
      type: 'POST',
      dataType: 'json',
      error: function(xhr, textStatus, errorThrown) {
          errorUbicacion();
       }
   });
}
 
function errorUbicacion() {
   alert('No pudimos encontrar tu ubicación exacta');
}

function initMap() {
  var marker1 = new google.maps.Marker(document.getElementById('mapa'), {
  position: {lat: glatitud, lng: glongitud},
  draggable: false,
  scrollwheel: false,
  zoom: 8,
  zoomControl: true,
  rotateControl : false,
  mapTypeControl: true,
  streetViewControl: false,
  })};

