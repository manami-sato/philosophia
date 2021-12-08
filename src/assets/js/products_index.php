<?php

  // クロスオリジンを許可する
  header( "Access-Control-Allow-Origin:*" );
  // ヘッダーにコンテンツの種類を設定する
  header( "Content-Type:application/json" );

$mainImgs = [
	"https://live.staticflickr.com/65535/51278435661_86c4160ce6_k.jpg",
  "https://live.staticflickr.com/65535/51279155949_7015a64dbc_k.jpg",
	"https://live.staticflickr.com/65535/51278603653_d7c6f20b90_k.jpg",
	"https://live.staticflickr.com/65535/51304363183_a8e07d4d3c_k.jpg"
];

print json_encode($mainImgs);