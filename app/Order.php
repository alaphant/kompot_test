<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model {

	//

	public function delivery()
    {
        return $this->belongsTo('App\Delivery');
    }

    public function pay_method()
    {
        return $this->belongsTo('App\Pay_method');
    }

    public function products()
    {
        return $this->belongsToMany('App\Product');
    }

}
