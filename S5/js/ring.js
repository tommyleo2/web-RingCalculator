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
    $(".message p").text("");
}

function bindClick() {
    $(".apb").click(function() {
        var order = generate();
        displayOrder(order);
        autoRun(order);
    });
}

function generate() {
    var order = [];
    while (order.length < 5) {
        var num = Math.round(Math.random() * 4);
        var i;
        for (i = 0; i < order.length; i++) {
            if (order[i] == num) {
                break;
            }
        }
        if (i == order.length) {
            order.push(num);
        }
    }
    return order;
}

function transform(array) {
    var result = "";
    var temp;
    for (var i = 0; i < array.length; i++) {
        switch (array[i]) {
            case 0:
            temp = 'A';
            break;
            case 1:
            temp = 'B';
            break;
            case 2:
            temp = 'C';
            break;
            case 3:
            temp = 'D';
            break;
            case 4:
            temp = 'E';
            break;
        }
        result += (temp + ", ");
    }
    return result;
}

function displayOrder(order) {
    var letters = transform(order);
    $(".message p").text("The order is " + letters);
}
/*
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
*/
function autoRun(order) {
    if (check()) {
        showAdd();
        return;
    }
    var button = $(findAble(order));
    var bubble = button.children("span").addClass("display").text("...");
    disable(button.siblings().andSelf());
    $.ajax({
        url: "http://localhost:3000",
        success: function(data) {
            if (button.hasClass("grey")) {
                bubble.text(data);
                enable(button.siblings());
                autoRun(order);
            }
        }
    });
}

function findAble(order) {
    for (var i = 0; i < 5; i++) {
        if (!$($("li")[order[i]]).hasClass("grey")) {
            return $("li")[order[i]];
        }
    }
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

function check() {
    for (var i = 0; i < $("li").length; i++) {
        if (!$($("li")[i]).hasClass("grey")) {
            return false;
        }
    }
    $("#info-bar").addClass("activate");
    return true;
}

function showAdd() {
    var sum = 0;
    $(".number").each(function() {
        sum += parseInt($(this).text());
    });
    $("#info-bar").removeClass("activate").children("p").text(sum);
}
