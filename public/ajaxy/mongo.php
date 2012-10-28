<?php
/* MongoDB AJAX Interface */

if(!isset($_REQUEST['action'])) dieJSON('Invalid post request');

$m = new Mongo();
$db = $m->visualize;
if(!$m) dieJSON('Unable to connect to MongoDB');

switch( $_REQUEST['action'] )
{
	case 'create_collection':
		if( !isset($_REQUEST['name'])) dieJSON('Must specify name of collection');
		$name = preg_replace('/\W/','',$_REQUEST['name']);
		if(strlen($name)<3) dieJSON('name must be at least 3 letters long');
		$log = $db->createCollection($name);
		if($log) dieJSON('success');
		dieJSON('Unable to create db');
		break;
	case 'insert':
		if( !isset($_REQUEST['collection'])) dieJSON('Must specify name of collection');
		if( !isset($_REQUEST['object'])) dieJSON('Must specify object to insert');
		$col = preg_replace('/\W/','',$_REQUEST['collection']);
		if(strlen($col)<3) dieJSON('Collection name must be at least 3 letters long');
		$obj = json_decode(stripslashes($_REQUEST['object']),true);
		#print $_REQUEST['object']."\n"; print_r($obj); exit;
		if(!$obj) dieJSON('Object data was not valid json');
		$collection = $db->$col;
		if(!$collection) dieJSON('Unable to select collection '.$col);
		$collection->insert($obj);
		dieJSON($obj['_id']);
		break;
	case 'get':
		if( !isset($_REQUEST['collection'])) dieJSON('Must specify name of collection');
		$col = preg_replace('/\W/','',$_REQUEST['collection']);
		if(strlen($col)<3) dieJSON('Collection name must be at least 3 letters long');
		$collection = $db->$col;
		if(!$collection) dieJSON('Unable to select collection '.$col);

		//use search query or find all
		if(isset($_REQUEST['query'])){
			$query = json_decode(stripslashes($_REQUEST['query']),true);
			if(!$query) dieJSON('Query is invalid json');
			$cursor = $collection->find($query);
		}
		else {
			$cursor = $collection->find();
		}
		$data = array();
		foreach ($cursor as $obj) {
    		array_push($data, $obj);
		}
		dieJSON($data);
		break;

	case 'login':
		$col = $db->users;
		if( !isset($_REQUEST['access_user'])) dieJSON('Must specify user');
		if( !isset($_REQUEST['access_password'])) dieJSON('Must include password');
		$usr = stripslashes($_REQUEST['access_user']);
		$pwd = stripslashes($_REQUEST['access_password']);
		$usrdata = $col->findOne( array('user'=>$usr, 'pass'=>$pwd));
		if(!$usrdata) dieJSON(array('status'=>'error','msg'=>'User not found'));
		$usrkey = rand_string(10);
		$usrdata['key'] = $usrkey ;
		$col->update(array('user'=>$usr,'pass'=>$pwd),$usrdata);
		dieJSON(array('status'=>'success','user'=>$usrdata));
		break;

	case 'register':
		$col = $db->users;
		if( !isset($_REQUEST['access_user'])) dieJSON('Must specify user');
		if( !isset($_REQUEST['access_password'])) dieJSON('Must include password');
		if( !isset($_REQUEST['access_email'])) dieJSON('Must include email address');
		$usr = stripslashes($_REQUEST['access_user']);
		$pwd = stripslashes($_REQUEST['access_password']);
		$email = stripslashes($_REQUEST['access_email']);
		$key = rand_string(10);
		$usrdata = array('user'=>$usr,'pass'=>$pwd,'key'=>$key,'email'=>$email);
		$col->insert($usrdata);
		dieJSON(array('status'=>'success','user'=>$usrdata);
		break;


}
dieJSON('Action not recognized');





function dieJSON( $msg )
{
	print json_encode( $msg );
	exit;
}


function rand_string( $length ) {
	$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";	

	$size = strlen( $chars );
	for( $i = 0; $i < $length; $i++ ) {
		$str .= $chars[ rand( 0, $size - 1 ) ];
	}

	return $str;
}