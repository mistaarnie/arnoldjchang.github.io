// 1, Title of website with space+stars background
// 2, Scroll down which fades to creation of Light & Day
   // 2.1, Creation of the Sun
   // 2.2, Creation of Earth
//(Make flat earth)
// 3, Show the sun rising on earth
//http://codepen.io/mkmueller/pen/oblrD
//http://codepen.io/tcmulder/pen/mKhJi

// 4, Creation of plants
// 5, Creation of living things
   // 5.1, Animals
   // 5.2, Humans

// 6, Adam & Eve
   // 6.1, Eve being tempted by Satan
   // 6.2, Adam & Eve eating from the tree
   // 6.3, God separating humans (We are born into sin, as sinners)

// 7, After a while, humans continued to sin, so God sent down Jesus
   // 7.1, Birth of Jesus
   // 7.2, Mary was a virgin

// 8, As Jesus became older, he began preaching the truth, got his disciples.

// 9, Performed Miracles
   // 9.1, Multiplied the food and fed the hungry
   // 9.2, Cast out demons
   // 9.3, Healed the sick / Raised Lazarus from the dead

// 10, Jesus was persecuted 

// 11, Jesus was put on trial

// 12, Jesus was crucified
   // 12.1, Jesus died for our sins so that we can be able to get into heaven
   // 12.2, God sent his son to die for us because he loves us

// 13, We can have eternal life now because of Jesus

// 14, Call to Action - Are you interested? 



(function($) {
  
  var wh = window.innerHeight,
      $header = $('.header'),
      $innerS1 = $('.innerS1');
      
  // init 
  var ctrl = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: 'onLeave'
      }
  });
  
  $('section').each(function() {
    
    new ScrollMagic.Scene({
      triggerElement: this,
      duraton: '50%'
    })
    .setPin(this)
    .addTo(ctrl);
  })
  
})(jQuery);















