$(function() {
  let curentWindow = false; // toggle window info
  const arrVehicle = [];
  const arrRider = [];

  // set defaut map first run
  const mapDiv = document.getElementById('map');
  const myLocation = new google.maps.LatLng(10.8230989, 106.6296638);
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
  const map = new google.maps.Map(mapDiv, mapOptions);
  /* -------------------------------------------------------------- */


  // socket.io
  const socket = io();
  socket.on('LIST_RIDER', arrDriver => {
    arrDriver.forEach(e => {
      const pos = { lat: +e.lat, lng: +e.lng };
      createVehicleMarkers(pos);
    });
  });
  socket.on('NEW_RIDER', rider => {
    const pos = { lat: +rider.lat, lng: +rider.lng };
    const { key } = rider;
    createUserMarkers(pos, key);
  });





  /* -------------------------------------------------------------- */
  // create marker
  function createVehicleMarkers(pos) {
    const newMarker = new google.maps.Marker({
      position: pos,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: './resources/car_green.png',
      title: 'This is vehicle'
    });
    arrVehicle.push(newMarker);
  }

  function createUserMarkers(pos, key) {
    const content = `<div>
      <button type="button" class="btn btn-outline-danger" id="${key}">Call Driver</button></div>`;
    const info = new google.maps.InfoWindow({
      content,
      maxWidth: 100
    });
    const riderMarker = new google.maps.Marker({
      position: pos,
      map: map,
      animation: google.maps.Animation.BOUNCE,
      icon: './resources/man_green.png',
      title: 'Rider is waiting the diver'
    });

    // event click rider
    riderMarker.addListener('click', () => {
      riderMarker.setAnimation(null);
      
      if (curentWindow) {
        curentWindow.close();
      } // toggle infowindow
      curentWindow = info;
      info.open(map, riderMarker);
      
      // handle call driver
      $(`#${key}`).off('click');
      $(`#${key}`).on('click', e => {
          e.preventDefault();
          const positionUser = riderMarker.getPosition();
          const arrDistance = arrVehicle.map(e => {
            const positionCar = e.getPosition();
            const distance = google.maps.geometry.spherical.computeDistanceBetween(positionUser, positionCar);
            return {distance , vehicle: e};
          });
          // console.log(arrDistance);
          const minDistance = arrDistance.sort((a,b) => a.distance - b.distance)[0];
          calculateAndDisplayRoute(minDistance.vehicle , riderMarker);
          info.close();
      });
    });
    map.addListener('click', () => info.close());
  }


  // handle direction with driver to rider
  const directionsService = new google.maps.DirectionsService;
  const directionsDisplay = new google.maps.DirectionsRenderer;

  function calculateAndDisplayRoute(vehiclePosMarker , userPosMarker) {
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({suppressMarkers: true});
    directionsService.route({
      origin: vehiclePosMarker.getPosition(),
      destination: userPosMarker.getPosition(),
      travelMode: 'DRIVING'
    }, (resp, status) => {
      if (status !== 'OK') return swal("Fail","Directions request failed due to " + status,"error");
      directionsDisplay.setDirections(resp);
      // console.log(resp);
      const lengths = resp.routes[0].legs[0].steps[1].distance.text;
      const times = resp.routes[0].legs[0].steps[1].duration.text;
      const middle = resp.routes[0].legs[0].steps.length/2;
      const pos = resp.routes[0].legs[0].steps[1].end_location;
      const content = `<div class="show">
      <label id="lengths">${lengths}</label><br/><label>${times}</label></div>`;
      const info = new google.maps.InfoWindow({content});
      info.setPosition(pos);
      info.open(map);
      map.addListener('click', () => info.close());
    });
  } // end handle direction
  

});// end wrap function