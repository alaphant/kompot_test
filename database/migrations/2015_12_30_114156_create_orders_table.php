<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('orders', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 255);
			$table->string('email', 255);
			$table->string('adress', 255);
			$table->string('telephone', 255);
			$table->string('status', 255);
			$table->text('comment');
			$table->double('total_cost', 5, 2);
			$table->integer('delivery_id')->unsigned();
            $table->foreign('delivery_id')->references('id')->on('deliveries');	
            $table->integer('payment_method_id')->unsigned();
            $table->foreign('payment_method_id')->references('id')->on('pay_methods');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('orders');
	}

}
