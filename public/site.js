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

var user = undefined;
var status = {
	is_registering: false,
	is_logging: false
};

function show_register()
{
	if( $('#access_box').css('display')=='block' &&
		'register' == $('#access_mode').val() )
	{
		console.log("Register already showing");
		return;
	}

	$('#access_mode').val('register');
	$('#access_box_email').css('display','block');
	$('#access_box > h4').html('Create a User');
	$('#access_submit').val('Register Account');

	$('#access_form').bind('submit',function(evt){
		if(status.is_registering) return;
		status.is_registering = true;
		var url = 'http://visualizame.net/ajaxy/mongo.php';
		$.ajax({
		    url : url,
		    data : { 
		    	'action' : 'register',
		    	'access_user': $('#access_user').val(),
		    	'access_password': $('#access_password').val(),
		    	'access_email': $('#access_email').val()
		    	},
		    dataType: 'json',
		    success: function(obj,status){
		      alert("User account created");
		      user = obj;
		      console.log(obj);
		      status.is_registering = false;
		    },
		    error: function(jq,err,msg){
		      alert("Cannot register "+err+" "+msg);
		      status.is_registering = false;
		    }
  		});
	});

	if( $('#access_box').css('display')=='none' )
	{
		show_access();
	}
}

function show_login()
{
	if( $('#access_box').css('display')=='block' &&
		'login' == $('#access_mode').val() )
	{
		return;
	}

	$('#access_mode').val('login');
	$('#access_box_email').css('display','none');
	$('#access_box > h4').html('Enter Login Details');
	$('#access_submit').val('Login');

	$('#access_form').bind('submit',function(evt){
		if(status.is_logging) return;
		status.is_logging = true;
		var url = 'http://visualizame.net/ajaxy/mongo.php';
		$.ajax({
		    url : url,
		    data : { 
		    	'action' : 'login',
		    	'access_user': $('#access_user').val(),
		    	'access_password': $('#access_password').val(),
		    	},
		    dataType: 'json',
		    success: function(obj,status){
		      alert("User logged in");
		      user = obj;
		      console.log(obj);
		      status.is_logging = false;
		    },
		    error: function(jq,err,msg){
		      alert("Cannot Login "+err+" "+msg);
		      status.is_logging = false;
		    }
  		});
	});

	if( $('#access_box').css('display')=='none' )
	{
		show_access();
	}
}

function show_access()
{
	console.log("Show access");
	$('#access_box').css('height','0px');
	$('#access_box').css('display','block');
	$('#access_box').animate({
		'height' : '230px'
	},1000);
}

function hide_access()
{
	//$('#access_box').slideUp();
	$('#access_box').animate({
		'height' : '0px'
	},1000,function(){
		$('#access_box').css('display','none');
	});
}