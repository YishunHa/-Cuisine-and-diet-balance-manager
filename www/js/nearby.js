var map;
var infowindow;
var service;
var input;  
var marker;
var Loca;
var autocomplete;
                                       

function exit(){
    navigator.app.exitApp();  
}

function initMap() {
    var defaultLat=-33.867;
    var defaultLng=151.195;
    var pyrmont =   {lat: defaultLat, lng: defaultLng};
    var input = document.getElementById('searchTextField');
    var options = {
        // bounds: defaultBounds,
        type: ['']
    };
    autocomplete = new google.maps.places.Autocomplete(input, options);
    map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: pyrmont,
    }); 
    marker= new google.maps.Marker({
        position:pyrmont,
        map: map,
        draggable:true,
        label:"A"
    });
    search(autocomplete);
    searchNearby(pyrmont);  
}
function search(r){
    google.maps.event.addListener(r, 'place_changed', function() {
   
  var lat = autocomplete.getPlace().geometry.location.lat();
var lng = autocomplete.getPlace().geometry.location.lng();
  var  myLatLng={lat: lat, lng: lng};
map.setCenter(myLatLng);
var marker=new google.maps.Marker({position: myLatLng, map: map,
             label:"A"});
infowindow = new google.maps.InfoWindow();
service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
          location: myLatLng,
          radius: '500',
          type: ['food']
        }, callback);
});
}

function myPosition(){
      console.log("hi");    
      if(navigator.geolocation){ 
          getPosition();
        }else{
        console.log("Your browser does not support Geolocation!");           
}   
     
 }   


function searchNearby(pyrmont){
     infowindow = new google.maps.InfoWindow();
     service = new google.maps.places.PlacesService(map);
     service.nearbySearch({
         location: pyrmont,
         radius: '500',
         type: ['restaurant']
     }, callback);
 }   


function getPosition() {	

	navigator.geolocation.getCurrentPosition(successPosition,locationError);   
}


function successPosition(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    Loca= {lat: latitude, lng: longitude}; 
   
    console.log(Loca);
    map.setCenter(Loca);
    marker=new google.maps.Marker({position: Loca, map: map,label:"A"});
    searchNearby(Loca);

    infowindow.setContent('<span style="padding: 0px; text-align:left" align="left"><h4>You Are Here!!</h4></span>');
    infowindow.close(map, marker);
    infowindow.open(map, marker);
}


function locationError(error){
    switch(error.code) {
        case error.TIMEOUT:
            console.log("A timeout occured! Please try again!");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log('We can\'t detect your location. Sorry!');
            break;
        case error.PERMISSION_DENIED:
            console.log('Please allow geolocation access for this to work.');
            break;
        case error.UNKNOWN_ERROR:
            console.log('An unknown error occured!');
            break;
    }
}


function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}


function createMarker(place) {
    var placeLoc = place.geometry.location;
    var markers = new google.maps.Marker({
        map: map,
        title: place.title ,
        position: placeLoc,
    });
    
    google.maps.event.addListener(markers, 'click', function() {
        service.getDetails(place, function(result, status) {
            infowindow.setContent('<span style="padding: 0px; text-align:left"  align="left"><h4>'+result.name+'</h4></span><span style="padding: 0px; text-align:left" align="left"><h5>'+result.vicinity+'</h5></span>'+'<span style="padding: 0px; text-align:left" align="left"><h5>'+'Rating:'+(result.rating)+'★'+'(of 5)'+' '+'</h5></span>');
            infowindow.open(map, markers);
        });     
    });
}

