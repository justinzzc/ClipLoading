/**
 * Created by zhouzechen on 16/9/14.
 */


function ClipLoading(canvas, options) {

    /**
     *
     * -----------------------------------
     *
     * bgColor: 进度背景色
     *
     * frontColor: 进度色
     *
     *------------------------------------
     *
     * scale: 放大比例 0-1之间 ,如果不指定,则会根据width或者height来计算
     * (#如果scale/width/height都不配置,则默认scale是 1 #)
     *
     * width: 用于计算比例得宽度
     *
     * height: 用于计算比例得高度
     *
     * -----------------------------------
     *
     *  #自定义切割图形#
     *
     * clipWidth:切割图形原始宽度
     *
     * clipHeight:切割图形原始高度
     *
     * onClipDraw:自定义切割图形绘制方法 参数为(canvasContext,canvasSize{width,height},clipSize{width,height})
     *
     * onPercentDraw:自定义进度绘制方法 参数为(canvasContext,canvasSize{width,height},clipSize{width,height)
     *
     * -----------------------------------
     *
     * svg:切割图形svg文件的路径 (启用该参数的时候需要引入canvg2.js)
     *
     * -----------------------------------
     *
     * initPercent: 初始化进度 0-100之间
     *
     * rate:动画速率 0-1之间
     *
     * onPercentChange: 进度变化回调方法 ,参数为(currentPercent,lastPercent)
     *
     * onComplete:进度完成100%回调方法
     *
     * -----------------------------------
     *
     *
     * @type {*|{}}
     */
    options = options || {};


    var me = this;

    var
        canvas = getCanvas(canvas),
        ctx = this.ctx = canvas.getContext("2d");

    var timer = null,
        imW = options.clipWidth || 54.5,
        imH = options.clipHeight || 40.667,
        bgColor = options.bgColor || '#fff',
        frontColor = options.frontColor || '#e7582b',
        scale = getScaleByOptions(options.scale, options.width, options.height),
        rate = measureRate(options.rate) || 1;

    var
        onPercentChange = options.onPercentChange,
        onComplete = options.onComplete,
        onClipDraw = options.onClipDraw,
        onPercentDraw = options.onPercentDraw
        ;


    var cW = imW * scale,
        cH = imH * scale;

    updateCanvasDom();

    var percent = measurePercent(options.initPercent);


    function getCanvas(canvas) {
        if (canvas.tagName.toUpperCase() == 'CANVAS') {
            return canvas;
        } else {
            var t = document.createElement('CANVAS');
            canvas.appendChild(t);
            return t;
        }


    }

    function updateCanvasDom() {
        canvas.setAttribute('width', cW + 'px');
        canvas.setAttribute('height', cH + 'px');
        canvas.style.width = cW + 'px';
        canvas.style.height = cH + 'px';
    }

    function defaultClip(ctx, canvasSize, clipSize) {
        ctx.miterLimit = 4;
        ctx.beginPath();
        ctx.moveTo(54.096, 8.567);
        ctx.bezierCurveTo(54.052, 8.205, 53.959999999999994, 8.332, 53.931999999999995, 8.408);
        ctx.bezierCurveTo(53.05499999999999, 12.523, 49.904999999999994, 21.641, 41.535999999999994, 22.72);
        ctx.bezierCurveTo(41.535999999999994, 22.72, 45.961999999999996, 19.381999999999998, 42.88699999999999, 9.934);
        ctx.bezierCurveTo(42.82099999999999, 9.805, 42.77799999999999, 9.891, 42.75399999999999, 9.984);
        ctx.bezierCurveTo(42.526999999999994, 11.443, 41.34599999999999, 17.476, 36.95899999999999, 19.547);
        ctx.bezierCurveTo(35.92599999999999, 20.13, 34.74299999999999, 20.488, 33.47599999999999, 20.546);
        ctx.bezierCurveTo(29.16999999999999, 20.739, 25.523999999999994, 17.404, 25.32999999999999, 13.099);
        ctx.bezierCurveTo(25.30699999999999, 12.564, 25.339999999999993, 12.042, 25.41999999999999, 11.534);
        ctx.bezierCurveTo(25.93199999999999, 9.029, 28.269999999999992, 6.596000000000001, 28.307999999999993, 6.541);
        ctx.bezierCurveTo(30.785999999999994, 3.3770000000000002, 30.319999999999993, 0.3200000000000003, 30.249999999999993, -0.0649999999999995);
        ctx.bezierCurveTo(30.237999999999992, -0.0869999999999995, 30.222999999999992, -0.0669999999999995, 30.214999999999993, -0.05399999999999951);
        ctx.bezierCurveTo(29.93199999999999, 0.47600000000000053, 27.30999999999999, 5.069000000000001, 19.871999999999993, 6.876);
        ctx.bezierCurveTo(13.917999999999992, 8.323, 11.640999999999993, 11.379000000000001, 11.640999999999993, 11.379000000000001);
        ctx.bezierCurveTo(11.640999999999993, 11.379000000000001, 11.662999999999993, 11.341000000000001, 11.702999999999992, 11.276000000000002);
        ctx.bezierCurveTo(11.775999999999993, 9.616000000000001, 13.244999999999992, 7.768000000000002, 14.019999999999992, 7.078000000000001);
        ctx.bezierCurveTo(14.093999999999992, 6.9700000000000015, 13.948999999999993, 7.009000000000001, 13.866999999999992, 7.037000000000001);
        ctx.bezierCurveTo(11.678, 7.907, 1.98, 12.326, 0.286, 23.854);
        ctx.bezierCurveTo(0.14799999999999996, 24.785999999999998, 0.09399999999999997, 25.743, 0.13799999999999998, 26.717);
        ctx.bezierCurveTo(0.145, 26.878999999999998, 0.16899999999999998, 27.218999999999998, 0.16899999999999998, 27.218999999999998);
        ctx.bezierCurveTo(0.5169999999999999, 31.682, 2.803, 35.559, 6.157, 38.056999999999995);
        ctx.lineTo(6.165, 38.038999999999994);
        ctx.bezierCurveTo(8.003, 39.382999999999996, 10.216000000000001, 40.236999999999995, 12.603, 40.41799999999999);
        ctx.bezierCurveTo(12.587, 40.42099999999999, 12.579, 40.42199999999999, 12.577, 40.422999999999995);
        ctx.bezierCurveTo(13.318999999999999, 40.50599999999999, 21.442, 41.276999999999994, 24.448, 33.87799999999999);
        ctx.bezierCurveTo(24.448, 33.87799999999999, 25.108, 32.523999999999994, 25.137, 30.093999999999994);
        ctx.bezierCurveTo(25.182000000000002, 26.433999999999994, 23.326, 24.285999999999994, 22.139, 23.263999999999996);
        ctx.bezierCurveTo(22.121, 23.247999999999998, 22.104, 23.233999999999995, 22.087, 23.219999999999995);
        ctx.bezierCurveTo(22.02, 23.161999999999995, 21.956, 23.109999999999996, 21.893, 23.060999999999996);
        ctx.bezierCurveTo(21.848, 23.025999999999996, 21.805, 22.990999999999996, 21.76, 22.956999999999997);
        ctx.bezierCurveTo(21.365000000000002, 22.657999999999998, 21.099, 22.517999999999997, 21.099, 22.517999999999997);
        ctx.lineTo(21.099, 22.519999999999996);
        ctx.bezierCurveTo(20.09, 21.941999999999997, 18.911, 21.631999999999994, 17.664, 21.687999999999995);
        ctx.bezierCurveTo(14.161000000000001, 21.844999999999995, 11.447000000000003, 24.812999999999995, 11.604000000000003, 28.314999999999994);
        ctx.bezierCurveTo(11.761000000000003, 31.818999999999996, 14.728000000000003, 34.532, 18.231, 34.37599999999999);
        ctx.bezierCurveTo(20.379, 34.27899999999999, 22.227, 33.12599999999999, 23.301000000000002, 31.44199999999999);
        ctx.lineTo(23.3, 31.44299999999999);
        ctx.bezierCurveTo(23.3, 31.44299999999999, 23.338, 31.39299999999999, 23.329, 31.43399999999999);
        ctx.bezierCurveTo(22.155, 34.27599999999999, 19.421, 36.33299999999999, 16.147, 36.47899999999999);
        ctx.bezierCurveTo(14.724999999999998, 36.54299999999999, 13.371999999999998, 36.236999999999995, 12.178999999999998, 35.648999999999994);
        ctx.bezierCurveTo(11.349999999999998, 35.23, 10.594999999999999, 34.68299999999999, 9.942999999999998, 34.029999999999994);
        ctx.bezierCurveTo(9.596999999999998, 33.675999999999995, 9.280999999999997, 33.291999999999994, 9.002999999999998, 32.87799999999999);
        ctx.bezierCurveTo(9.008, 32.89699999999999, 9.012999999999998, 32.91299999999999, 9.016999999999998, 32.93099999999999);
        ctx.bezierCurveTo(8.083999999999998, 31.61899999999999, 7.5029999999999974, 30.03499999999999, 7.4259999999999975, 28.30799999999999);
        ctx.bezierCurveTo(7.358999999999997, 26.79999999999999, 7.681999999999998, 25.364999999999988, 8.305999999999997, 24.099999999999987);
        ctx.bezierCurveTo(8.698999999999998, 23.293999999999986, 9.215999999999998, 22.559999999999988, 9.831999999999997, 21.92099999999999);
        ctx.bezierCurveTo(11.811999999999998, 19.77299999999999, 14.643999999999998, 18.42399999999999, 17.793999999999997, 18.42399999999999);
        ctx.bezierCurveTo(18.938999999999997, 18.42399999999999, 20.042999999999996, 18.60999999999999, 21.080999999999996, 18.94799999999999);
        ctx.bezierCurveTo(21.796999999999997, 19.16299999999999, 22.504999999999995, 19.44799999999999, 23.192999999999998, 19.81199999999999);
        ctx.bezierCurveTo(26.137999999999998, 21.37199999999999, 28.122999999999998, 24.00899999999999, 28.888999999999996, 26.926999999999992);
        ctx.bezierCurveTo(29.502999999999997, 29.119999999999994, 29.379999999999995, 31.801999999999992, 28.366999999999997, 34.43599999999999);
        ctx.bezierCurveTo(27.740999999999996, 36.06399999999999, 26.848, 37.477999999999994, 25.804999999999996, 38.60699999999999);
        ctx.bezierCurveTo(25.773999999999997, 38.66899999999999, 25.766999999999996, 38.71199999999999, 25.788999999999998, 38.739999999999995);
        ctx.bezierCurveTo(25.852999999999998, 38.824, 25.973, 38.763, 26.006999999999998, 38.73199999999999);
        ctx.bezierCurveTo(27.403, 37.425999999999995, 31.165, 34.58099999999999, 38.516, 33.12299999999999);
        ctx.bezierCurveTo(47.364, 31.36999999999999, 51.474999999999994, 25.13899999999999, 53.086, 20.75199999999999);
        ctx.bezierCurveTo(54.312, 17.44, 54.537, 13.447, 54.096, 8.567);
        ctx.closePath();
        ctx.fill();
    }

    function defaultPercentDraw(ctx, canvasSize, clipSize, percent) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

        ctx.fillStyle = frontColor;
        ctx.fillRect(0, (100 - percent) * canvasSize.height / 100, canvasSize.width, percent * canvasSize.height / 100);
    }

    function fireClip(ctx) {
        ctx.save();
        ctx.scale(scale, scale);
        (onClipDraw || defaultClip)(ctx, {width: cW, height: cH}, {width: imW, height: imH});
        ctx.restore();
    }

    function getScaleByOptions(mScale, mWidth, mHeight) {
        var scale = 1;
        if (typeof mScale == 'number') {
            scale = mScale;
        } else if (typeof mWidth == 'number') {
            scale = mWidth / imW;
        } else if (typeof mHeight == 'number') {
            scale = mHeight / imH
        }

        return scale;
    }

    function measurePercent(num) {
        if (typeof num == 'number') {
            if (num > 100) {
                return 100;
            } else if (num < 0) {
                return 0;
            } else {
                return num;
            }
        } else {
            return 0;
        }
    }

    function measureRate(num) {
        if (typeof num == 'number') {
            if (num > 1) {
                return 1;
            } else if (num <= 0) {
                return 0.1;
            } else {
                return num;
            }
        } else {
            return 1;
        }
    }


    function readSvg(src, callback) {

        var imgEL = new Image();
        imgEL.name = name;
        imgEL.onload = function (e) {
            var image = e.target;

            //reset size
            imW = image.width;
            imH = image.height;
            scale = getScaleByOptions(options.scale, options.width, options.height);
            cW = imW * scale;
            cH = imH * scale;

            updateCanvasDom();

            drawSVGImageByCanvg(image, callback);
        };
        imgEL.src = src;
    }

    function drawSVGImageByCanvg(img, callback) {
        var tempCanvas = document.createElement('canvas');
        tempCanvas.readCallback = callback;
        tempCanvas.x = 0;
        tempCanvas.y = 0;
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        tempCanvas.style.zIndex = -1;
        tempCanvas.style.visibility = 'hidden';
        document.body.appendChild(tempCanvas);

        canvg(tempCanvas, img.src, {
            ignoreMouse: true,
            ignoreAnimation: true,
            ignoreDimensions: true,
            ignoreClear: true,
            scaleWidth: img.width,
            renderCallback: function (dom) {
                tempCanvas.parentNode.removeChild(tempCanvas);
            }
        });
    }

    //apis

    this.setPercent = function (p) {
        if (typeof p == 'number') {

            var t = measurePercent(p);
            if (t == percent) {
                return;
            }
            var old = percent;

            percent = t;
            me.renderPercent();

            setTimeout(function () {
                onPercentChange && onPercentChange(percent, old);
            }, 1);

            setTimeout(function () {
                if (percent == 100) {
                    onComplete && onComplete();
                }
            }, 1);

        }
    };

    var aniTimer = null,
        aniStatus = {
            from: 0,
            tp: 0,
            active: false
        };


    this.render = function () {
        ctx.restore();
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);
        ctx.fillStyle = "#fff";
        fireClip(ctx);
        ctx.globalCompositeOperation = 'source-atop';
        me.renderPercent();

    };

    this.renderPercent = function () {
        ctx.save();

        (onPercentDraw || defaultPercentDraw)(ctx, {width: cW, height: cH}, {width: imW, height: imH}, percent);

        ctx.restore();

    };

    this.setAniPercent = function (p) {
        if (typeof p == 'number') {
            var tp = measurePercent(p);

            if (tp == percent) {
                return;
            }

            aniStatus.from = percent;
            aniStatus.to = tp;

            if (aniStatus.active)
                return;

            aniStatus.active = true;

            function doAni() {
                var delta = ( (aniStatus.to > aniStatus.from) ? 1 : -1) * rate;

                if (((percent + delta ) - aniStatus.to) * delta < 0) {
                    me.setPercent(percent + delta);
                } else {
                    me.setPercent(aniStatus.to);
                    cancelAnimationFrame(aniTimer);
                    aniStatus.active = false;
                }

                aniTimer = requestAnimationFrame(doAni);
            }

            doAni();
        }
    };

    this.getPercent = function () {
        if (aniStatus.active)
            return aniStatus.to;
        else
            return percent;
    };

    if (options.svg) {
        readSvg(options.svg, function (code) {
            //console.log(code);
            var brush = new Function('return ' + code)();
            //var brush = eval('(function (){return ' + code+'})()');
            onClipDraw = function (ctx) {
                brush.draw(ctx);
            };
            me.render();

        });
    } else {
        this.render();
    }

}

function onSVGDraw(code, canvas) {
    if (canvas.readCallback) {
        canvas.readCallback(code);
    }

}

window.onSVGDraw = onSVGDraw;

(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());