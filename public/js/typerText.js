//Plugin Start!
//OPTIONS YOU SAY! WHO CARES ABOUT THOSE!
(function($){
  var div, text;
  $.fn.typertext = function() {
    text = this.text();
    console.log(text);
    this.html("");
    $('<span class="typeTextContent"></span>').appendTo(this);
    this.show();
    div = $(this).find('.typeTextContent');
    type(0);
  };

  function type(i)
  {
    setTimeout(function(){
      if(!(text.charAt(i) == '/' && text.charAt(i + 1) == 's' && text.charAt(i + 2) == '/'))
          div.html(div.html() + text.charAt(i));
      else {
          i += 3;
          div.html(div.html() + '<br/>').delay(700);
        }
      i++;
      if(i < text.length) type(i);
      else $('.afterText').css("animation", "blinky 1s linear infinite");
    }, (Math.floor(Math.random()*30) + 20));
  }
})(jQuery)

//Testing Area -- *in archer voice* "DANGER ZZZZZZZONE"
$( document ).ready(function() {
    $('.content').typertext();
  });
// A plugin by Dmitry Pustovit
