<!DOCTYPE html>
<html>

<head>
</head>

<body>

@foreach($data as $order)

<div style="border:solid 1px black; margin-bottom:8px;">
  <strong>Заказ № {{$order['order']->id}}</strong>
  <div style=" border-bottom:solid 1px black;">
   <span>
       Имя:
   </span>
   <span>
       {{$order['order']->name}}
   </span>
  </div>
  <div style=" border-bottom:solid 1px black;">
   <span>
       email
   </span>
   <span>
       {{$order['order']->email}}
   </span>
  </div>
  <div style=" border-bottom:solid 1px black;">
   <span>
       Адрес
   </span>
   <span>
       {{$order['order']->adress}}
   </span>
  </div>
  <div style=" border-bottom:solid 1px black;">
   <span>
       Телефон
   </span>
   <span>
       {{$order['order']->telephone}}
   </span>
  </div>
  <div style=" border-bottom:solid 1px black;">
   <span>
       Сумма
   </span>
   <span>
       {{$order['order']->total_cost}}
   </span>
  </div>
<strong>Детали заказа</strong>
@foreach($order['product'] as $product)
<div style=" border-bottom:solid 1px black;">
   <span>
       {{$product['prod']->name}}
   </span>
   <span>
       {{$product['prod']->liter }} литр;
   </span>
   <span>
       {{$product['count']}} шт.;
   </span>
   <span>
       {{$product['prod']->cost}} грн за шт.;
   </span>
   <span>
       {{$product['cost_all']}} грн за все;
   </span>
</div>
@endforeach

</div>

@endforeach




</body>
 </html>