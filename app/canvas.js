window.onload = function () {
    hoxisora.init()
}

function $(e) {
    return document.getElementById(e);

}
var hoxisora = {
    canvas: {},
    ctx: {},
    width: {},
    height: {},
    rAF: {},
    //star
    star_count: 100,
    star_maxR: 2.2,
    star_speed: 200,
    stars: [],
    //meteor
    meteor_speed: 1,
    meteor_frame: 0,
    time: new Date(),
    init: function () {
        var me = this;
        me.canvas = $("hosisora");
        me.ctx = me.canvas.getContext("2d");
        me.width = window.innerWidth;
        me.height = window.innerHeight;
        me.canvas.width = window.innerWidth;
        me.canvas.height = window.innerHeight;
        me.new_star();

        //anime loop
        me.loop();
        //        me.draw_bg();
        //        var meteor = me.new_meteor();
        //        me.draw_meteor(meteor);
    },
    new_star: function () {
        var me = this;
        for (let i = 0; i < me.star_count; i++) {
            var a = {};
            a.x = Math.floor(Math.random() * me.height) - (me.height - me.width) / 2;
            a.y = Math.floor(Math.random() * me.height);
            a.r = Math.floor(Math.random() * me.star_maxR);
            a.speed = Math.floor(me.star_speed + me.star_speed * Math.random());
            //            console.log(a.speed)
            me.stars.push(a);
        }
    },
    new_meteor: function () {
        var me = this,
            meteor = {};
        meteor.x = 100 + (me.width - 20) * Math.random();
        meteor.y = -80 + (me.height + 80) * Math.random();
        return meteor;
    },
    loop: function () {
        var me = hoxisora;
        me.time = new Date();
        me.draw_bg();

        //        me.draw_star();

        // 随机触发流星
        let i = Math.random();
        if (i > 0.9) {
            var meteor = me.new_meteor();
            me.draw_meteor(meteor);
        }

        me.rAF = window.requestAnimationFrame(me.loop);
    },
    draw_bg: function () {
        var me = this,
            lineargradient = me.ctx.createLinearGradient(0, 0, 0, me.height);
        lineargradient.addColorStop(0, '#470F71');
        lineargradient.addColorStop(1, '#2C63D8');
        me.ctx.fillStyle = lineargradient;
        me.ctx.fillRect(0, 0, me.width, me.height);
    },
    draw_star: function () {
        var me = this,
            stars_ = [];
        for (let i = 0; i < me.star_count; i++) {
            me.ctx.save();
            me.ctx.translate(me.width / 2, me.height / 2);
            let s0 = 2 * Math.PI / me.stars[i].speed * 60 * 60 * me.time.getHours();
            let s1 = 2 * Math.PI / me.stars[i].speed * 60 * me.time.getMinutes();
            let s2 = 2 * Math.PI / me.stars[i].speed * me.time.getSeconds();
            let s3 = 2 * Math.PI / (me.stars[i].speed * 1000) * me.time.getMilliseconds()
            me.ctx.rotate(s0 + s1 + s2 + s3);
            me.ctx.translate(-(me.width / 2), -(me.height / 2));
            stars_[i] = me.ctx.createRadialGradient(me.stars[i].x, me.stars[i].y, 0, me.stars[i].x, me.stars[i].y, me.stars[i].r);
            stars_[i].addColorStop(0, 'rgba(66,232,255,1)');
            stars_[i].addColorStop(0.5, 'rgba(66,232,255,.5)');
            stars_[i].addColorStop(1, 'rgba(66,232,255,0)');

            me.ctx.fillStyle = stars_[i];


            me.ctx.fillRect((me.width - me.height) / 2, 0, me.height, me.height);
            me.ctx.restore();
        }

    },
    draw_meteor: function (meteor) {
        var me = this,
            meteor_;
        me.ctx.save();
        meteor_ = me.ctx.createLinearGradient(0, 0, 0, 100); //长100的正方形渐变
        meteor_.addColorStop(0, 'rgba(48,35,174,.3)');
        meteor_.addColorStop(1, 'rgba(200,109,215,.3)');

        let s = me.time.getSeconds()
        me.ctx.translate(meteor.x - s, meteor.y + s);

        me.ctx.rotate(Math.PI / 4)
        me.ctx.fillStyle = meteor_;
        me.ctx.fillRect(0, 0, 5, 100); //只显示宽10，长100的界面
        me.ctx.restore();

        me.meteor_frame = (me.meteor_frame + 1) % 50000000;
    },
}
