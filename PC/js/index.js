//宣传广告显示与隐藏
var top_banner=document.getElementById("top_banner");
var big_top_banner=document.getElementById("big_top_banner");
var small_top_banner=document.getElementById("small_top_banner");
var top_banner_btn=document.getElementById("top_banner_btn");

function hide(){
    top_banner_btn.flag=false;
    top_banner_btn.innerHTML="收起";
    big_top_banner.style.display="block";
    top_banner_btn.style.display="block";
    myMove(big_top_banner,{height:300},300);
}

function show(){
    top_banner_btn.flag=true;
    myMove(big_top_banner,{height:0},200, function () {
        big_top_banner.style.display="none";
    });
    small_top_banner.style.display="block";
    myMove(small_top_banner,{height:60},200);
    top_banner_btn.innerHTML="展开";
}

window.setTimeout(hide,1000);
window.setTimeout(show,5000);

top_banner_btn.onclick= function () {
    if(this.flag){
        hide();small_top_banner.style.display="none";
    }
    else{
        show();
    }
};


//购物车显示与隐藏
var hd_shopping_cart=document.getElementById("hd_shopping_cart");
var shopping_cart_detail=document.getElementById("shopping_cart_detail");
hd_shopping_cart.onmouseover= function () {
    shopping_cart_detail.style.display="block";
};

hd_shopping_cart.onmouseout= function () {
    shopping_cart_detail.style.display="none";
};


//大轮播图
~function () {
    var banner = document.getElementById("main_banner");
    var bannerInner = banner.getElementsByTagName("div")[0];
    var bannerTip = banner.getElementsByTagName("ul")[0];
    var imgs = banner.getElementsByTagName("img");
    var oli = banner.getElementsByTagName("li");
    var link = banner.getElementsByTagName("a");
    var leftLink = link[0];
    var rightLink = link[1];

    var jsonData = null;
    var xhr = new XMLHttpRequest();
    xhr.open("get", "json/banner1.txt?_=" + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        }
        jsonData = utils.formatJSON(xhr.responseText);
    };
    xhr.send(null);
    ~function () {
        var str1 = "", str2 = "";
        for (var i = 0, len = jsonData.length; i < len; i++) {
            var cur = jsonData[i];
            str1 += "<div><img src='' truesrc='" + cur['img'] + "'/></div>";
            str2 += i === 0 ? "<li class='bg'></li>" : "<li></li>";
        }
        bannerInner.innerHTML = str1;
        bannerTip.innerHTML = str2;
    }();

    window.setTimeout(lazyImg, 1000);
    function lazyImg() {
        for (var i = 0; i < imgs.length; i++) {
            ~function (i) {
                var curImg = imgs[i];
                var newImg = new Image;
                newImg.src = curImg.getAttribute("truesrc");
                newImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    if (i === 0) {
                        curDiv = curImg.parentNode;
                        //myMove(curDiv, {opacity: 1}, 500);
                        curDiv.style.opacity = 1;
                    }
                    newImg = null;
                }
            }(i);
        }
    }

    var step = 0, interval = 3000, autoTimer = null;
    autoTimer = window.setInterval(autoMove, interval);
    function autoMove() {
        if (step === jsonData.length - 1) {
            step = -1;
        }
        step++;
        setBanner();
    }

    function setBanner() {
        for (var i = 0; i < imgs.length; i++) {
            var curDiv = imgs[i].parentNode;
            if (i === step) {
                curDiv.style.zIndex = 1;
                //myMove(curDiv, {opacity: 1}, 500);
                curDiv.style.opacity = 1;
            }
            else {
                curDiv.style.zIndex = 0;
                //myMove(curDiv, {opacity: 0}, 500);
                curDiv.style.opacity = 0;
            }
            i != step ? oli[i].style.background = "grey" : oli[i].style.background = "red";
        }
    }

    for (var i = 0; i < oli.length; i++) {
        var curLi = oli[i];
        curLi.index = i;
        curLi.onmouseover = function () {
            step = this.index;
            setBanner();
        }
    }
    banner.onmouseover = function () {
        clearInterval(autoTimer);
        rightLink.style.display = leftLink.style.display = "block";
    };
    banner.onmouseout = function () {
        autoTimer = window.setInterval(autoMove, interval);
        rightLink.style.display = leftLink.style.display = "none";
    };
    rightLink.onclick = autoMove;
    leftLink.onclick = function () {
        step = step === 0 ? jsonData.length : step;
        step--;
        setBanner();
    }
}();


//每楼层区的小轮播图功能实现
var floor_banner1 = new BannerL("firstBanner", 1, 5000);
var floor_banner2 = new BannerL("secBanner", 0, 4000);
var floor_banner3 = new BannerL("thiBanner", 1, 6000);
var floor_banner4 = new BannerL("forBanner", 0, 4000);
var floor_banner5 = new BannerL("fifBanner", 1, 5000);


//楼层导航功能实现
var winH = utils.win("clientHeight");
var floorLift = document.getElementById("floor_lift");
var floorArea = utils.getElementsByClass("floors");
var floorLi = floorLift.getElementsByTagName("li");
var hd_header_nav=document.getElementById("hd_header_nav");
var goodsMenu_outerBox=document.getElementById("goodsMenu_outerBox");
var hd_header_nav_bg=document.getElementById("hd_header_nav_bg");

function winonscroll() {
    var a = utils.offset(floorArea[0]).top;
    var b = utils.win("scrollTop") + 150;
    var len = floorArea.length;
    floorLift.style.display = a < b ? "block" : "none";
    var curscrol = utils.win("scrollTop");
    if(curscrol>600){
        hd_header_nav_bg.style.display="block";
        utils.addClass(hd_header_nav,"nav_fixed");
    }
    else{
        hd_header_nav_bg.style.display="none";
        utils.removeClass(hd_header_nav,"nav_fixed");
    }
    
    for (var i = 0; i < len; i++) {
        var curFloor = floorArea[i];
        var n = utils.offset(curFloor).top;
        var c = utils.offset(floorArea[len - 1]).top;
        if ((n - 150) < curscrol && curscrol < (n + 264)) {
            utils.addClass(floorLi[i], "hover");
            utils.removeClass(floorLi[len], "hover");
        }
        else {
            if (curscrol >= (c + 264)) {
                utils.addClass(floorLi[len], "hover");
                utils.removeClass(floorLi[i], "hover");
            }
            utils.removeClass(floorLi[i], "hover");
        }
    }
}

window.onscroll = winonscroll;

goodsMenu_outerBox.onmouseover= function () {
    utils.addClass(this,"hover");
};
goodsMenu_outerBox.onmouseout= function () {
    utils.removeClass(this,"hover");
};
 

~function () {
    for (var i = 0, len = floorArea.length; i <= len; i++) {
        var curLi = floorLi[i];
        curLi.onclick = (function (i) {
            return function () {
                var curscrol = utils.win("scrollTop");
                if (i === floorLi.length - 1) {
                    target = 0;
                    step = (curscrol - target) / 600 * 10;
                    timer = setInterval(
                        function () {
                            nowscrol = utils.win("scrollTop");
                            if (nowscrol <= target) {
                                clearInterval(timer);
                                utils.win("scrollTop", target);
                                return;
                            }
                            utils.win("scrollTop", nowscrol - step);
                        }, 10);
                    return;
                }
                var target = utils.offset(floorArea[i]).top - 145;
                var step = (Math.abs(target - curscrol) / 600) * 10;
                var timer = setInterval(function () {
                    var nowscrol = utils.win("scrollTop");
                    if (target < curscrol) {
                        if (nowscrol <= target) {
                            clearInterval(timer);
                            utils.win("scrollTop", target);
                            return;
                        }
                        utils.win("scrollTop", nowscrol - step);
                    }
                    else {
                        if (nowscrol >= target) {
                            clearInterval(timer);
                            utils.win("scrollTop", target);
                            return;
                        }
                        utils.win("scrollTop", nowscrol + step);
                    }
                }, 10);
            }
        })(i);
    }
}();


//导航信息的隐藏与显示

~function () {
    var leftMenu=document.getElementById("left_menu");
    var menuList = utils.getElementsByClass("menu_list");
    var detailList = utils.getElementsByClass("menu_list_detail");

    for (var i = 0; i < menuList.length; i++) {

        var curLi=menuList[i];
        curLi.index=i;
        curLi.onmouseover=function(e){
            this.className="cur";
            detailList[this.index].style.display='block';
            utils.css(detailList[this.index],{top:-(this.index*33)})

        };

        curLi.onmouseout= function (e) {
            this.className="";
            detailList[this.index].style.display='none';
        }
    }
}();


//图片移动效果
~function () {
    var smallImg=utils.getElementsByClass("floor_top_img");

    for(var i=0;i<smallImg.length;i++){
        var curImg=smallImg[i];
        curImg.onmouseover= function () {
            myMove(this,{right:-10},100)
        };
        curImg.onmouseout=function(){
            myMove(this,{right:0},100)
        }

    }
}();


//图片阴影效果
 ~function () {
     var floorArea=document.getElementById("floor_area");
     floorArea.addEventListener("mouseover",function(e){
         e=e||window.event;
         var tar= e.target|| e.srcElement;
         if(tar.tagName.toLowerCase()==="img"){
             utils.addClass(tar,"light");

         }else{
             e.stopPropagation?e.stopPropagation(): e.cancelable=true;
         }

     },false);
     floorArea.addEventListener("mouseout",function(e){
         e=e||window.event;
         var tar= e.target|| e.srcElement;
         if(tar.tagName.toLowerCase()==="img"){
             utils.removeClass(tar,"light");



         }else{
             e.stopPropagation?e.stopPropagation(): e.cancelable=true;
         }
     },false);
 }();












