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
		dieJSON('success');
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


}
dieJSON('Action not recognized');





function dieJSON( $msg )
{
	print json_encode( $msg );
	exit;
}
