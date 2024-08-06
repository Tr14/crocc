var username = new URL(document.location.toString()).searchParams.get('username');
var user_role = new URL(document.location.toString()).searchParams.get('role');
var user_status = new URL(document.location.toString()).searchParams.get('status');

window.onload = function () {
    if (user_status === "Đã dẹo" && user_role === "Sấu Ham Ăn") {
        document.getElementById('status').style.color = "red"
        document.getElementById('details').innerHTML = "Dù không thắng, thì ít nhất cũng troll!"
        document.getElementById('role').innerHTML = user_role;
        document.getElementById('username').innerHTML = username;
        document.getElementById('status').innerHTML = user_status;
    }
    if (user_status === "Đã dẹo" && user_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('status').style.color = "red"
        document.getElementById('details').innerHTML = "Thắng không quan trọng, quan trọng là bạn hong có thắng."
        document.getElementById('role').innerHTML = user_role;
        document.getElementById('username').innerHTML = username;
        document.getElementById('status').innerHTML = user_status;
    }
    if (user_status === "Đã dẹo" && user_role === "Dân Lương Thiện") {
        document.getElementById('status').style.color = "red"
        document.getElementById('details').innerHTML = "Chắc là lỗi hệ thống thôi."
        document.getElementById('role').innerHTML = user_role;
        document.getElementById('username').innerHTML = username;
        document.getElementById('status').innerHTML = user_status;
    }
    else {
        document.getElementById('role').innerHTML = user_role;
        document.getElementById('username').innerHTML = username;
        document.getElementById('status').innerHTML = user_status;
    }
}