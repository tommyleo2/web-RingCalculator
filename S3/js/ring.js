$(function() {
    bindClick();
    $("#button").mouseleave(function() {
        init();
    });
});

function init() {
    $(".number").text("").removeClass("display");
    $('li').removeClass("grey");
    $("#info-bar p").text("");
    $("#info-bar").removeClass("activate");
}

function bindClick() {
    $(".apb").click(function() {
        for (var i = 0; i < 5; i++) {
        autoRun(i);
        }
    });
}

function autoRun(index) {
    var button = $($("li")[index]);
    var bubble = button.children("span").addClass("display").text("...");
    disable(button.siblings().andSelf());
    $.ajax({
        url: "http://localhost:3000",
        success: function(data) {
            bubble.text(data);
            enable(button.siblings());
            if (check()) {
                showAdd();
            }
        }
    });
}

function check() {
    for (var i = 0; i < $("li").length; i++) {
        if ($($("li")[i]).children("span").first().text() == "...") {
            return false;
        }
    }
    $("#info-bar").addClass("activate");
    return true;
}

function disable(target) {
    $(target).addClass("grey");
}

function enable(buttons) {
    buttons.each(function() {
        if (!$(this).children("span").hasClass("display")) {
            $(this).removeClass("grey");
        }
    });
}

function showAdd() {
    var sum = 0;
    $(".number").each(function() {
        sum += parseInt($(this).text());
    });
    $("#info-bar").removeClass("activate").children("p").text(sum);
}
