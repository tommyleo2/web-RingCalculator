$(function() {
    bindClick();
    $("#button").mouseleave(function() {
        init();
    });
});

function init() {
    $(".number").text("").removeClass("display");
    $('li').removeClass("grey").each(function() {
        this.disable = false;
    });
    $("#info-bar p").text("");
    $("#info-bar").removeClass("activate");
}

function bindClick() {
    $('li').each(function() {
        this.disable = false;
        $(this).click(function() {
            if (!this.disable) {
                disable($(this).siblings().andSelf());
                popBubble(this);
            }
        });
    });
    $('#info-bar')[0].disable = true;
    $('#info-bar').click(function() {
        if (!this.disable) {
            var sum = 0;
            $(".number").each(function() {
                sum += parseInt($(this).text());
            });
            $(this).removeClass("activate").children("p").text(sum);
            this.disable = true;
        }
    });
}

function disable(target) {
    $(target).addClass("grey").each(function() {
        this.disable = true;
    });
}

function enable(buttons) {
    buttons.each(function() {
        if (!$(this).children("span").hasClass("display")) {
            $(this).removeClass("grey")[0].disable = false;
        }
    });
}

function popBubble(button) {
    var bubble = $(button).children("span").addClass("display").text("...");
    $.ajax({
        url: "http://localhost:3000/source",
        success: function(data) {
            if (button.disable) {
                bubble.text(data);
                disable(button);
                enable($(button).siblings());
                check();
            }
        }
    });
}

function check() {
    for (var i = 0; i < $("li").length; i++) {
        if (!$("li")[i].disable) {
            return;
        }
    }
    $("#info-bar").addClass("activate")[0].disable = false;
}
