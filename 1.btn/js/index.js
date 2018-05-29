function RunImg() {

}

RunImg.prototype = {
    count: 0,
    imgurl: [],
    bigbox: null,
    boxul: null,
    imgList: null,
    numList: null,
    index: 0,
    timer: null,
    play: null,

    $:function (obj) {
        if (typeof obj === 'string') {
            if (obj.indexOf('#') >= 0) {
                obj = obj.replace('#', '');
                if (document.getElementById(obj)) {
                    return document.getElementById(obj);
                } else {
                    alert('没有容器' + obj);
                    return;
                }
            } else {
                return document.createElement(obj);
            }
        } else {
            return;
        }
    },

    createList: function (id) {
        this.count = this.count <= 5 ? this.count : 5;
        this.bigbox =  this.$(id);
        console.log(id)
        var ul, li;
        // 两个ul  一个放图片  第二个放按钮
        for (var i = 0; i < 2; i++) {
            ul = this.$('ul');
            for (var j = 1; j <= this.count; j++) {
                li = this.$('li');
                li.innerHTML =  i === 0 ? this.imgurl[j - 1] : '';
                ul.appendChild(li);
            }
            this.bigbox.appendChild(ul);
        }
        this.boxul = document.getElementsByTagName('ul');
        this.boxul[0].className = 'imgList';
        this.boxul[1].className = 'countNum';
        this.imgList = this.boxul[0].getElementsByTagName('li');
        this.numList = this.boxul[1].getElementsByTagName('li');
        this.numList[0].className = 'current';
    },
    action: function (id) {
        this.autoplay();
        this.mouseoverout(this.bigbox, this.numList);
    },

    //自动播放
    autoplay: function () {
        var $this = this;
        this.play = setInterval(function () {
            $this.index++;
            if ($this.index > $this.imgList.length -1) {
                $this.index = 0;
            }
            $this.imgShow($this.index, $this.numList, $this.imgList)
        }, 2000)
    },
    
    imgShow: function (num, numList, imgList) {
        this.index = num;
        var alpha = 0;
        for (var i = 0; i < numList.length; i++) {
            numList[i].className = '';
        }
        numList[this.index].className = 'current';
        clearInterval(this.timer);
        for (var j = 0; j < imgList.length; j++) {
            imgList[j].style.opacity = 0;
            imgList[j].style.filter = 'alpha(opacity = 0)';
        }
        var $this = this;
        // 渐变效果  从透明到出现
        this.timer = setInterval(function () {
            alpha += 2;
            if (alpha > 100) {
                alpha = 100
            }
            imgList[$this.index].style.opacity =  alpha / 100;
            imgList[$this.index].style.filter = "alpha(opacity=" + alpha + ")";
            if (alpha === 100) {
                clearInterval($this.timer)
            }
        }, 20)
    },

    mouseoverout: function (box, numlist) {
        var $this = this;
        box.onmouseover = function () {
            clearInterval($this.play);
        };
        box.onmouseout = function () {
            $this.autoplay()
        };
        for (var i = 0; i <= numlist.length -1; i++) {
            numlist[i].index = i;
            numlist[i].onmouseover = function () {
                $this.imgShow(this.index, $this.numList, $this.imgList)
            }
        }
    }

}


window.onload = function () {
    var runImg  = new RunImg();
    runImg.count = 3;
    runImg.imgurl=[
        "<img src='image/bnr-1.jpg'/>",
        "<img src='image/bnr-2.jpg'/>",
        "<img src='image/bnr-3.jpg'/>"];
    runImg.createList('#box');
    runImg.action('#box');
};