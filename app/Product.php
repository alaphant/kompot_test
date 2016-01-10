<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model {

	//
    protected $fillable = array('name', 'pseudo_name', 'cost', 'liter');

	public function orders()
    {
        return $this->belongsToMany('App\Order');
    }

}
