$(function() {
    let map = null;
    const arrVehicle = [];
    const mapDiv = document.getElementById('map');
    const myLocation = new google.maps.LatLng(10.8230989 , 106.6296638);
    const mapOptions = {
      center: myLocation,
      zoom: 13,
      zoomControl: false,
      streetViewControl: false,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
  }
    // create map
    function initMap() {
        map = new google.maps.Map(mapDiv, mapOptions);
        const marker = new google.maps.Marker({
            position: myLocation,
            map: map,
            animation: google.maps.Animation.BOUNCE,
            icon: './resources/man_green.png',
            title: 'User is waiting the vehicle'
        });
        const content = `<div>
        <button type="button" class="btn btn-outline-info">Choose</button>
        </div>`;
        const info = new google.maps.InfoWindow({
            content,
            maxWidth: 200
        });
        marker.addListener('click' ,() => {
          // info.open(map,marker)
          const positionUser = marker.getPosition();
          arrVehicle.forEach(e => {
            const positionCar = e.getPosition();
            const distance = google.maps.geometry.spherical.computeDistanceBetween(positionUser, positionCar);
            console.log(distance);
          });
          

        });
        map.addListener('click',() => info.close())
    }
    
    

    // create marker
    function createMarkers(pos) {
      const newMarker = new google.maps.Marker({
        position: pos,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: './resources/car_green.png',
        title: 'This is vehicle'
      });
      arrVehicle.push(newMarker);
    }

    // socket.io
    const socket = io();
    socket.on('LIST_RIDER' , arrRider => {
      arrRider.forEach(e => {
        const pos = { lat: +e.lat, lng: +e.lng };
        // const position = new google.maps.LatLng(pos);
        createMarkers(pos);
        // const distance = google.maps.geometry.spherical.computeDistanceBetween(myLocation , position , 6378137);
      });
      // console.log(arrVehicle);
    });

    // call function
    initMap();
});
