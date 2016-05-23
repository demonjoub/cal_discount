// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myapp = angular.module('starter', ['ionic']);

myapp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
      
    // AdMob
    if(window.plugins && window.plugins.AdMob) {
        var admob_key = device.platform == "Android" ? "ca-app-pub-2467012244131972/7579194449" : "IOS_PUBLISHER_KEY";
        var admob     = window.plugins.AdMob;
        admob.createBannerView({
            'publisherId': admob_key,
            'adSize': admob.AD_SIZE.BANNER,
            'bannerAtTop': false
        },
        function() {
            admob.requestAd(
                { 'isTesting': false }, 
                function() {
                    admob.showAd(true);
                }, 
                function() { console.log('failed to request ad'); }
            );
        },
        function() {
            console.log('failed to create banner view');
        });
    }
  });
});


myapp.controller('MainCtrl',function($scope) {
    $scope.tax = { checked: false };
    $scope.data = {
        discount:'' , 
        price   :'' ,
        tax     :'' , 
        save    :''
    }
    
    $scope.taxChange = function() {
        console.log('Push Notification Change', $scope.tax.checked);
    }
    
    $scope.doCalculation = function() {
        var pp = 0;
        
        
        if($scope.data.discount == '' || $scope.data.price == '') {
            return pp;
        }
        
        var discount = parseFloat($scope.data.discount);
        var price    = parseFloat($scope.data.price);
        var tax      = parseFloat($scope.data.tax);
        var save     = 0;
        if($scope.data.tax == '') {
            tax = 0;
        }
        
//        console.log(parseInt(tax));
        // check tax 
        pp = price - price*(discount/100);
        
        if($scope.tax.checked) {
            // add tax 
            pp = pp + (pp * (tax/100));
        }
        save = price - pp;
        $scope.data.save = save;
        return pp;//parseFloat($scope.data.price);
    }
    
    $scope.showDiscount = function() {
        if($scope.data.discount == '') {
            return 0;
        }
        else {
            return $scope.data.discount;
        }
    }
    
    $scope.showOriginalPrice = function() {
        if($scope.data.price == '') {
            return 0;
        }
        else {
            return $scope.data.price;
        }
    }
    
    $scope.showSavePrice = function() {
        if($scope.data.save == '') {
            return 0;
        }
        else {
            return $scope.data.save;
        }
    }
});