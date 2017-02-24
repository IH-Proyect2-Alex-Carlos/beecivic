function startMap() {
  //initial position
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
    console.log(position);
    console.log('center: ', center);
    map.setCenter(center);
    var madMarker = new google.maps.Marker({
      position:center,
      map: map,
      title: "I'm here"
  });
  document.getElementById('latitude').value=center.lat;
  document.getElementById('longitude').value =center.lng;
    // User granted permission
    }, function () { console.log('Error in the geolocation service.');});
  } else { console.log('Browser does not support geolocation.');}
}
/////////////////////////////////////////////////////////


window.addEventListener("load",function(event){
  startMap();
});
