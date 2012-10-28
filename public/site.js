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

	var usercookie = getCookie('userdat');
	var userdat = false;
	try {
		userdat = JSON.parse(usercookie);
	}
	catch (err) {
		console.log("Couldn't read cookie"); console.log(usercookie);
		userdat = false;
	}
	if(userdat && userdat.user )
	{
		console.log("User! "); console.log(usercookie);
		console.log(userdat);
		user = userdat;
		on_login();
		
	}
	else {
		console.log("No usercookie");
	}

});

var user = undefined;
var status = {
	is_registering: false,
	is_logging: false
};

function on_login(){
	var html = "Logged in as "+user.user+" ";
	html += "<br><span style='margin-left: 10px; font-size:0.8em;'><a style='text-decoration: none;' href='javascript:sign_out();'>sign out</a></span>";
	$('#access_logged').html(html);
	$('#access').css('display','none');
	$('#access_logged').css('display','block');
	if($('#user_save').length>0)
		{
			$('#user_save').css('display','block');
		}
}

function sign_out(){
	console.log("Sign out");
	setCookie('userdat','',0);
	user = undefined;
	$('#access_logged').css('display','none');
	$('#access').css('display','block');
	if($('#user_save').length>0)
		{
			$('#user_save').css('display','none');
		}
}

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
		      if(!obj || !obj.status || !obj.user || obj.status != 'success')
		      {
		      	if(obj.msg){ alert(msg); }
		      	else{ alert("Unable to register"); }
		      	return;
		      }
		      user = obj.user;
		      if(user.pass) user.pass = undefined;
		      setCookie('userdat',JSON.stringify(user),1);
		      console.log(obj);
		      status.is_registering = false;
		      alert("Account registered");
		      hide_access();
		      on_login();
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
		      if(!obj || !obj.status || obj.status != 'success' || !obj.user)
		      {
		      	if(obj.msg){ alert(obj.msg); }
		      	else { alert("Unable to login"); }
		      	return;
		      }
		      user = obj.user;
		      if(user.pass) user.pass = undefined;
		      setCookie('userdat',JSON.stringify(user),1);
		      console.log(obj);
		      status.is_logging = false;
		      hide_access();
		      on_login();
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

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}


//save editor pages for user
function save_work()
{
	console.log("Save Work");
}