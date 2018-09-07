$(document).ready(function(){
		var top=0;
        var inc=1;
        var par = document.getElementById('par')
        $('#par').hover(function(){inc = 0},function(){inc = 1});
		var scroll = function() {
            top+=inc;
            

			if( top>=par.firstElementChild.offsetHeight )
			{
			//first element is out of sight, so move to the end of the list
				top=0;
				par.firstElementChild.style.marginTop='';//reset to -
				par.appendChild(par.firstElementChild);
			}
			else
			{
				par.firstElementChild.style.marginTop='-'+top+'px';
			}
			setTimeout(scroll, 25)
		}
		scroll();
        });