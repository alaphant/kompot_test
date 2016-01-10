<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Pay_method extends Model {

	//
	protected $fillable = array('name','pseudo_name');

	public function order()
    {
        return $this->hasOne('App\Order');
    }

}
