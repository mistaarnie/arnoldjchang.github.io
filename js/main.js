$(function() {

  /// hover over animations for series links  index.php

  function getSeriesLinks() {

    var $links = $('li.series-overviews-links a');

    for (var i = 0; i < $links.length; i++) {

      $links[i].addEventListener("mouseenter", function(event) {

        event.preventDefault();

        var $h3 = $(this).find('div.panel.calspa-panel.series-panels > h3');

        $h3.animate({

          "width": "100%"

        }, "fast");

      });

      $links[i].addEventListener("mouseleave", function(event) {

        event.preventDefault();

        var $h3 = $(this).find('div.panel.calspa-panel.series-panels > h3');

        $h3.animate({

          "width": "80%"

        }, "fast");

      });

    }

  };

  getSeriesLinks();

  /// END hover over animations for series links index.php

  $('ul.nav li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
  }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
  });

  $('.shop-spas-dropdown').hover(function() {
    $(this).attr('class', 'shop-spas-dropdown open').stop(true, true).delay(200).find('.dropdown-menu').animate({
      opacity: 1
    });
  }, function() {

    $multiLevel = $('ul.dropdown-menu.multi-level.view-all');
    $(this).attr('class', 'shop-spas-dropdown').stop(true, true).delay(200).find('.dropdown-menu').animate({
      opacity: 0
    });






  });


  $(".btn-link")
    .bind("touchstart", function() {
      $(this).addClass("fake-active");
    })
    .bind("touchend", function() {
      $(this).removeClass("fake-active");
    }).bind("touchcancel",
      function() {
        var $this = $(this);
        $this.removeClass("fake-active");
      });;



  //navigation

  //cache window
  var windowWidth = $(window).width();

  //cache main nav Links
  var $mainNavLinks = $('a.dropdown-toggle.use-book.main-link');

  var mainNaviCheck = function(width, navlinks) {
    if (width > 1000) {
      for (var i = 0; i < navlinks.length; i++) {
        navlinks[i].addEventListener("click", function(event) {
          event.preventDefault();
          var loc = $(this).attr('href');
          window.location.href = loc;
        });
      }
    }
  };
  mainNaviCheck(windowWidth, $mainNavLinks);

  $(window).bind('resize', function() {
    mainNaviCheck(windowWidth, $mainNavLinks);
  });



  var buttons = $('.btn.btn-lg.btn-primary.btn-panel.inverse-btn');
  var socialLinks = $('a.btn.btn-link.series-links.footer-a');
  // console.log(infoLinks);
  buttons.bind("mouseover", function() {
      $(this).find('i.fa').css('color', '#009DDC');
    })
    .bind("mouseleave", function() {
      $(this).find('i.fa').css('color', '#fff');
    });

  socialLinks.bind("mouseover", function() {
      $(this).find('i.fa').css('color', '#009DDC');
        $(this).css('background', '#fff');
        $(this).css('border', '1px solid #0B90C5');
    })
    .bind("mouseleave", function() {
      $(this).find('i.fa').css('color', '#fff');
        $(this).css('background', '#009DDC');
        $(this).css('border', '1px solid #fff');
    });


});


$(document).ready(function() {
  
  $('.mainMenu ul li a').on('click', function(e) {
    e.preventDefault();
    $('.collapse').collapse('hide');
      
  });
  
});






























