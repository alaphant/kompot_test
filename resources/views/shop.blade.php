@extends('template')

@section('main_part')

 @include('order')
<div class="shop">
   
    @include('top',['inner' => 'header_button'])
    <div class="shop-content js_set_h">
      <div class="shop-head">
        <div class="shop-title">Покупай компот</div>
        <ul class="shop-choose-category">
          <li data-productSize="1">1 литр</li>
          <li data-productSize="3">3 литра</li>
        </ul>
      </div>
      <div class="shop-body">
        <ul class="shop-category-item">

          @foreach($liter1 as $l1)
            <li class="shop-product-item">
            <div class="shop-product-content">
              <div class="shop-product-title">{{$l1->cost}}грн</div><a href="##" title="Добавить в корзину" data-type="{{$l1->pseudo_name}}" class="shop-product-btn hvr-grow-rotate">В корзину</a>
              <img src="img/source/pear-liter.png" title="{{$l1->name}}" class="shop-product-img">
            </div>
          </li>
          @endforeach
        </ul>
        <ul class="shop-category-item">
          @foreach($liter3 as $l3)
            <li class="shop-product-item">
            <div class="shop-product-content">
              <div class="shop-product-title">{{$l3->cost}}грн</div><a href="##" title="Добавить в корзину" data-type="{{$l3->pseudo_name}}" class="shop-product-btn hvr-grow-rotate">В корзину</a>
              <img src="img/source/pear-liter.png" title="{{$l3->name}}" class="shop-product-img">
            </div>
          </li>
          @endforeach
         
        </ul>
      </div>
    </div>

    @include('footer')
  </div>
 
@stop