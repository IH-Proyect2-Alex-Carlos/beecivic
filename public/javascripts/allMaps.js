function startMap() {
  const sol = {
    lat: 40.417080,
    lng: -3.703612
  };
  //Create the map
  var map;
    map = new google.maps.Map(document.getElementById('map'), {
      center: sol,
      zoom: 8
    });

    // Get current position The permissions dialog will popup
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
    // Create an object to match google's Lat-Lng object format
    const center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    map.setCenter(center);
    var madMarker = new google.maps.Marker({
      position:center,
      map: map,
      title: "I'm here"
  });
    }, function () { console.log('Error in the geolocation service.');});
  } else { console.log('Browser does not support geolocation.');}

  let markers = [];
  myDenuncias.forEach(function(denuncia){
    let position = {
      lat: parseFloat(denuncia.location.coordinates[1]),
      lng: parseFloat(denuncia.location.coordinates[0])
    };
    var pin = new google.maps.Marker({ position, map, title:"" });
    pin.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
    markers.push(pin);
  });

}
/////////////////////////////////////////////////////////


window.addEventListener("load",function(event){
  startMap();
});
