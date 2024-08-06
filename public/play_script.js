let owner_role = new URLSearchParams(window.location.search).get("owner_role")

let scanner_role = new URLSearchParams(window.location.search).get("scanner_role")

let user_id = new URL(document.location.toString()).searchParams.get('id')

window.onload = function () {
    // Cá sấu quét trúng cá sấu
    if (owner_role === "Sấu Ham Ăn" && scanner_role === "Sấu Ham Ăn") {
        document.getElementById('action').innerHTML = "Quét trùng đồng đội rồi, vui lòng chọn mục tiêu khác"
        document.getElementById('owner_role').innerHTML = owner_role;
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
    }
    // Cá sấu quét trúng thợ săn
    if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Sấu Ham Ăn") {
        document.getElementById('action').innerHTML = "Chọn hành động đối với mục tiêu:"
        document.getElementById('owner_role').innerHTML = owner_role;
    }
    // Cá sấu quét trúng dân
    if (owner_role === "Dân Lương Thiện" && scanner_role === "Sấu Ham Ăn") {
        document.getElementById('action').innerHTML = "Chọn hành động đối với mục tiêu:"
        document.getElementById('owner_role').innerHTML = owner_role;
    }
    // Thợ săn quét trúng cá sấu
    if (owner_role === "Sấu Ham Ăn" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('action').innerHTML = "Chọn hành động đối với mục tiêu:"
        document.getElementById('owner_role').innerHTML = owner_role;
    }
    // Thợ săn quét trúng thợ săn
    if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('action').innerHTML = "Chọn hành động đối với mục tiêu:"
        document.getElementById('owner_role').innerHTML = owner_role;
    }
    // Thợ săn quét trúng dân
    if (owner_role === "Dân Lương Thiện" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('action').innerHTML = "Chọn hành động đối với mục tiêu:"
        document.getElementById('owner_role').innerHTML = owner_role;
    }
    // Dân quét trúng cá sấu
    if (owner_role === "Sấu Ham Ăn" && scanner_role === "Dân Lương Thiện") {
        document.getElementById('action').innerHTML = "Kết cục cho những kẻ tò mò, chúc bạn may mắn lần sau"
        document.getElementById('owner_role').innerHTML = owner_role;
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
    }
    // Dân quét trúng thợ săn
    if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Dân Lương Thiện") {
        document.getElementById('action').innerHTML = "Chọn hành động đối với mục tiêu:"
        document.getElementById('owner_role').innerHTML = owner_role;
        document.getElementById('button-action-1').style.display = "none"
    }
    // Dân quét trúng thợ săn
    if (owner_role === "Dân Lương Thiện" && scanner_role === "Dân Lương Thiện") {
        document.getElementById('action').innerHTML = "Chọn hành động đối với mục tiêu:"
        document.getElementById('owner_role').innerHTML = owner_role;
        document.getElementById('button-action-1').style.display = "none"
    }
}

function btnAction() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "data": [
            {
                "ID": user_id
            }
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://dev.akadigital.net/updatestatus", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}