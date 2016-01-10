<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Delivery;

class DeliveryTableSeeder extends Seeder {

public function run()
{
		DB::table('deliveries')->delete();

Delivery::create([
'name' => 'доставка курьером по адресу',
'pseudo_name' => 'courier'
]);
	
Delivery::create([
'name' => 'самовывоз',
'pseudo_name' => 'pickup'
]);


}

}