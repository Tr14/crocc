let owner_role = new URLSearchParams(window.location.search).get("owner_role")

let scanner_role = new URLSearchParams(window.location.search).get("scanner_role")

let user_id = new URL(document.location.toString()).searchParams.get('id')

let scanner_id = new URL(document.location.toString()).searchParams.get('scanner_id')

let owner_status = new URL(document.location.toString()).searchParams.get('owner_status')

window.onload = function () {
    // Cá sấu quét trúng cá sấu
    if (owner_role === "Sấu Ham Ăn" && scanner_role === "Sấu Ham Ăn") {
        document.getElementById('action').innerHTML = "Quét nhầm đồng đội rồi, di chuyển chỗ khác thôi"
        document.getElementById('owner_role').innerHTML = owner_role;
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
    }
    // Cá sấu quét trúng thợ săn
    if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Sấu Ham Ăn") {
        document.getElementById('action').innerHTML = "Thắng không quan trọng, quan trọng là bạn phải thắng."
        document.getElementById('owner_role').innerHTML = owner_role;
    }
    // Cá sấu quét trúng dân
    if (owner_role === "Dân Lương Thiện" && scanner_role === "Sấu Ham Ăn") {
        document.getElementById('action').innerHTML = "Suy nghĩ kỹ – hoặc đừng suy nghĩ!"
        document.getElementById('owner_role').innerHTML = owner_role;
        if (owner_status === "Đã dẹo") {
            document.getElementById('action').innerHTML = "Nhân vật này đã dẹo"
            document.getElementById('button-action-1').style.display = "none"
            document.getElementById('button-action-2').style.display = "none"
        }
    }
    // Thợ săn quét trúng cá sấu
    if (owner_role === "Sấu Ham Ăn" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('action').innerHTML = "Chiến thắng nhờ may mắn, thua là tại bạn!"
        document.getElementById('owner_role').innerHTML = owner_role;
    }
    // Thợ săn quét trúng thợ săn
    if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('action').innerHTML = "Quét nhầm đồng đội rồi, di chuyển chỗ khác thôi"
        document.getElementById('owner_role').innerHTML = owner_role;
    }
    // Thợ săn quét trúng dân
    if (owner_role === "Dân Lương Thiện" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('action').innerHTML = "Chiến thắng nhờ may mắn, thua là tại bạn!"
        document.getElementById('owner_role').innerHTML = owner_role;
    }
    // Dân quét trúng cá sấu
    if (owner_role === "Sấu Ham Ăn" && scanner_role === "Dân Lương Thiện") {
        document.getElementById('action').innerHTML = "Cái kết cho những kẻ thích tò mò là đây, bạn đã dẹo"
        document.getElementById('owner_role').innerHTML = owner_role
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "data": [
                {
                    "ID": scanner_id
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
            .then((result) => {})
            .catch((error) => console.error(error));
    }
    // Dân quét trúng thợ săn
    if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Dân Lương Thiện") {
        document.getElementById('action').innerHTML = "Bí mật luôn vui hơn khi không ai biết!"
        document.getElementById('owner_role').innerHTML = "???"
        document.getElementById('button-action-1').style.display = "none"
    }
    // Dân quét trúng dân
    if (owner_role === "Dân Lương Thiện" && scanner_role === "Dân Lương Thiện") {
        document.getElementById('action').innerHTML = "Bí mật luôn vui hơn khi không ai biết!"
        document.getElementById('owner_role').innerHTML = "???"
        document.getElementById('button-action-1').style.display = "none"
    }
}

function btnAction() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "data": [
            {
                "ID": user_id,
                "STATUS": "Đã dẹo"
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
        .then((result) => {
            document.getElementById('message').innerHTML = "Triệt tiêu đối tượng thành công"
            document.getElementById('message').style.color = "green"
            document.getElementById('message').style.display = "block"
        })
        .catch((error) => console.error(error));
}

function btnAction2() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "data": [
            {
                "ID": user_id,
                "STATUS": "Đã thả"
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
        .then((result) => {
            document.getElementById('message').innerHTML = "Đã thả đối tượng"
            document.getElementById('message').style.display = "block"
            document.getElementById('message').style.color = "red"
        })
        .catch((error) => console.error(error));
}