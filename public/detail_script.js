var username = new URL(document.location.toString()).searchParams.get('username');
var user_role = new URL(document.location.toString()).searchParams.get('role');
var user_status = new URL(document.location.toString()).searchParams.get('status');

window.onload = function () {
    if (user_status === "Đã dẹo" && user_role === "Sấu Ham Ăn") {
        document.getElementById('btnStatus').style.backgroundColor = "red"
        document.getElementById('topText').innerHTML = "Dù không thắng, thì ít nhất cũng troll!"
        document.getElementById('role').innerHTML = user_role;
        document.getElementById('username').innerHTML = username;
        document.getElementById('status').innerHTML = user_status;
        document.getElementById('imageSrc').src = "./images/6.png"
    }
    if (user_status === "Đã dẹo" && user_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('btnStatus').style.backgroundColor = "red"
        document.getElementById('topText').innerHTML = "Thắng không quan trọng, quan trọng là bạn hong có thắng."
        document.getElementById('role').innerHTML = user_role;
        document.getElementById('username').innerHTML = username;
        document.getElementById('status').innerHTML = user_status;
        document.getElementById('imageSrc').src = "./images/7.png"
    }
    if (user_status === "Đã dẹo" && user_role === "Dân Lương Thiện") {
        document.getElementById('btnStatus').style.backgroundColor = "red"
        document.getElementById('topText').innerHTML = "Chắc là lỗi hệ thống thôi."
        document.getElementById('role').innerHTML = user_role;
        document.getElementById('username').innerHTML = username;
        document.getElementById('status').innerHTML = user_status;
        document.getElementById('imageSrc').src = "./images/8.png"
    }
    if (user_status === "Còn sống" && user_role === "Sấu Ham Ăn") {
        document.getElementById('role').innerHTML = user_role;
        document.getElementById('username').innerHTML = username;
        document.getElementById('status').innerHTML = user_status;
        document.getElementById('imageSrc').src = "./images/3.png"
        document.getElementById('topText').innerHTML = "Suy nghĩ kỹ – hoặc đừng suy nghĩ!"
    }
    if (user_status === "Còn sống" && user_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('role').innerHTML = user_role;
        document.getElementById('username').innerHTML = username;
        document.getElementById('status').innerHTML = user_status;
        document.getElementById('imageSrc').src = "./images/4.png"
        document.getElementById('topText').innerHTML = "Chiến thắng nhờ may mắn, thua là tại bạn!"
    }
    if (user_status === "Còn sống" && user_role === "Dân Lương Thiện") {
        document.getElementById('role').innerHTML = user_role;
        document.getElementById('username').innerHTML = username;
        document.getElementById('status').innerHTML = user_status;
        document.getElementById('imageSrc').src = "./images/5.png"
        document.getElementById('topText').innerHTML = "Bí mật luôn vui hơn khi không ai biết!"
    }
}