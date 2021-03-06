// SP AMEND: ANIMATION SETTINGS 
// 
// UPDATE Set the speed depending on screen width
var initSpeed = '50';
var speed = ($('#par').height()/2500) * initSpeed;

//  Change the minimum width of screesize
function setSpeed(){
		var speed = ($('#par').height()/1000) * initSpeed ;
}
// UPDATE This will change the speed if the size of the window is changed 
$(window).on('resize', function() {
	setSpeed();
});

var introText = new TimelineMax({
	// Pauses intil the page is loaded
	paused: true,
	// Makes animation run smoother
	force3D: true,
	// Number of times the animation repeats (-1 - forever)
	repeat: -1,
	yoyo: false,

});


// The timeline
// NOTE: Change the speed by changing the number after '#par' (seconds)
introText.fromTo('#par', speed, {
	// Starting position in percent
	// 5% from top
	yPercent: 0,
}, {
	// End position in percent
	yPercent: -50,
	ease: Power0.easeNone,
});
// Play the animation on load
window.onload = function () {
	introText.play();
}
// Pause on hover 
$('#par').mouseenter(function () {
	introText.pause();
});
$('#par').mouseleave(function () {
	introText.play();
});



// OLD CODE
//$(document).ready(function () {
	// var top=0;
	// var inc=1;
	// var par = document.getElementById('par')
	// $('#par').hover(function(){inc = 0},function(){inc = 1});
	// var scroll = function() {
	//     top+=inc;
	// 	if( top>=par.firstElementChild.offsetHeight )
	// 	{
	// 	//first element is out of sight, so move to the end of the list
	// 		top=0;
	// 		par.firstElementChild.style.marginTop='';//reset to -
	// 		par.appendChild(par.firstElementChild);
	// 	}
	// 	else
	// 	{
	// 		par.firstElementChild.style.marginTop='-'+top+'px';
	// 	}
	// 	setTimeout(scroll, 25)
	// }
	// scroll();
//	});