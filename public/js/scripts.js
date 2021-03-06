(function() {
  var Cart, Feedback, HomeSlider, addClass, fill, fit, hasClass, removeClass;

  fit = function(fromW, fromH, toW, toH, round) {
    var leading, ratio1, ratio2, targetH, targetW;
    targetW = 0;
    targetH = 0;
    ratio1 = fromW / fromH;
    ratio2 = toW / toH;
    leading = ratio1 > ratio2 ? 'w' : 'h';
    if (leading === 'w') {
      targetW = toW;
      targetH = targetW / ratio1;
    } else {
      targetH = toH;
      targetW = targetH * ratio1;
    }
    if (round) {
      return [Math.round(targetW), Math.round(targetH)];
    }
    return [targetW, targetH];
  };

  fill = function(fromW, fromH, toW, toH, round) {
    var leading, marginLeft, marginTop, ratio1, ratio2, targetH, targetW;
    targetW = 0;
    targetH = 0;
    marginLeft = 0;
    marginTop = 0;
    ratio1 = fromW / fromH;
    ratio2 = toW / toH;
    leading = ratio1 < ratio2 ? 'w' : 'h';
    if (leading === 'w') {
      targetW = toW;
      targetH = targetW / ratio1;
      marginTop = (toH - targetH) / 2;
    } else {
      targetH = toH;
      targetW = targetH * ratio1;
      marginLeft = (toW - targetW) / 2;
    }
    if (round) {
      return [Math.round(targetW), Math.round(targetH), Math.round(marginLeft), Math.round(marginTop)];
    }
    return [targetW, targetH, marginLeft, marginTop];
  };

  addClass = function(o, c) {
    var re;
    re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
    if (re.test(o.className)) {
      return;
    }
    o.className = (o.className + ' ' + c).replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
  };

  removeClass = function(o, c) {
    var re;
    re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
    o.className = o.className.replace(re, '$1').replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
  };

  hasClass = function(o, c) {
    var re;
    re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
    return re.test(o.className);
  };

  Cart = (function() {
    function Cart(form) {
      this.form = form;
      this.shop_choose_category = $(".shop-choose-category li");
      this.shop_category_item = $(".shop-category-item");
      this.cart_list_full = $(".cart-list-full");
      this.cart_list_empty = $(".cart-list-empty");
      this.cart_list = this.cart_list_full.find(".cart-list");
      this.shop_cart_header_summ = $(".shop-cart-header-summ");
      this.init();
      this.bind();
    }

    Cart.prototype.init = function() {
      this.shop_choose_category.eq(0).addClass("active");
      this.shop_category_item.eq(0).addClass("active").css({
        display: "block"
      });
      this.cart_list_empty.addClass("active");
      this.t_anim_choose_category = 300;
      this.shop_full_summ = 0;
      this.cart = {};
      return this.products = {
        cherry_big: {
          name: "Вишня",
          size: 3,
          price: 150
        },
        pear_big: {
          name: "Груша",
          size: 3,
          price: 150
        },
        strawberry_big: {
          name: "Клубника",
          size: 3,
          price: 150
        },
        cherry_small: {
          name: "Вишня",
          size: 1,
          price: 80
        },
        pear_small: {
          name: "Груша",
          size: 1,
          price: 80
        },
        strawberry_small: {
          name: "Клубника",
          size: 1,
          price: 80
        }
      };
    };

    Cart.prototype.bind = function() {
      var that;
      that = this;
      showPopUp($(".shop-cart-header-btn, .shop-product-btn"), $(".cart-btn-close, .cart-overlay, .cart-btn-continue"), $(".cart"), $(".cart-overlay"));
      showPopUp($(".cart-btn-order"), $(".order-btn-close, .order-overlay"), $(".order"), $(".order-overlay"));
      that.shop_choose_category.on("click", function() {
        that.shop_choose_category.removeClass("active");
        $(this).addClass("active");
        $(".shop-category-item.active").removeClass("active");
        setTimeout((function() {
          return that.shop_category_item.css({
            display: "none"
          });
        }), that.t_anim_choose_category);
        if ($(this).data("productsize") === 1) {
          setTimeout((function() {
            return that.shop_category_item.eq(0).css({
              display: "block"
            });
          }), that.t_anim_choose_category);
          return setTimeout((function() {
            return that.shop_category_item.eq(0).addClass("active");
          }), that.t_anim_choose_category + 100);
        } else {
          setTimeout((function() {
            return that.shop_category_item.eq(1).css({
              display: "block"
            });
          }), that.t_anim_choose_category);
          return setTimeout((function() {
            return that.shop_category_item.eq(1).addClass("active");
          }), that.t_anim_choose_category + 100);
        }
      });
      $(".shop-product-btn").bind("click", (function(_this) {
        return function(e) {
          var count, hash;
          e.preventDefault();
          hash = $(e.target).data("type");
          that.shop_full_summ = that.shop_full_summ + that.products[hash].price;
          that.showFullSumm(that.shop_cart_header_summ);
          if (that.cart_list_empty.hasClass("active")) {
            that.cart_list_empty.removeClass("active");
            that.cart_list_full.addClass("active");
          }
          count = (that.cart[hash] === undefined ? 1 : that.cart[hash] + 1);
          that.cart[hash] = count;
          that.drawCart();
          that.showFullSumm($(".cart-full-summ"));
          return $('.order-total-price').text('Стоимость закаказа ' + that.shop_full_summ + ' грн');
        };
      })(this));
      $document.on('change', '.order-delivery', function() {
        if ($(this).val() === 'courier') {
          $('.order-total-price').text('Стоимость закаказа ' + (that.shop_full_summ + 30) + ' грн');
          $('.delivery-price').addClass('active');
          return $('.order-price-info').addClass('active');
        } else {
          $('.order-total-price').text('Стоимость закаказа ' + that.shop_full_summ + ' грн');
          $('.delivery-price').removeClass('active');
          return $('.order-price-info').removeClass('active');
        }
      });
      $document.on("click", ".cart-product-btn-del", function() {
        var count, hash;
        hash = $(this).data("carttype");
        if (that.cart[hash] !== undefined) {
          if (that.cart[hash] > 1) {
            count = that.cart[hash] - 1;
            that.cart[hash] = count;
          } else {
            count = 0;
            delete that.cart[hash];
          }
        }
        that.shop_full_summ = that.shop_full_summ - that.products[hash].price;
        that.drawCart();
        that.showFullSumm(that.shop_cart_header_summ);
        that.showFullSumm($(".cart-full-summ"));
        return $('.order-total-price').text('Стоимость закаказа ' + that.shop_full_summ + ' грн');
      });
      return $('#order-form').on("submit_order", function(e) {
        var count, data, hash, html_list, product;
        html_list = "<ol>";
        for (hash in that.cart) {
          count = that.cart[hash];
          product = that.products[hash];
          html_list += "<li class=\"cart-list-item\"><span> " + product.name + " </span> " + " <span> " + product.size + " л.</span> " + "<span> " + count + " шт.</span> " + " <span>" + (product.price * count) + " грн</span> " + "</li>";
        }
        html_list += "</ol>";
        data = {
          name: $('.order-name').val(),
          phone: $('.order-phone').val(),
          address: $('.order-address').val(),
          email: $('.order-email').val(),
          payment: $('.order-payment').val(),
          delivery: $('.order-delivery').val(),
          info: $('.order-more-info').val(),
          cart_html: html_list,
          cart: that.cart,
          sum: that.shop_full_summ,
          _token: $('#order-form input[name=_token]').val()
        };
        return $.post("/send_order",data).success(function(response, textStatus) {     
        //alert('send');   
	      return document.location.href = '/feedback-message.html';          
        }).error(function(data, textStatus) {
          alert('Что-то пошло не так.');
          return $('#order-form').addClass('error');
        });
      });
    };

    Cart.prototype.showFullSumm = function($obj) {
      if (!$obj.hasClass("not-empty")) {
        $obj.addClass("not-empty");
        $obj.text(this.shop_full_summ + " грн");
      }
      if (this.shop_full_summ > 0) {
        $obj.removeClass("not-empty");
        return setTimeout(((function(_this) {
          return function() {
            $obj.text(_this.shop_full_summ + " грн");
            return $obj.addClass("not-empty");
          };
        })(this)), 400);
      } else {
        this.cart_list_full.removeClass("active");
        this.cart_list_empty.addClass("active");
        $obj.removeClass("not-empty");
        return $obj.text("");
      }
    };

    Cart.prototype.drawCart = function() {
      var count, hash, html_list, product;
      html_list = "";
      for (hash in this.cart) {
        count = this.cart[hash];
        product = this.products[hash];
        html_list += "<li class=\"cart-list-item\"><div class=\"cart-product-name\">" + product.name + "</div>" + "<div class=\"cart-product-size\">" + product.size + " л.</div>" + "<div class=\"cart-product-count\">" + count + " шт.</div>" + "<div class=\"cart-product-price\">" + (product.price * count) + " грн</div>" + "<div class=\"cart-product-btn-del\" data-carttype=\"" + hash + "\"></div></li>";
      }
      return this.cart_list.html(html_list);
    };

    return Cart;

  })();

  Feedback = (function() {
    function Feedback(form) {
      var self;
      this.form = form;
      self = this;
      this.form.addEventListener("submit", function(e) {
        e.preventDefault();
        $.post("/send_mail.php", $(this).serialize()).success(function(data, textStatus) {
          data = $.parseJSON(data);
          console.log(data.type);
          if (data.type === "success") {
            return document.location.href = '/feedback-message.html';
          } else {
            return addClass(self.form, 'error');
          }
        }).error(function(data, textStatus) {
          return addClass(self.form, 'error');
        });
        return false;
      });
    }

    return Feedback;

  })();

  HomeSlider = (function() {
    function HomeSlider(container) {
      this.container = container;
      this.elements = Array.prototype.slice.call(this.container.getElementsByClassName('home-slider-item'));
      this.current = 1;
      this.bind();
      this.animated = false;
    }

    HomeSlider.prototype.bind = function() {
      var item, self, _i, _len, _ref, _results;
      if (this.elements.length < 3) {
        return;
      }
      if ($(window).width() > 1200) {
        this.elements[0].style.left = 0;
        this.elements[2].style.right = 0;
      } else {
        this.elements[0].style.left = 0;
        this.elements[0].style.top = '240px';
        this.elements[2].style.right = 0;
        this.elements[2].style.top = '240px';
        this.elements[1].style.marginLeft = '-43%';
        this.elements[1].style.width = '100%';
      }
      this.elements[1].style.transform = 'scale(1.65)';
      this.elements[1].style.left = '43%';
      addClass(this.elements[1], 'active');
      $.Velocity(this.elements[1].getElementsByClassName('home-slider-btn')[0], {
        opacity: [1, 0]
      }, {
        begin: function(e) {
          return e[0].style.opacity = 0;
        },
        duration: 250,
        easing: 'easeOutCubic'
      });
      _ref = this.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        self = this;
        _results.push(item.addEventListener('click', function() {
          return self.move(this);
        }));
      }
      return _results;
    };

    HomeSlider.prototype.move = function(item) {
      if (this.animated || hasClass(item, 'active')) {
        return false;
      }
      this.animated = true;
      if (this.elements.indexOf(item) === 0) {
        return this.moveRight();
      } else {
        return this.moveLeft();
      }
    };

    HomeSlider.prototype.moveLeft = function() {
      var self;
      self = this;
      if ($(window).width() > 1200) {
        $.Velocity(this.elements[2], {
          left: ['43%', '100%'],
          scale: [1.65, 1]
        }, {
          begin: function(e) {
            return e[0].style.right = 'auto';
          },
          duration: 750,
          easing: 'easeOutCubic',
          complete: (function(_this) {
            return function(e) {
              addClass(e[0], 'active');
              return $.Velocity(e[0].getElementsByClassName('home-slider-btn')[0], {
                opacity: [1, 0]
              }, {
                begin: function(e) {
                  return e[0].style.opacity = 0;
                },
                duration: 250,
                easing: 'easeInOutExpo'
              });
            };
          })(this)
        });
        $.Velocity(this.elements[1], {
          left: [0, '43%'],
          scale: [1, 1.65]
        }, {
          begin: function(e) {
            removeClass(e[0], 'active');
            return e[0].style.left = 'auto';
          },
          duration: 750,
          easing: 'easeOutCubic'
        });
        return $.Velocity(this.elements[0], {
          left: ['-200px', 0],
          scale: [0.7, 1]
        }, {
          duration: 150,
          easing: 'easeOutCubic',
          complete: (function(_this) {
            return function(e) {
              e[0].style.left = 'auto';
              e[0].style.right = '-200px';
              return $.Velocity(e[0], {
                right: [0, '-200px'],
                scale: [1, 0.7]
              }, {
                duration: 750,
                easing: 'easeOutCubic',
                complete: function(e) {
                  var item;
                  item = self.elements.shift();
                  self.elements.push(item);
                  return self.animated = false;
                }
              });
            };
          })(this)
        });
      } else {
        this.elements[2].style.width = '100%';
        this.elements[2].style.marginLeft = '-43%';
        $.Velocity(this.elements[2], {
          left: ['43%', '100%'],
          scale: [1.65, 1],
          top: ['40px', '240px']
        }, {
          begin: function(e) {
            return e[0].style.right = 'auto';
          },
          duration: 750,
          easing: 'easeOutCubic',
          complete: (function(_this) {
            return function(e) {
              addClass(e[0], 'active');
              return $.Velocity(e[0].getElementsByClassName('home-slider-btn')[0], {
                opacity: [1, 0]
              }, {
                begin: function(e) {
                  return e[0].style.opacity = 0;
                },
                duration: 250,
                easing: 'easeInOutExpo'
              });
            };
          })(this)
        });
        this.elements[1].style.width = 'auto';
        this.elements[1].style.marginLeft = '0';
        $.Velocity(this.elements[1], {
          left: [0, '43%'],
          scale: [1, 1.65],
          top: ['240px', '40px']
        }, {
          begin: function(e) {
            removeClass(e[0], 'active');
            return e[0].style.left = 'auto';
          },
          duration: 750,
          easing: 'easeOutCubic'
        });
        return $.Velocity(this.elements[0], {
          left: ['-200px', 0],
          scale: [0.7, 1]
        }, {
          duration: 150,
          easing: 'easeOutCubic',
          complete: (function(_this) {
            return function(e) {
              e[0].style.left = 'auto';
              e[0].style.right = '-200px';
              return $.Velocity(e[0], {
                right: [0, '-200px'],
                scale: [1, 0.7]
              }, {
                duration: 750,
                easing: 'easeOutCubic',
                complete: function(e) {
                  var item;
                  item = self.elements.shift();
                  self.elements.push(item);
                  return self.animated = false;
                }
              });
            };
          })(this)
        });
      }
    };

    HomeSlider.prototype.moveRight = function() {
      var self;
      self = this;
      if ($(window).width() > 1200) {
        $.Velocity(this.elements[0], {
          left: ['43%', 0],
          scale: [1.65, 1]
        }, {
          duration: 750,
          easing: 'easeOutCubic',
          complete: (function(_this) {
            return function(e) {
              addClass(e[0], 'active');
              return $.Velocity(e[0].getElementsByClassName('home-slider-btn')[0], {
                opacity: [1, 0]
              }, {
                begin: function(e) {
                  return e[0].style.opacity = 0;
                },
                duration: 250,
                easing: 'easeOutCubic'
              });
            };
          })(this)
        });
        $.Velocity(this.elements[1], {
          right: [0, '43%'],
          scale: [1, 1.65]
        }, {
          begin: function(e) {
            removeClass(e[0], 'active');
            return e[0].style.left = 'auto';
          },
          duration: 750,
          easing: 'easeOutCubic'
        });
        return $.Velocity(this.elements[2], {
          right: ['-200px', 0],
          scale: [0.7, 1]
        }, {
          duration: 150,
          easing: 'easeOutCubic',
          complete: (function(_this) {
            return function(e) {
              e[0].style.right = 'auto';
              e[0].style.left = '-200px';
              return $.Velocity(e[0], {
                left: [0, '-200px'],
                scale: [1, 0.7]
              }, {
                duration: 750,
                easing: 'easeOutCubic',
                complete: function(e) {
                  var item;
                  item = self.elements.pop();
                  self.elements.unshift(item);
                  return self.animated = false;
                }
              });
            };
          })(this)
        });
      } else {
        this.elements[0].style.width = '100%';
        this.elements[0].style.marginLeft = '-43%';
        $.Velocity(this.elements[0], {
          left: ['43%', 0],
          scale: [1.65, 1],
          top: ['40px', '240px']
        }, {
          duration: 750,
          easing: 'easeOutCubic',
          complete: (function(_this) {
            return function(e) {
              addClass(e[0], 'active');
              return $.Velocity(e[0].getElementsByClassName('home-slider-btn')[0], {
                opacity: [1, 0]
              }, {
                begin: function(e) {
                  return e[0].style.opacity = 0;
                },
                duration: 250,
                easing: 'easeOutCubic'
              });
            };
          })(this)
        });
        this.elements[1].style.width = 'auto';
        this.elements[1].style.marginLeft = '0';
        $.Velocity(this.elements[1], {
          right: [0, '43%'],
          scale: [1, 1.65],
          top: ['240px', '40px']
        }, {
          begin: function(e) {
            removeClass(e[0], 'active');
            return e[0].style.left = 'auto';
          },
          duration: 750,
          easing: 'easeOutCubic'
        });
        return $.Velocity(this.elements[2], {
          right: ['-200px', 0],
          scale: [0.7, 1]
        }, {
          duration: 150,
          easing: 'easeOutCubic',
          complete: (function(_this) {
            return function(e) {
              e[0].style.right = 'auto';
              e[0].style.left = '-200px';
              return $.Velocity(e[0], {
                left: [0, '-200px'],
                scale: [1, 0.7]
              }, {
                duration: 750,
                easing: 'easeOutCubic',
                complete: function(e) {
                  var item;
                  item = self.elements.pop();
                  self.elements.unshift(item);
                  return self.animated = false;
                }
              });
            };
          })(this)
        });
      }
    };

    return HomeSlider;

  })();

  if (document.getElementById('home-slider')) {
    new HomeSlider(document.getElementById('home-slider'));
  }

  if (document.getElementById('feedback-form')) {
    new Feedback(document.getElementById('feedback-form'));
  }

  new Cart;

}).call(this);
