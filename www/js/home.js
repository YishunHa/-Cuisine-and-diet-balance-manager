

      var pyrmont;
      var map;
      var infowindow;
      var service;        
     //initMap();
      var infowindowContent;
      function initMap() {
      
       
        pyrmont = {lat: -33.867, lng: 151.195};

        map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 15
        });
        
        var input = document.getElementById('pac-input');

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        infowindow = new google.maps.InfoWindow();
        infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        
        var marker = new google.maps.Marker({
          map: map
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        
        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            return;
          }
//          debugger;   
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }

          // Set the position of the marker using the place ID and location.
          marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
          });
          marker.setVisible(true);

          infowindowContent.children['place-name'].textContent = place.name;
//          infowindowContent.children['place-id'].textContent = place.place_id;
          infowindowContent.children['place-address'].textContent =
              place.formatted_address;
          infowindow.open(map, marker);
        
          service = new google.maps.places.PlacesService(map);
//          debugger; 
          pyrmont = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
          service.nearbySearch({
          location: pyrmont,
          radius: 500
          //type: ['store']
        }, callback);
        
        
        
        });
        
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pyrmont,
          radius: 500
        }, callback);
      }

function detailcallback(results, status){
//  debugger;
  //mylog(results);
  
}
  
  function addImageToDiv(imgarray){
//      debugger;
    /*  
    var elements = document.getElementById('container').getElementsByTagName('img');
    if(elements!=null){
      for (var i = 0; i < elements.length-1; i++) {
        elements[i].style.display = 'none';
    }
      
    }
    */
    var node = document.getElementById('container');
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    if(imgarray===null){
      
      return;
    }
    if(imgarray.length<=0){
      
      return;
    }
    for(var j=0;j<=imgarray.length-1;j++){
      var elem = document.createElement("img");
elem.setAttribute("src", imgarray[j]);
elem.setAttribute("height", "300px");
elem.setAttribute("width", "100%");
 //elem.setAttribute("alt", "Flower");

      
    document.getElementById("container").appendChild(elem);  
      
    }
    
  }


function retriveImage(results){
  //debugger;
  var imglist=[];
  
  for(var i=0;i<=results.length-1;i++){
    
    if(results[i].hasOwnProperty('photos')){
       var photos=results[i].photos;
        for(var j=0;j<=photos.length-1;j++){
          var imgUrl=photos[j].getUrl({'maxWidth': 300, 'maxHeight': 300});
          console.log(imgUrl);
          imglist.push(imgUrl);
          //window.open(imgUrl, '_blank');
          //addImageToDiv(imgUrl);
          
        }
      
    }
  }
    //debugger;
  return imglist;
  
} 

      function callback(results, status) {
        //mycallback(results, status);
//        debugger;
        //var tmp=JSON.parse(results);
        //console.log("hi");
        if (status === google.maps.places.PlacesServiceStatus.OK) {
         
          
        // debugger; 
        var imglist=[];  
        imglist=retriveImage(results);
         addImageToDiv(imglist); 
          
          /*
          var request1 = {
  //placeId: results[0].place_id
             reference: results[0].reference
            
};

          service.getDetails(request1, detailcallback);
          
          
          for (var i = 0; i < results.length; i++) {
            //createMarker(results[i]);
            //console.log("hi");
          }
          */
        }
        
        
        
      }
      
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
          
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
        
        
      }
  
//  
//google.maps.event.addDomListener(window, 'load', initMap);  