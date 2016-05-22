/**
 * Created by Administrator on 2016/5/11.
 */
~function () {
    function BannerL(curEleId, step,interval) {
        this.banner = document.getElementById(curEleId);
        this.bannerInner = utils.firstChild(this.banner);
        this.imgs = this.bannerInner.getElementsByTagName("img");
        this.bannerTip = utils.children(this.banner, "ul")[0];
        this.oas = this.banner.getElementsByTagName("a");
        this.ospans = this.bannerTip.getElementsByTagName("span");

        this.step =step;
        this.interval = interval||4000;
        this.autoTimer = null;

        return this.init();
    }

    BannerL.prototype = {
        constructor: BannerL,
        autoMove: function () {
            if (this.step === this.imgs.length - 1) {
                this.step = -1;
                myMove(this.bannerInner, {left: 0}, 200);
            }
            this.step++;
            this.changeTip();
            myMove(this.bannerInner, {left: -this.step * 330}, 200)
        },
        changeTip: function () {
            var _this=this;
            for (var i = 0; i < this.ospans.length; i++) {
                var curspan=this.ospans[i];
                this.step === i ? myMove(curspan, {width: 35}, _this.interval-200): (utils.css(curspan,"width",0),clearInterval(_this.ospans[i].timer));
            }
        },
        mouseEvent: function () {
            var _this=this;
            this.banner.onmouseover = function (e) {
                clearInterval(_this.autoTimer);
                clearInterval(_this.ospans[_this.step].timer);
                utils.css(_this.ospans[_this.step], {background:"red",width:35});
                e= e||window.event;
                var curTar= e.target|| e.srcElement;
                if(curTar.tagName.toLowerCase()==="a"){
                    for(var i=0;i<_this.oas.length;i++){
                        _this.step=utils.index(curTar);
                        if(_this.step===i){
                            utils.css(_this.ospans[i],{width:35,background:"red"});
                            myMove(_this.bannerInner,{left:-_this.step*330},200);
                        }
                        else{
                            clearInterval(_this.ospans[i].timer);
                            utils.css(_this.ospans[i],{width:0});
                        }
                    }
                }
            };
            this.banner.onmouseout = function () {
                utils.css(_this.ospans[_this.step], {background:"red",width:0});
                _this.changeTip();
                _this.autoTimer = window.setInterval(_this.autoMove.myBind(_this), _this.interval);
            };
        },
        init: function () {
            this.changeTip();
            this.autoTimer = window.setInterval(this.autoMove.myBind(this), this.interval);
            this.mouseEvent();
        }
    };
    window.BannerL=BannerL;
}();