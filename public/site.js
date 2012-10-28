images/go-up.png    P���    P���              ��          xːy6�g�7��S81�� public/editor/images/image.png    P���    P���              ��          R�e�Bzd<O����\
�r public/editor/images/image.svg    P���    P���              ��          ���`{+5��I�d+�kF��� public/editor/images/italic.png   P���    P���              ��          �H3��z#��}>�Wo�)��K�P public/editor/images/italic.svg   P���    P���              ��          .91������m3㻔A public/editor/images/line.png     P���    P���              ��          �Qj	K>tϖ$�ə��:��R &public/editor/images/link_controls.png    P���    P���              ��          ���q7J B�-���H�h��� public/editor/images/logo.png     P���    P���              ��           �gV���ں��֏��s� $public/editor/images/map-opacity.png      P���    P���              ��           ]��Ut\��-Ϧ����(��=9� !public/editor/images/mappoint.gif P���    P���              ��           �Ц�΢ګm0X���/�̓�� #public/editor/images/mappoint_c.png       P���    P���              ��           �V?�|.D���o���' #public/editor/images/mappoint_f.png       P���    P���              ��          �k%VԞ�g	�8�Ws���׌ $public/editor/images/move_bottom.png      P���    P���              ��          ��T����C�%���w����\ !public/editor/images/move_top.png P���    P���              ��          ;!��s������c�&��_� #public/editor/images/node_clone.png       P���    P���              ��          M�?~hv.�gX��c�d $public/editor/images/node_delete.png      P���    P���              ��           ��v_c�_��D�*��� public/editor/images/none.png     P���    P���              ��          �%Jk�H�m=���O��UL�A public/editor/images/open.png     P���    P���              ��          ���1UŨHw5:D�l��І�k public/editor/images/paste.png    P���    P���              ��          Y@�X�o/��VH/�E�4S� public/editor/images/path.png     P���    P���              ��          uEJ�l�U!�d@h����f�T public/editor/images/path.svg     P���    P���              ��          �x������Y �duX��'� public/editor/images/pencil.png   P���    P���              ��          �*v�A�[l�L`=����3� public/editor/images/pencil.svg   P���    P���              ��          >�����Ѐ^�R�!���$;b� &public/editor/images/pencil_cursor.png    P���    P���              ��           �7M�B�/��>�1H��_��� public/editor/images/picker.gif   P���    P���              ��          !���bP�tv>�K�`�����| $public/editor/images/placeholder.svg      P���    P���              ��          �U
Ҟ<�vc���[����}�  public/editor/images/polygon.png  P���    P���              ��          �>K�z�uhs]�↪u�'�)�  public/editor/images/polygon.svg  P���    P���              ��           �٢��Ҩ�?R�|��rj]�� (public/editor/images/preview-opacity.png  P���    P���              ��           L��G-�%R��=��x�'�� $public/editor/images/rangearrows.gif      P���    P���              ��           ��7����o�*ڑP��|� %public/editor/images/rangearrows2.gif     P���    P���              ��          �O�_�|!lm\T-6�j�A7M public/editor/images/rect.png     P���    P���              ��          �i�;Evz��[��W�`��E public/editor/images/redo.png     P���    P���              ��          ԔU�,�ns�:i����Z�V� !public/editor/images/reorient.png P���    P���              ��          ܯ��o��|,�h��;�U�t public/editor/images/rotate.png   P���    P���              ��          ��L���~o�0��p��^�� public/editor/images/save.png     P���    P���              ��          X���5/�Ot)(W`�OǼ��B public/editor/images/select.png   P���    P���              ��          |�C�9��Y)I5	�� public/editor/images/select.svg   P���    P���              ��          <^�}�Z�l�S� IVІ�v
" $public/editor/images/select_node.png      P���    P���              ��           ]k�'w�����p�,������ public/editor/images/sep.png      P���    P���              ��          )�/��]ɩ.���yY]aQ>e� $public/editor/images/shape_group.png      P���    P���              ��          �:o6�PH�+��%���)�."3 &public/editor/images/shape_ungroup.png    P���    P���        /**
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
var work_id = undefined;
var work = undefined;
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
	setCookie('userdat','',1);
	var cookie = getCookie('userdat');
	console.log(cookie);
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
		      