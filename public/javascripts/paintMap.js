function startMap() {
  const sol = {
    lat: parseFloat(document.getElementById('latitude').value),
    lng: parseFloat(document.getElementById('longitude').value)
  };
    const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: sol
    });
  let markers = [];
  var latitude =parseFloat(document.getElementById('latitude').value);
  var longitude=parseFloat(document.getElementById('longitude').value);
  console.log (latitude,longitude);
  let position = {
    lat: latitude,
    lng: longitude
  };
  var pin = new google.maps.Marker({ position, map, title: "Here"  });
  pin.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
  markers.push(pin);

}
/////////////////////////////////////////////////////////


window.addEventListener("load",function(event){
  startMap();
});
