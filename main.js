// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
 

$(document).ready(function() {
    $(document).scroll(function() {
      var compensation = $(window).height() / 2;
      // calculate where the sections start
      var overview = ($('.overview').offset().top) - compensation;
      var pricing = ($('.pricing').offset().top) - compensation;
      var protection = ($('.protection').offset().top) - compensation;
      var accessories = ($('.accessories').offset().top) - compensation;
      var summary = ($('.summary').offset().top) - compensation;
      var scrollPos = $(document).scrollTop();

      
      // Apply text changes
      if (scrollPos >= overview && scrollPos < pricing) {
        $('.btn-text').text('Next: Pricing');
        document.getElementById('tab1').classList.add('primary-underline');
        document.getElementById('tab2').classList.remove('primary-underline');
        document.getElementById('tab3').classList.remove('primary-underline');
        document.getElementById('tab4').classList.remove('primary-underline');
        document.getElementById('tab5').classList.remove('primary-underline');
        /*setTimeout(function() {
            header.scrollLeft = 0;
         });*/
      }
      else if (scrollPos >= pricing && scrollPos < protection) {
        $('.btn-text').text('Next: Protection');  
        document.getElementById('tab2').classList.add('primary-underline');
        document.getElementById('tab1').classList.remove('primary-underline');
        document.getElementById('tab3').classList.remove('primary-underline');
        document.getElementById('tab4').classList.remove('primary-underline');
        document.getElementById('tab5').classList.remove('primary-underline');
      }
      else if (scrollPos >= protection && scrollPos < accessories) {
        $('.btn-text').text('Next: Accessories');  
        document.getElementById('tab3').classList.add('primary-underline');
        document.getElementById('tab1').classList.remove('primary-underline');
        document.getElementById('tab2').classList.remove('primary-underline');
        document.getElementById('tab4').classList.remove('primary-underline');
        document.getElementById('tab5').classList.remove('primary-underline');
      }
      else if (scrollPos >= accessories && scrollPos < summary) {
        $('.btn-text').text('Next: Summary');  
        document.getElementById('tab4').classList.add('primary-underline');
        document.getElementById('tab1').classList.remove('primary-underline');
        document.getElementById('tab2').classList.remove('primary-underline');
        document.getElementById('tab3').classList.remove('primary-underline');
        document.getElementById('tab5').classList.remove('primary-underline');
      }
      else if (scrollPos >= summary ) {
        $('.btn-text').text('Add to Cart');  
        document.getElementById('tab5').classList.add('primary-underline');
        document.getElementById('tab1').classList.remove('primary-underline');
        document.getElementById('tab2').classList.remove('primary-underline');
        document.getElementById('tab3').classList.remove('primary-underline');
        document.getElementById('tab4').classList.remove('primary-underline');
        /*header.scrollLeft = header.scrollWidth;*/
      }
      else {
      } 
    }); // close scroll function
  }); // close document ready


function CTA() {
    var btn = document.getElementById('btn1');

    if (btn1.innerHTML.indexOf("Next: Pricing") !== -1) {
        document.getElementById('btn1').href = "#pricing";
    } else if (btn1.innerHTML.indexOf("Next: Protection") !== -1) {
        document.getElementById('btn1').href = "#protection";
    } else if (btn1.innerHTML.indexOf("Next: Accessories") !== -1) {
        document.getElementById('btn1').href = "#accessories";
    } else if (btn1.innerHTML.indexOf("Next: Summary") !== -1) {
        document.getElementById('btn1').href = "#summary";
    }
}
