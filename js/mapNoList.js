  var windowWidth = $(window).width();

  // google maps gloabls
  var markers = [];
  var dealers = [];
  var map;
    var ol_dealers = $('#dealers-l');

  ////////////////////////////////////
  function getIcons(code) {
    var dealerIcon = '<span style="vertical-align: middle;" class="map-icons"><img class="img-responsive" src="img/Cal-Spas-Dealer.png" alt="" /></span>';
    var serviceIcon = '<span style="vertical-align: middle;" class="map-icons"><img class="img-responsive" src="img/Cal-Spas-Servic-Center.png" alt=""/></span>';
    var icons = '';
    // dealer and Service avaiable
    if (code == 'M/D') {
      icons = dealerIcon + ' ' + serviceIcon;
    }
    // service only
    if (code == 'SVC') {
      icons = serviceIcon;
    }
    return icons;
  };
  //////////////////////////////////////



  function addListItems(dealer, getIcons) {
    var dealerOrServicer = getIcons(dealer.code);
    var listItem = '<li class="dealer-li">' +
      '<a class="dealers-listItems" data-latLong="' + dealer.lat_lng.lat + ', ' + dealer.lat_lng.lng + '" href="#">' +
      '<div>' +
      '<h1 id="firstHeading" class="firstHeading calspas-blue">' + dealer.name + '</h1>' +
      '<p id="streetAdd" class="address lead">' + dealer.address + '</p>' +
      '<p class="address">' + dealer.city + ', ' + dealer.state + ', ' + dealer.zip + '</p>' +
      '<p class="address">' + dealer.country + '</p>' +
      '<p>Phone: ' + dealer.phone + '</p>' +
      '<p>Email: ' + dealer.email + '</p>' +
      '<p>Website: ' + dealer.website + '</p>' +
      '<p>' + dealerOrServicer + '</p>' +
      '</div>' +
      '</a>' +
      '<hr class="listHR">' +
      '</li>';
  };

  var addMarker = function(dealer, map, getIcons) {
    // dealers-icon (water drop)
    var icon = 'http://calspas.com/img/calspas-map-icon.png';
    var location = dealer.lat_lng;
    var bounds = map.getBounds();
    var marker = new google.maps.Marker({
      position: location,
      animation: google.maps.Animation.DROP,
      map: map,
      icon: icon,
      title: dealer.name,
    });
    markers.push(marker);

    var gmapsLink = 'https://maps.google.com?q=' + dealer.address + '+' + dealer.city + '+' + dealer.state + '+' + dealer.zip + '+' + dealer.country;
    var websiteLink;
    // dealer has no website
    if (dealer.website == "") {
      dealer.website = 'N/A';
      websiteLink = dealer.website;
    } else {
      websiteLink = '<a target="_blank" href="http://' + dealer.website + '">' + dealer.website + '</a>';
    }
    var dealerOrServicer = getIcons(dealer.code);
    var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading calspas-blue">' + dealer.name + '</h1>' +
      '<p id="streetAdd" class="address lead">' + dealer.address + '</p>' +
      '<p class="address">' + dealer.city + ', ' + dealer.state + ', ' + dealer.zip + '</p>' +
      '<p class="address">' + dealer.country + '</p>' +
      '<p class="googleMapsLink"><a target="_blank" href="' + gmapsLink + '">Get Directions</a></p>' +
      '<div id="">' +
      '<p>Phone: <a href="tel:' + dealer.phone + '">' + dealer.phone + '</a></p>' +
      '<p>Email: <a target="_blank" href="mailto:' + dealer.email + '">' + dealer.email + '</a></p>' +
      '<p>Website: ' + websiteLink + '</p>' +
      '<p>' + dealerOrServicer + '</p>' +
      '</div>' +
      '</div>';

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
    // Create infoWindows
    var infoWindow = new google.maps.InfoWindow();
    (function(marker, contentString, event) {
      google.maps.event.addListener(marker, 'click', function() {

        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
        map.setCenter(marker.getPosition());
        toggleBounce(marker);
      });
    })(marker, contentString);
  };

  function getDealers() {
    var calspasDealersJSON = "http://calspas.com/calspas-dealers.json";
    $.getJSON(calspasDealersJSON, function(data) {
      $.each(data, function(key, val) {
        var dealer = {
          calflame: val.calflame,
          calspas: val.calspas,
          name: val.name,
          code: val.code,
          logo: val.logo,
          address: val.address,
          city: val.city,
          state: val.state,
          zip: val.zip,
          country: val.country,
          phone: val.phone,
          email: val.email,
          website: val.website,
          lat_lng: {
            lat: parseFloat(val.latitude),
            lng: parseFloat(val.longitude)
          },
          status: val.status
        };
        if (dealer.code == 'M/D' || dealer.code == 'SVC') {
          addMarker(dealer, map, getIcons);
          addListItems(dealer, getIcons);
        }
      });
    });
  };

  function findWidth(w) {
    if (w < 400) {
      return map.zoom = 2;
    } else if (w > 399 || w < 800) {
      return map.zoom = 5;
    } else {
      map.zoom = 13;
    }
  }

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 39.776908,
        lng: -100.198784
      },
      zoom: 13
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      console.log("HAS GEO");
      navigator.geolocation.getCurrentPosition(function(position) {
        var geo_pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(geo_pos);
        var geo_marker = new google.maps.Marker({
          position: geo_pos,
          title: "Your are here!",
          map: map,
          icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569'
        });
      }, function() {
        ol_dealers.empty();
        handleLocationError(true, infowindowerr, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      console.log('NO GEO');
      ol_dealers.empty();
      handleLocationError(false, infowindowerr, map.getCenter());
    }
    getDealers();


  }

  // HANDLE ERRORS /////////////////////////////////////////////////////////////////////////////////////////////
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    var unitedStates = {
      lat: 39.776908,
      lng: -100.198784
    };
    infoWindow.setPosition(unitedStates);
    //this normally means geolocation is turned off in mobile - desktop devies
    var errorBrowserGeo_OFF = '<h3 class="calspas-blue">Error:</h3>' +
      '<p>Please allow browser to locate your position or use search bar above</p>';
    //old browsers warming
    var oldBowers = '<h3 class="calspas-blue">Error:</h3>' +
      '<p>Your browser doesn\'t support geolocation.</p>' +
      '<p>Please use <a href="https://www.google.com/chrome/browser/desktop/" target="_blank">Chrome</a> for best website experience.</p>';
    infoWindow.setContent(browserHasGeolocation ? errorBrowserGeo_OFF : oldBowers);

  }

  initMap();
  // adds event to all links in list below map.
  // functionality = scrolls up to map and center map to location selected in list then open info window.
  $(window).load(function() {

  });
  /////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // autocomplete via geocomplete plugin ////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $("#location").geocomplete({
      map: map
    })
    .bind("geocode:result", function(event, result) {
      console.log(event);
      console.log(result);


    });
  $("#dealer-locator-submit").click(function() {
    console.log("form submitted");
    $("#location").trigger("geocode");
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
