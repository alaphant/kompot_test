<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function(){
   return redirect('index.html');
});

Route::get('home', 'HomeController@index');

Route::get('shop', 'ShopController@index');
Route::get('shop.html', 'ShopController@index');

Route::post('send_order', 'ShopController@order');

Route::get('admin', ['middleware' => 'auth', 'uses' => 'HomeController@admin']);

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
