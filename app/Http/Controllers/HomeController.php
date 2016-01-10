<?php namespace App\Http\Controllers;

use App\Order;
use App\Pay_method;
use App\Delivery;
use App\OrderProduct;
use App\Product;

class HomeController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders your application's "dashboard" for users that
	| are authenticated. Of course, you are free to change or remove the
	| controller as you wish. It is just here to get your app started!
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('home');
	}


	public function admin()
	{
		$output=array();
		$i=0;
		$orders = Order::all();
		foreach ($orders as $order) {
			$pivots = OrderProduct::where('order_id',$order->id)->get();
			
			foreach ($pivots as $pivot) {
				$prod=Product::findOrFail($pivot['product_id']);;
				$output[$i]['order']=$order;
				$p=['prod'=>$prod,'count'=>$pivot['count'],'cost_all'=>(int)$pivot['count']*(int)$prod->cost];
				$output[$i]['product'][]=$p;
			}
			$i++;
		}
		return view('admin',['data'=>$output]);
	}

}
