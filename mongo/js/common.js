$(document).ready(function () {
	$('#toggle').click(function(){
		$(this).toggleClass('on');
		$('.top-menu').slideToggle();
		return false;
	})
})
