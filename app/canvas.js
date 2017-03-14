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
    star_count: 2,
    init: function () {
        var me = this;
        me.canvas = $("hosisora");
        me.ctx = me.canvas.getContext("2d");
        me.width = window.innerWidth;
        me.height = window.innerHeight;
        me.canvas.width = window.innerWidth;
        me.canvas.height = window.innerHeight;
        //
        me.draw_bg();
        //anime loop
        //        me.loop();
        //        me.draw_star();
    },
    loop: function () {
        var me = hoxisora;
        me.draw_star();
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
            time = new Date().getSeconds(),
            star = [];
        for (let i = 0; i < me.star_count; i++) {
            star[i] = me.ctx.createRadialGradient(75, 75, 0, 75, 75, 10);
            star[i].addColorStop(0, 'rgba(66,232,255,1)');
            star[i].addColorStop(0.6, 'rgba(66,232,255,.6)');
            star[i].addColorStop(1, 'rgba(66,232,255,0)');

            me.ctx.fillStyle = star[i];
            me.ctx.save();
            me.ctx.translate(me.width / 2, me.height / 2);
            me.ctx.rotate(time * 6 * Math.PI / 180);
            me.ctx.restore();
            me.ctx.fillRect(0, 0, me.width, me.height);
        }

    },
}
