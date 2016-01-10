  <div class="order">
    <div class="order-btn-close"></div>
    <form id="order-form" method="" action="" name="">
     <input type="hidden" name="_token" value="{{{ Session::getToken() }}}">
      <input type="text" name="ordername" placeholder="Ваше имя" class="order-name">
      <input type="text" name="orderemail" placeholder="Email" class="order-email">
      <input type="text" name="orderphone" placeholder="+38 (___) ___-__-__" class="order-phone">
      <input type="text" name="orderaddress" placeholder="Адрес" class="order-address">
      <select name="orderdelivery" class="order-delivery">
        <option value="" disabled="disabled" selected="selected">Способ доставки</option>
        <option value="courier">Доставка курьером по адресу</option>
        <option value="pickup">Самовывоз</option>
      </select>
      <select name="orderpayment" class="order-payment">
        <option value="" disabled="disabled" selected="selected">Способ оплаты</option>
        <option value="courier">Оплата наличными курьеру</option>
        <option value="pickup">Оплата ONLINE</option>
      </select>
      <div class="order-price-info">
        <div class="delivery-price">Стоимость доставки 30 грн</div>
        <div class="order-total-price">Стоимость закаказа 10 грн</div>
      </div>
      <textarea name="order-more-info" placeholder="Комментарии" class="order-more-info"></textarea>
      <input type="submit" name="order-btn" value="Заказать" class="order-btn hvr-grow-rotate-btn">
    </form>
  </div>
  <div class="order-overlay"></div>
  <div class="cart">
    <div class="cart-btn-close"></div>
    <div class="cart-content">
      <div class="cart-title">Корзина</div>
      <div class="cart-list-full">
        <ul class="cart-list"></ul>
        <div class="cart-order"><a href="##" title="Продолжить покупки" class="cart-btn-continue hvr-grow-rotate">Продолжить покупки</a><a href="##" title="Оформить заказ" class="cart-btn-order hvr-grow-rotate">Заказать</a>
          <div class="cart-full-summ"></div>
        </div>
      </div>
      <div class="cart-list-empty">Корзина пуста</div>
    </div>
  </div>
  <div class="cart-overlay"></div>