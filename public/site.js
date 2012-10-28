/**
* site.js
* javascript for site management
**/

$(document).ready(function(){

	//bind access form functions
	$('#access_form').bind('submit',function(evt){
		alert('Submitting '+$('#access_mode').val() );
		return false;
	});

});

function show_register()
{
	if( ('#access_form').css('display')=='block' &&
		'register' == $('#access_mode').val() )
	{
		return;
	}

	$('#access_mode').val('register');
	$('#access_box_email').css('display','block');
	$('#access_box > h4').html('Create a User');
	$('#access_submit').val('Register Account');

	if( ('#access_form').css('display')=='none' )
	{
		$('#access_form').slideDown();
	}
}

function show_login()
{
	if( ('#access_form').css('display')=='block' &&
		'login' == $('#access_mode').val() )
	{
		return;
	}

	$('#access_mode').val('login');
	$('#access_box_email').css('display','none');
	$('#access_box > h4').html('Enter Login Details');
	$('#access_submit').val('Login');

	if( ('#access_form').css('display')=='none' )
	{
		$('#access_form').slideDown();
	}
}

function hide_access()
{
	$('#access_form').slideUp();
}