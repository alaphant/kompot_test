<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Pay_method;

class PayMethodsTableSeeder extends Seeder {

public function run()
{
		DB::table('pay_methods')->delete();

Pay_method::create([
'name' => 'оплата наличными курьеру',
'pseudo_name' => 'courier'
]);
	
Pay_method::create([
'name' => 'оплата online',
'pseudo_name' => 'pickup'
]);


}

}