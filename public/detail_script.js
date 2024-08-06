var username = new URL(document.location.toString()).searchParams.get('username');
var role = new URL(document.location.toString()).searchParams.get('role');
var status = new URL(document.location.toString()).searchParams.get('status');

window.onload = function () {
    document.getElementById('username').innerHTML = username;
    document.getElementById('role').innerHTML = role;
    document.getElementById('status').innerHTML = status;
}