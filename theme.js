var month_format = [, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var noimage = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
var jmlh = 8;
var pagenav_prev = "Previous";
var pagenav_next = "Next";
$(".allrecent .HTML .widget-content").each(function () {
    var r = $(this).find("div").attr("data-label"),
        b1 = "rec-home",
        id = $(this).parent().attr("id"),
        box = $(this).find("div").attr("id");
    if (box.match(b1)) {
        $.ajax({
            url: "/feeds/posts/default/-/" + r + "?alt=json-in-script&max-results=" + jmlh,
            type: 'get',
            dataType: "jsonp",
            success: function (c) {
                var d = "";
                var e = '<ul>';
                for (var i = 0; i < c.feed.entry.length; i++) {
                    for (var j = 0; j < c.feed.entry[i].link.length; j++) {
                        if (c.feed.entry[i].link[j].rel == "alternate") {
                            d = c.feed.entry[i].link[j].href;
                            break
                        }
                    }
                    var f = c.feed.entry[i].title.$t;
                    var g = c.feed.entry[i].published.$t,
                        year = g.substring(0, 4),
                        month = g.substring(5, 7),
                        day = g.substring(8, 10),
                        date = month_format[parseInt(month, 10)] + ' ' + day + ', ' + year;
                    var h = c.feed.entry[i].category[0].term;
                    var k = c.feed.entry[i].content.$t;
                    var l = $('<div>').html(k);
                    var m = /<\S[^>]*>/g;
                    var n = k.replace(m, "");
                    if (n.length > 90) {
                        n = '' + n.substring(0, 90) + '...'
                    }
                    if (k.indexOf("http://www.youtube.com/embed/") > -1 || k.indexOf("https://www.youtube.com/embed/") > -1) {
                        var o = c.feed.entry[i].media$thumbnail.url;
                        var p = o
                    } else if (k.indexOf("<img") > -1) {
                        var q = l.find('img:first').attr('src');
                        var p = q
                    } else {
                        var p = noimage
                    }
                    if (i == 0) {
                        e += '<div class="content-list"><div class="goom"><div class="box-thumbnail"><a class="seo-thumb" alt="' + f + '" href="' + d + '" style="background:url(' + p + ') no-repeat center center;background-size: cover" title="' + f + '"></a></div><div class="column-content"><span class="recent-date">' + date + '</span><h3 class="recent-title"><a href="' + d + '" title="' + f + '">' + f + '</a></h3><p class="recent-des">' + n + '<p></div></div></div>'
                    } else {
                        e += '<div class="content-list"><div class="goom"><div class="box-thumbnail"><a class="seo-thumb" alt="' + f + '" href="' + d + '" style="background:url(' + p + ') no-repeat center center;background-size: cover" title="' + f + '"></a></div><div class="column-content"><span class="recent-date">' + date + '</span><h3 class="recent-title"><a href="' + d + '" title="' + f + '">' + f + '</a></h3><p class="recent-des">' + n + '<p></div></div></div>'
                    }
                }
                e += '</ul>';
                $(".allrecent .HTML .widget-content").each(function () {
                    var b = $(this).parent().attr("id");
                    if (b == id) {
                        $(this).html(e);
                        $(this).parent().addClass('rec-home');
                        $(this).removeClass('widget-content').addClass('box-content');
                        $(this).find('.seo-thumb').each(function () {
                            $(this).attr('style', function (i, a) {
                                return a.replace('/default.jpg', '/mqdefault.jpg')
                            }).attr('style', function (i, a) {
                                return a.replace('s72-c', 's1600')
                            })
                        })
                    }
                })
            }
        })
    }
});
$("#related-ready").each(function () {
    var b = $(this).text();
    $.ajax({
        url: "/feeds/posts/default/-/" + b + "?alt=json-in-script&max-results=3",
        type: 'get',
        dataType: "jsonp",
        success: function (e) {
            var u = "";
            var h = '<div class="related-posts">';
            for (var i = 0; i < e.feed.entry.length; i++) {
                for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                    if (e.feed.entry[i].link[j].rel == "alternate") {
                        u = e.feed.entry[i].link[j].href;
                        break
                    }
                }
                var g = e.feed.entry[i].title.$t;
                var s = e.feed.entry[i].category[0].term;
                var d = e.feed.entry[i].published.$t,
                    v = d.substring(0, 4),
                    w = d.substring(5, 7),
                    f = d.substring(8, 10),
                    r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + v;
                var c = e.feed.entry[i].content.$t;
                var b = $('<div>').html(c);
                var m = /<\S[^>]*>/g;
                var n = c.replace(m, "");
                if (n.length > 50) {
                    n = '' + n.substring(0, 50) + '...'
                }
                if (c.indexOf("//www.youtube.com/embed/") > -1) {
                    var p = e.feed.entry[i].media$thumbnail.url;
                    var k = p
                } else if (c.indexOf("<img") > -1) {
                    var q = b.find('img:first').attr('src');
                    var k = q
                } else {
                    var k = noimage
                }
                h += '<li class="related-item"><div class="related-thumb"><a alt="' + g + '" class="related-img" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover" title="' + g + '"></a></div><div class="related-content"><span class="recent-date">' + r + '</span><h3><a href="' + u + '" title="' + g + '">' + g + '</a></h3><p class="recent-des">' + n + '<p></div></li>'
            }
            h += '</div><div class="clear"/>';
            $("#related-ready").html(h);
            $('.related-img').each(function () {
                $(this).attr('style', function (i, a) {
                    return a.replace('/default.jpg', '/hqdefault.jpg')
                }).attr('style', function (i, a) {
                    return a.replace('s72-c', 's1600')
                })
            })
        }
    })
});
$(function () {
var month_format = [, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var noimage = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png";
var jmlh = 8;
var pagenav_prev = "Previous";
var pagenav_next = "Next";
$(function () {
    var e = $(document).scrollTop(),
        o = $(".header-fixed").outerHeight();
    $(window).scroll(function () {
        var s = $(document).scrollTop();
        $(document).scrollTop() >= 50 ? $(".header-fixed").css("position", "sticky") : $(".header-fixed").css("position", "sticky"), s > o ? $(".header-fixed").addClass("scroll") : $(".header-fixed").removeClass("scroll"), s > e ? $(".header-fixed").removeClass("no-scroll") : $(".header-fixed").addClass("no-scroll"), e = $(document).scrollTop()
    })
});
$(".allrecent .HTML .widget-content").each(function () {
    var r = $(this).find("div").attr("data-label"),
        b1 = "rec-home",
        id = $(this).parent().attr("id"),
        box = $(this).find("div").attr("id");
    if (box.match(b1)) {
        $.ajax({
            url: "/feeds/posts/default/-/" + r + "?alt=json-in-script&max-results=" + jmlh,
            type: 'get',
            dataType: "jsonp",
            success: function (c) {
                var d = "";
                var e = '<ul>';
                for (var i = 0; i < c.feed.entry.length; i++) {
                    for (var j = 0; j < c.feed.entry[i].link.length; j++) {
                        if (c.feed.entry[i].link[j].rel == "alternate") {
                            d = c.feed.entry[i].link[j].href;
                            break
                        }
                    }
                    var f = c.feed.entry[i].title.$t;
                    var g = c.feed.entry[i].published.$t,
                        year = g.substring(0, 4),
                        month = g.substring(5, 7),
                        day = g.substring(8, 10),
                        date = month_format[parseInt(month, 10)] + ' ' + day + ', ' + year;
                    var h = c.feed.entry[i].category[0].term;
                    var k = c.feed.entry[i].content.$t;
                    var l = $('<div>').html(k);
                    var m = /<\S[^>]*>/g;
                    var n = k.replace(m, "");
                    if (n.length > 90) {
                        n = '' + n.substring(0, 90) + '...'
                    }
                    if (k.indexOf("http://www.youtube.com/embed/") > -1 || k.indexOf("https://www.youtube.com/embed/") > -1) {
                        var o = c.feed.entry[i].media$thumbnail.url;
                        var p = o
                    } else if (k.indexOf("<img") > -1) {
                        var q = l.find('img:first').attr('src');
                        var p = q
                    } else {
                        var p = noimage
                    }
                    if (i == 0) {
                        e += '<div class="content-list"><div class="goom"><div class="box-thumbnail"><a class="seo-thumb" alt="' + f + '" href="' + d + '" style="background:url(' + p + ') no-repeat center center;background-size: cover" title="' + f + '"></a></div><div class="column-content"><span class="recent-date">' + date + '</span><h3 class="recent-title"><a href="' + d + '" title="' + f + '">' + f + '</a></h3><p class="recent-des">' + n + '<p></div></div></div>'
                    } else {
                        e += '<div class="content-list"><div class="goom"><div class="box-thumbnail"><a class="seo-thumb" alt="' + f + '" href="' + d + '" style="background:url(' + p + ') no-repeat center center;background-size: cover" title="' + f + '"></a></div><div class="column-content"><span class="recent-date">' + date + '</span><h3 class="recent-title"><a href="' + d + '" title="' + f + '">' + f + '</a></h3><p class="recent-des">' + n + '<p></div></div></div>'
                    }
                }
                e += '</ul>';
                $(".allrecent .HTML .widget-content").each(function () {
                    var b = $(this).parent().attr("id");
                    if (b == id) {
                        $(this).html(e);
                        $(this).parent().addClass('rec-home');
                        $(this).removeClass('widget-content').addClass('box-content');
                        $(this).find('.seo-thumb').each(function () {
                            $(this).attr('style', function (i, a) {
                                return a.replace('/default.jpg', '/mqdefault.jpg')
                            }).attr('style', function (i, a) {
                                return a.replace('s72-c', 's1600')
                            })
                        })
                    }
                })
            }
        })
    }
});
$("#related-ready").each(function () {
    var b = $(this).text();
    $.ajax({
        url: "/feeds/posts/default/-/" + b + "?alt=json-in-script&max-results=3",
        type: 'get',
        dataType: "jsonp",
        success: function (e) {
            var u = "";
            var h = '<div class="related-posts">';
            for (var i = 0; i < e.feed.entry.length; i++) {
                for (var j = 0; j < e.feed.entry[i].link.length; j++) {
                    if (e.feed.entry[i].link[j].rel == "alternate") {
                        u = e.feed.entry[i].link[j].href;
                        break
                    }
                }
                var g = e.feed.entry[i].title.$t;
                var s = e.feed.entry[i].category[0].term;
                var d = e.feed.entry[i].published.$t,
                    v = d.substring(0, 4),
                    w = d.substring(5, 7),
                    f = d.substring(8, 10),
                    r = month_format[parseInt(w, 10)] + ' ' + f + ', ' + v;
                var c = e.feed.entry[i].content.$t;
                var b = $('<div>').html(c);
                var m = /<\S[^>]*>/g;
                var n = c.replace(m, "");
                if (n.length > 50) {
                    n = '' + n.substring(0, 50) + '...'
                }
                if (c.indexOf("//www.youtube.com/embed/") > -1) {
                    var p = e.feed.entry[i].media$thumbnail.url;
                    var k = p
                } else if (c.indexOf("<img") > -1) {
                    var q = b.find('img:first').attr('src');
                    var k = q
                } else {
                    var k = noimage
                }
                h += '<li class="related-item"><div class="related-thumb"><a alt="' + g + '" class="related-img" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover" title="' + g + '"></a></div><div class="related-content"><span class="recent-date">' + r + '</span><h3><a href="' + u + '" title="' + g + '">' + g + '</a></h3><p class="recent-des">' + n + '<p></div></li>'
            }
            h += '</div><div class="clear"/>';
            $("#related-ready").html(h);
            $('.related-img').each(function () {
                $(this).attr('style', function (i, a) {
                    return a.replace('/default.jpg', '/hqdefault.jpg')
                }).attr('style', function (i, a) {
                    return a.replace('s72-c', 's1600')
                })
            })
        }
    })
});
$(function () {
    $('a[href="#searchfs"]').on("click", function (e) {
        e.preventDefault(), $("#searchfs").addClass("open"), $('#searchfs > form > input[type="search"]').focus()
    }), $("#searchfs, #searchfs button.close").on("click keyup", function (e) {
        e.target != this && "close" != e.target.className && 27 != e.keyCode || $(this).removeClass("open")
    })
});
! function (s) {
    s.fn.menumaker = function (n) {
        var e = s(this),
            o = s.extend({
                format: "dropdown",
                sticky: !1
            }, n);
        return this.each(function () {
            s(this).find(".btn-css").on("click", function () {
                s(this).toggleClass("menu-opened");
                var n = s(this).next("ul");
                n.hasClass("open") ? n.slideToggle(150).removeClass("open") : (n.slideToggle(150).addClass("open"), "dropdown" === o.format && n.find("ul").show())
            }), e.find("li ul").parent().addClass("has-sub"), multiTg = function () {
                e.find(".has-sub").prepend('<span class="submenu-button"></span>'), e.find(".submenu-button").on("click", function () {
                    s(this).toggleClass("submenu-opened"), s(this).siblings("ul").hasClass("open") ? s(this).siblings("ul").removeClass("open").slideToggle(150) : s(this).siblings("ul").addClass("open").slideToggle(150)
                })
            }, "multitoggle" === o.format ? multiTg() : e.addClass("dropdown"), !0 === o.sticky && e.css("position", "fixed")
        })
    }
}(jQuery),
function (s) {
    s(document).ready(function () {
        s("#cssmenu").menumaker({
            format: "multitoggle"
        })
    })
}(jQuery);

function scrollToTop() {
    verticalOffset = "undefined" != typeof verticalOffset ? verticalOffset : 0, element = $("body"), offset = element.offset(), offsetTop = offset.top, $("html, body").animate({
        scrollTop: offsetTop
    }, 600, "linear")
}
$(function () {
    $(document).on("scroll", function () {
        $(window).scrollTop() > 100 ? $(".backtop").addClass("show") : $(".backtop").removeClass("show")
    }), $(".backtop").on("click", scrollToTop)
});
var postnavPrevText = "Previous",
    postnavNextText = "Next",
    navPrevMsg = "You are seeing the Last Post",
    navNextMsg = "You are seeing the Latest Post";
$(document).ready(function (t) {
    t(".post-nav").each(function () {
        t(".prev .nav-inner span").text(postnavPrevText), t(".prev .nav-inner p").text(navPrevMsg), t(".next .nav-inner span").text(postnavNextText), t(".next .nav-inner p").text(navNextMsg);
        var e = t("a.prev-post").attr("href"),
            n = t("a.next-post").attr("href");
        t.ajax({
            url: e,
            type: "get",
            success: function (e) {
                var n = t(e).find(".post h1.post-title").text(),
                    s = postnavPrevText,
                    a = "";
                t(e).find(".post-body img:first").attr("src");
                a += "<div class='nav-content'><span>" + s + "</span><p>" + n + "</p></div>", t("a.prev-post").html(a)
            }
        }), t.ajax({
            url: n,
            type: "get",
            success: function (e) {
                var n = t(e).find(".post h1.post-title").text(),
                    s = postnavNextText,
                    a = "";
                t(e).find(".post-body img:first").attr("src");
                a += "<div class='nav-content'><span>" + s + "</span><p>" + n + "</p></div>", t("a.next-post").html(a)
            }
        })
    })
});
jQuery(document).ready(function (e) {
    e(".alert-del-btn").click(function () {
        e(this).parents('div[class^="alert-message"]').fadeOut(500)
    })
});
$(function () {
    $('.box-accordion').each(function () {
        $('div', this).hide();
        $(this).find('span').first().addClass('active');
        $('span.active', this).next('div').slideDown();
        var a = $(this);
        $('span', this).click(function () {
            $('div', a).slideUp();
            $('span', a).removeClass('active');
            $(this).addClass('active');
            $(this).next('div').slideDown()
        })
    });
    $('.box-tabs').each(function () {
        var a = $(this),
            b = $('.box-btn', a),
            c = $('.box-tab-content', a);
        c.children('div').hide();
        c.children('div').first().fadeIn();
        b.children('span').first().addClass('active');
        b.children('span').click(function () {
            var d = $(this).index();
            b.children('span').removeClass('active');
            $(this).addClass('active');
            c.children('div').each(function () {
                if ($(this).index() == d) {
                    $(this).slideDown()
                } else {
                    $(this).slideUp()
                }
            })
        })
    })
});/   $('a[href="#searchfs"]').on("click", function (e) {
        e.preventDefault(), $("#searchfs").addClass("open"), $('#searchfs > form > input[type="search"]').focus()
    }), $("#searchfs, #searchfs button.close").on("click keyup", function (e) {
        e.target != this && "close" != e.target.className && 27 != e.keyCode || $(this).removeClass("open")
    })
});
! function (s) {
    s.fn.menumaker = function (n) {
        var e = s(this),
            o = s.extend({
                format: "dropdown",
                sticky: !1
            }, n);
        return this.each(function () {
            s(this).find(".btn-css").on("click", function () {
                s(this).toggleClass("menu-opened");
                var n = s(this).next("ul");
                n.hasClass("open") ? n.slideToggle(150).removeClass("open") : (n.slideToggle(150).addClass("open"), "dropdown" === o.format && n.find("ul").show())
            }), e.find("li ul").parent().addClass("has-sub"), multiTg = function () {
                e.find(".has-sub").prepend('<span class="submenu-button"></span>'), e.find(".submenu-button").on("click", function () {
                    s(this).toggleClass("submenu-opened"), s(this).siblings("ul").hasClass("open") ? s(this).siblings("ul").removeClass("open").slideToggle(150) : s(this).siblings("ul").addClass("open").slideToggle(150)
                })
            }, "multitoggle" === o.format ? multiTg() : e.addClass("dropdown"), !0 === o.sticky && e.css("position", "fixed")
        })
    }
}(jQuery),
function (s) {
    s(document).ready(function () {
        s("#cssmenu").menumaker({
            format: "multitoggle"
        })
    })
}(jQuery);

function scrollToTop() {
    verticalOffset = "undefined" != typeof verticalOffset ? verticalOffset : 0, element = $("body"), offset = element.offset(), offsetTop = offset.top, $("html, body").animate({
        scrollTop: offsetTop
    }, 600, "linear")
}
$(function () {
    $(document).on("scroll", function () {
        $(window).scrollTop() > 100 ? $(".backtop").addClass("show") : $(".backtop").removeClass("show")
    }), $(".backtop").on("click", scrollToTop)
});
var postnavPrevText = "Previous",
    postnavNextText = "Next",
    navPrevMsg = "You are seeing the Last Post",
    navNextMsg = "You are seeing the Latest Post";
$(document).ready(function (t) {
    t(".post-nav").each(function () {
        t(".prev .nav-inner span").text(postnavPrevText), t(".prev .nav-inner p").text(navPrevMsg), t(".next .nav-inner span").text(postnavNextText), t(".next .nav-inner p").text(navNextMsg);
        var e = t("a.prev-post").attr("href"),
            n = t("a.next-post").attr("href");
        t.ajax({
            url: e,
            type: "get",
            success: function (e) {
                var n = t(e).find(".post h1.post-title").text(),
                    s = postnavPrevText,
                    a = "";
                t(e).find(".post-body img:first").attr("src");
                a += "<div class='nav-content'><span>" + s + "</span><p>" + n + "</p></div>", t("a.prev-post").html(a)
            }
        }), t.ajax({
            url: n,
            type: "get",
            success: function (e) {
                var n = t(e).find(".post h1.post-title").text(),
                    s = postnavNextText,
                    a = "";
                t(e).find(".post-body img:first").attr("src");
                a += "<div class='nav-content'><span>" + s + "</span><p>" + n + "</p></div>", t("a.next-post").html(a)
            }
        })
    })
});
jQuery(document).ready(function (e) {
    e(".alert-del-btn").click(function () {
        e(this).parents('div[class^="alert-message"]').fadeOut(500)
    })
});
$(function () {
    $('.box-accordion').each(function () {
        $('div', this).hide();
        $(this).find('span').first().addClass('active');
        $('span.active', this).next('div').slideDown();
        var a = $(this);
        $('span', this).click(function () {
            $('div', a).slideUp();
            $('span', a).removeClass('active');
            $(this).addClass('active');
            $(this).next('div').slideDown()
        })
    });
    $('.box-tabs').each(function () {
        var a = $(this),
            b = $('.box-btn', a),
            c = $('.box-tab-content', a);
        c.children('div').hide();
        c.children('div').first().fadeIn();
        b.children('span').first().addClass('active');
        b.children('span').click(function () {
            var d = $(this).index();
            b.children('span').removeClass('active');
            $(this).addClass('active');
            c.children('div').each(function () {
                if ($(this).index() == d) {
                    $(this).slideDown()
                } else {
                    $(this).slideUp()
                }
            })
        })
    })
});