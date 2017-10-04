var markers = [];
var markersOnMap = [];
var dealersl_LIs = [];
var map;
var ol_dealers = $('#dealers-l');

var windowWidth = $(window).width();



function attachEventsToListATags() {
  console.log('GOOOO attachEventsToListATags() ===============');
  var ol_dealers = $('#dealers-l');
  console.log(ol_dealers);
  ol_dealers.on("click", function(event) {
    event.preventDefault();
    // scroll to top and center map on marker
    var scrollToMap = function(m) {
      $('html, body').animate({
        scrollTop: $(".row.map-row").offset().top
      }, 700);
      google.maps.event.trigger(m, "click");
      map.setZoom(13);
      map.setCenter(m.getPosition());
      if (m.getAnimation() !== null) {
        m.setAnimation(null);
      } else {
        m.setAnimation(google.maps.Animation.BOUNCE);
      }
    };
    var a = $(event.target);
    var clickedDealer = a.find('h1').text();
    console.log('List Item CLicked ======= ' + clickedDealer);
    for (var i = 0; i < markers.length; i++) {
      var markerstitle = markers[i].title;
      var marker = markers[i];

      if (markerstitle === clickedDealer) {
        scrollToMap(marker);
      }


    }
    var newList = null;
    var newList = new Array();
    var bounds = map.getBounds();
    var list = $('#dealers-l a');
    console.log(list);

    for (var i = 0; i < list.length; i++) {
      if (bounds.contains(markers[i].position)) {
        console.log('Set Timeout callbackfuntion === ' + markers[i].title);
        console.log('index ======= ' + i);
        var li = dealersl_LIs[i];
        newList.push(li);
      }
    };
    ol_dealers.empty();
    ol_dealers.append(newList);

  });
};
var getIcons = function(code) {
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
var getWebsite = function(d) {
  var websiteLink;
  if (d.website == "") {
    d.website = 'N/A';
    websiteLink = d.website;
  } else {
    websiteLink = '<a target="_blank" href="http://' + d.website + '">' + d.website + '</a>';
  }
  return websiteLink;
};

var addMarkerAndListItem = function(dealer, map, getIcons) {

  var counter = 0;

  var icon = 'http://calspas.com/img/calspas-map-icon.png';
  var location = dealer.lat_lng;
  var bounds = map.getBounds();

  // ============ CRAETE MARKER ===========  variables for infoWindows that are attached to onClick event
  var marker = new google.maps.Marker({
    position: location,
    animation: google.maps.Animation.DROP,
    map: map,
    icon: icon,
    title: dealer.name,
    index: counter++
  });
  // ALL MARKERS CREATED
  markers.push(marker);

  // ============ CREATE INFOWINDOWS ===========
  var gmapsLink = 'https://maps.google.com?q=' + dealer.address + '+' + dealer.city + '+' + dealer.state + '+' + dealer.zip + '+' + dealer.country;
  var websiteLink = getWebsite(dealer);
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
  // ============ ATTACH INFOWINDOWS TO MARKERS && ADD CLICK EVENT ===========
  function toggleBounce(m) {
    if (m.getAnimation() !== null) {
      m.setAnimation(null);
    } else {
      m.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  var infoWindowForMap = new google.maps.InfoWindow();
  (function(marker, contentString) {
    google.maps.event.addListener(marker, 'click', function(e) {
      infoWindowForMap.setContent(contentString);
      infoWindowForMap.open(map, marker);
      map.setCenter(marker.getPosition());
      map.setZoom(13);
      toggleBounce(marker);
      redoList();
    });
  })(marker, contentString);

  // ============ CREATE LI for $('#dealers-l') ===========
  var dealerOrServicerLI = getIcons(dealer.code);

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
    '<p>' + dealerOrServicerLI + '</p>' +
    '</div>' +
    '</a>' +
    '<hr class="listHR">' +
    '</li>';
  // ALL DEALR LIs CREATED
  dealersl_LIs.push(listItem);
  ol_dealers.append(listItem);
};

var getDealers = function() {
  var calspasDealersJSON = "http://calspas.com/calspas-dealers.json";
  $.getJSON(calspasDealersJSON, function(data) {
    $.each(data, function(key, val, i) {
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
      if (dealer.code === 'M/D' || dealer.code === 'SVC') {
        addMarkerAndListItem(dealer, map, getIcons);
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
  var infoWindowerr = new google.maps.InfoWindow({
    map: map
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
      infoWindowerr.setPosition(geo_pos);
      infoWindowerr.setContent('You are here!');

    }, function() {
      console.log("HAS GEO 2222");

      var calspasPos = {
        lat: 34.051201,
        lng: -117.724880
      };
      map.setCenter(calspasPos);
      infoWindowerr.setPosition(calspasPos);
      var calspasInfo = '<div id="content">' +
        '<h1 id="firstHeading" class="firstHeading calspas-blue">Cal Spas</h1>' +
        '<p id="streetAdd" class="address lead">1462 9th St</p>' +
        '<p class="address">' + 'Pomona' + ', ' + 'CA' + ', ' + '91766' + '</p>' +
        '<p class="address">' + 'USA' + '</p>' +
        '<p class="googleMapsLink"><a target="_blank" href="https://goo.gl/maps/57z6JkJHtrQ2">Get Directions</a></p>' +
        '<p>Phone: <a href="tel:1-800-225-7727">1-800-CAL-SPAS (225-7727)</a></p>' +
        '<p>Email: <a target="_blank" href="http://calspas.com/contact-us.php">Contact Us</a></p>' +
        '<p>Website: http://calspas.com/ </p>' +
        '</div>';
      infoWindowerr.setContent(calspasInfo);
      handleLocationError(true, infoWindowerr, map.getCenter());

    });
  } else {
    // Browser doesn't support Geolocation
    console.log('NO GEO');
    var calspasPos = {
      lat: 34.051201,
      lng: -117.724880
    };
    map.setCenter(calspasPos);
    infoWindowerr.setPosition(calspasPos);
    var calspasInfo = '<div id="content">' +
      '<h1 id="firstHeading" class="firstHeading calspas-blue">Cal Spas</h1>' +
      '<p id="streetAdd" class="address lead">1462 9th St</p>' +
      '<p class="address">' + 'Pomona' + ', ' + 'CA' + ', ' + '91766' + '</p>' +
      '<p class="address">' + 'USA' + '</p>' +
      '<p class="googleMapsLink"><a target="_blank" href="https://goo.gl/maps/57z6JkJHtrQ2">Get Directions</a></p>' +
      '<p>Phone: <a href="tel:1-800-225-7727">1-800-CAL-SPAS (225-7727)</a></p>' +
      '<p>Email: <a target="_blank" href="http://calspas.com/contact-us.php">Contact Us</a></p>' +
      '<p>Website: http://calspas.com/ </p>' +
      '</div>';
    infoWindowerr.setContent(calspasInfo);
    handleLocationError(false, infoWindowerr, map.getCenter());
  }

  console.log('NOT SURE WHER THIS IS');
  getDealers();
  attachEventsToListATags();


}

// HANDLE ERRORS
function handleLocationError(browserHasGeolocation, win, pos) {
  // console.log(win);
  // var unitedStates = {
  //   lat: 39.776908,
  //   lng: -100.198784
  // };
  // win.setPosition(unitedStates);

  //this normally means geolocation is turned off in mobile - desktop devies
  var errorBrowserGeo_OFF = '<div id="content">' +
    '<h1 id="firstHeading" class="firstHeading calspas-blue">Cal Spas</h1>' +
    '<p id="streetAdd" class="address lead">1462 9th St</p>' +
    '<p class="address">' + 'Pomona' + ', ' + 'CA' + ', ' + '91766' + '</p>' +
    '<p class="address">' + 'USA' + '</p>' +
    '<p class="googleMapsLink"><a target="_blank" href="https://goo.gl/maps/57z6JkJHtrQ2">Get Directions</a></p>' +
    '<p>Phone: <a href="tel:1-800-225-7727">1-800-CAL-SPAS (225-7727)</a></p>' +
    '<p>Email: <a target="_blank" href="http://calspas.com/contact-us.php">Contact Us</a></p>' +
    '<p>Website: http://calspas.com/ </p>' +
    '</div>';
  //old browsers warming
  var oldBowers = '<h3 class="calspas-blue">Error:</h3>' +
    '<p>Your browser doesn\'t support geolocation.</p>' +
    '<p>Please use <a href="https://www.google.com/chrome/browser/desktop/" target="_blank">Chrome</a> for best website experience.</p>';
  win.setContent(browserHasGeolocation ? errorBrowserGeo_OFF : oldBowers);

}

initMap();
//autocomplete via geocomplete plugin
$("#location").geocomplete({
    map: map
  })
  .bind("geocode:result", function(event, result) {
    console.log("INPUT SUBMITTED ==============");
    attachEventsToListATags();
  });
$("#dealer-locator-submit").click(function() {
  console.log("FORM SUBMITTED ==============");
  $("#location").trigger("geocode");
  attachEventsToListATags();
});
