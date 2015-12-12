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
        autoRun(0);
    });
}

function autoRun(index) {
    if (index == 5) {
        showAdd();
        return;
    }
    var button = $($("li")[index]);
    var bubble = button.children("span").addClass("display").text("...");
    disable(button.siblings().andSelf());
    $.ajax({
        url: "http://localhost:3000",
        success: function(data) {
            if (button.hasClass("grey")) {
                bubble.text(data);
                enable(button.siblings());
                autoRun(++index);
            }
        }
    });
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
