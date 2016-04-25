$(document).ready(function() {
  
  
  /**********************************************
  MENU TOGGLE
  **********************************************/
  $(".menu").click(function() {
    $(this).toggleClass('open');
    $('.main-container').toggleClass('faded');
  });
  
  $('.menu').click(function() {
    $('.menu-container').toggleClass('appear');
  });
  
  /**********************************************
  ADJUST MENU SIZE ON SCROLL
  **********************************************/  
  $(function() {
    $('.header-container').data('size','big');
  });

$(window).scroll(function(){  
    if($(document).scrollTop() > 0)
    {
        if($('.header-container').data('size') == 'big')
        {
          $('.header-container').data('size','small');
          $('.header-container').stop().animate({
              height:'60px'},300);
          $('.logo').stop().animate({width: '30px'},300);
          $('.logo').css('margin-top', '-4px');
          $('.logo-text').css('margin-top', '10px');
          $('.logo-text').css('margin-left', '38px');
          $('.logo-text-2').css('visibility', 'hidden');
          $('.menu').css('margin-top', '5px');
          $('.social').css('margin-top', '-10px');
          
        }
    }
    else
    {
        if($('.header-container').data('size') == 'small')
        {
          $('.header-container').data('size','big');
          $('.header-container').stop().animate({
              height:'80px'},300);
          $('.logo').stop().animate({width: '35px'},300);
          $('.logo').css('margin-top', '1px');
          $('.logo-text').css('margin-top', '10px');
          $('.logo-text').css('margin-left', '45px');
          $('.logo-text-2').css('visibility', 'visible');
          $('.menu').css('margin-top', '10px');
          $('.social').css('margin-top', '0px');
        }  
    }
});
  
  
  
  
  
  /**********************************************
  HOVER OVER MAIN HEADER TO SHOW CHEVRON 
  **********************************************/
  $('.main-header').hover(function(){
        $('.back').fadeIn(300)
        $('.forward').fadeIn(300)
    },function(){
        $('.back').fadeOut(300)
        $('.forward').fadeOut(300)
  })
  
  

  
  
  
});

