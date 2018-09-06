var go = function(){
		var top=0;
		var par = document.getElementById('par')
		var scroll = function() {
 
            top++;
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
        }
        

go()