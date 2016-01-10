<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Illuminate\Database\Eloquent\Model;
use App\Product;
use App\Order;
use App\Pay_method;
use App\Delivery;
use App\OrderProduct;
use Mail;
use Swift_Encoding;
use Input;

class ShopController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$liter1 = Product::where('liter', 1)->get();
		$liter3 = Product::where('liter', 3)->get();
		return view('shop', ['liter1' => $liter1 , 'liter3' => $liter3] );
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function order()
	{
		$data = Input::all();
        $pay= Pay_method::where('pseudo_name', $data['payment'])->firstOrFail();
        $delivery= Delivery::where('pseudo_name', $data['delivery'])->firstOrFail();

		$order=new Order();
		$order->name=$data['name'];
		$order->telephone=$data['phone'];
		$order->adress=$data['address'];
		$order->email=$data['email'];
		$order->payment_method_id=$pay->id;
		$order->delivery_id=$delivery->id;
		$order->comment=$data['info'];
		$order->status='new';
        $order->total_cost=$data['sum'];
        $order->save();

        foreach ($data['cart'] as $name => $value) {
	       $prod = Product::where('pseudo_name',$name)->firstOrFail();
	       $ord_prod = new OrderProduct();
	       $ord_prod->product_id=$prod->id;
	       $ord_prod->count=$value;
	       $ord_prod->order_id=$order->id;
	       $ord_prod->save();	
        }


        Mail::send('emails.order_success', ['data' =>$data], function($message)
{
  $message->setEncoder(Swift_Encoding::get8BitEncoding());
  $message->to('adminemail@gmail.com', 'John Smith')->subject('New order!');
});
		return 1;
	}
}
