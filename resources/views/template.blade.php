<!DOCTYPE html>
<html>

<head>
  <title>Kompotti BOOM</title>
  <link rel="shortcut icon" href="img/source/favicon.ico" type="image/x-icon">
  <!--meta-->
  <meta name="_token" content="{{ csrf_token() }}"/>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <!--meta(name="format-detection" content="telephone=no")-->
  <meta name="viewport" content="width=device-width, user-scalable=yes">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Kompotti BOOM">
  <meta property="og:site_name" content="">
  <meta property="og:description" content="Kompotti BOOM - это одна из программ благотворительного проекта «Жизнелюб», все средства вырученные от продажи компота (включая себестоимость) будут направлены на строительство летнего кинотеатра для пенсионеров Киева.">
  <meta property="og:url" content="http://kompotti.com">
  <meta property="og:image" content="/img/source/shering_kompot_final.png">
  <!--styles-->
  <!--style community-->
  <link rel="stylesheet" type="text/css" href="css/reset.css">
  <!--style local-->
  <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
  <!--upgrade old ie-->
  <!--[if lt IE 9]<p class="upgrade-browser"></p>You are using an<strong>outdated</strong> browser. Please<a title="Upgrade your browser" href="http://browsehappy.com/">upgrade
your browser</a>improve your experience.
<![endif]-->
  <!--content-->
  <div id="pageLoading" class="page-loading">
    <div class="spinner"></div>
  </div>
@yield('main_part')
  
  <!--js-->
  <!--js community-->
  <!--js jquery-->
  <script language="JavaScript" type="text/javascript" src="vendor/jquery/dist/jquery.min.js"></script>
  <script language="JavaScript" type="text/javascript" src="vendor/velocity/velocity.min.js"></script>
  <!--js googlemaps-->
  <script language="JavaScript" type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
  <!--js googlemaps infowindow-->
  <script language="JavaScript" type="text/javascript" src="js/community/infobubble-compiled.js"></script>
  <!--froogaloop vimeo api-->
  <script language="JavaScript" type="text/javascript" src="js/community/froogaloop.min.js"></script>
  <!--js slick slider-->
  <script language="JavaScript" type="text/javascript" src="vendor/slick-carousel/slick/slick.min.js"></script>
  <!--js GSAP lib-->
  <script language="JavaScript" type="text/javascript" src="vendor/gsap/src/minified/TweenMax.min.js"></script>
  <!--js JQueryValidationPlugin-->
  <script language="JavaScript" type="text/javascript" src="vendor/jquery-validation/dist/jquery.validate.min.js"></script>
  <!--js JQuery inputmask-->
  <script language="JavaScript" type="text/javascript" src="vendor/jquery.inputmask/dist/min/inputmask/inputmask.min.js"></script>
  <script language="JavaScript" type="text/javascript" src="vendor/jquery.inputmask/dist/min/inputmask/jquery.inputmask.min.js"></script>
  <!--js local-->
  <script language="JavaScript" type="text/javascript" src="js/local/app.js"></script>
  <script language="JavaScript" type="text/javascript" src="js/scripts.js"></script>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-19190463-20', 'auto');
    ga('send', 'pageview');
  </script>
</body>

</html>