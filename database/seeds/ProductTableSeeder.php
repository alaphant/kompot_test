<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Product;

class ProductTableSeeder extends Seeder {

	public function run()
	{
			DB::table('products')->delete();

 Product::create([
 'name' => 'вишня',
 'pseudo_name'=>'cherry_small',
 'cost' => 80,
 'liter' => 1
 ]);

 Product::create([
 'name' => 'груша',
  'pseudo_name'=>'pear_small',
 'cost' => 80,
 'liter' => 1
 ]);

 Product::create([
 'name' => 'клубника',
  'pseudo_name'=>'strawberry_small',
 'cost' => 80,
 'liter' => 1
 ]);


  Product::create([
 'name' => 'вишня',
  'pseudo_name'=>'cherry_big',
 'cost' => 150,
 'liter' => 3
 ]);

 Product::create([
 'name' => 'груша',
  'pseudo_name'=>'pear_big',
 'cost' => 150,
 'liter' => 3
 ]);

 Product::create([
 'name' => 'клубника',
  'pseudo_name'=>'strawberry_big',
 'cost' => 150,
 'liter' => 3
 ]);
		
	}

}