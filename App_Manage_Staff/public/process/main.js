$(function() {
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
  };
  const wattingRiders = [];
  const selectedRiders = [];
  // create map
  const map = new google.maps.Map(mapDiv, mapOptions);
  const socket = io();
  socket.on('SEND_LIST_USERS' , rider => {
    const {state } = rider;
    if(state) {
      createWaitingContent(rider);
      return 0;
    }
    createSelectedContent(rider);
  });

  function createWaitingContent(rider) {
    const {id , phone , address} = rider;
    const content = `
    <a id=${id} href="#" class="list-group-item list-group-item-action list-group-item-light">
      <img src="./resources/user_profile.png" alt="" />
      <div class="wrapper_profile">
          <h6>${phone}</h6>
          <p>${address}</p>
      </div>
    </a>`;
    $('#watting_contend').append(content);
    wattingRiders.push(rider);
  }

  function createSelectedContent(rider) {
    const {id , phone , address , driver} = rider;
    const {name} = driver;
    // console.log(driver.id);
    // remove watting rider
    const index = wattingRiders.findIndex(e => e.id == id);
    if(index >= 0) { // ton tai user o trang thai watting
      $(`#${id}`).remove();
      wattingRiders.splice(index , 1);
    }
    
    const content = `
    <div id="${driver.id}" class="list-group-item list-group-item-action list-group-item-warning">
      <img src="./resources/user_profile.png" alt="" />
      <div class="wrapper_profile">
        <h6>${phone}</h6>
        <p>${address}</p>
      </div>
      <div class="wrapper_profile_driver">
        <img src="./resources/taxi.png" alt="" />
        <h6>${name}</h6>
      </div>
      <div class="action-btns d-flex flex-row-reverse">
        <button id="${driver.id}111" type="button" class="btn btn-outline-danger btn-sm" id="show_direction">Show Direction</button>
        <button id="${driver.id}222" type="button" class="btn btn-outline-success btn-sm">Drop down user</button>
      </div>
    </div>`;
    $('#watting_selected').append(content);
    selectedRiders.push(rider);

    $(`#${driver.id}111`).off('click');
    $(`#${driver.id}222`).off('click');

    $(`#${driver.id}111`).on('click', e => {
      e.preventDefault();
      // show direction on map
      
    });

    $(`#${driver.id}222`).on('click', e => {
      e.preventDefault();
      // update cars and save history
      
    });
    console.log('241');
  }
  
  // console.log(wattingRiders);
  // console.log(selectedRiders);
  
});