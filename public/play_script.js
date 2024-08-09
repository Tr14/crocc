let owner_role = new URLSearchParams(window.location.search).get("owner_role")

let scanner_role = new URLSearchParams(window.location.search).get("scanner_role")

let user_id = new URL(document.location.toString()).searchParams.get('id')

let scanner_id = new URL(document.location.toString()).searchParams.get('scanner_id')

let owner_status = new URL(document.location.toString()).searchParams.get('owner_status')

window.onload = function () {
    var isButtonHidden = localStorage.getItem('status');
    if (isButtonHidden === 'dead') {
        document.getElementById('button-action-1').style.display = 'none';
        document.getElementById('button-action-2').style.display = 'none';
    }
    let button1 = document.getElementById('button-action-1');

    let button2 = document.getElementById('button-action-2');

    let popup = document.getElementById('myPopup');
    let overlay = document.getElementById('popupOverlay');
    let btnSubmit = document.getElementById('btnSubmit');

    // Không click button trong 1' thì ngủm
    let button1Clicked = false
    let button2Clicked = false

    // Cá sấu quét trúng cá sấu ============================================================================================> Xong
    if (owner_role === "Sấu Ham Ăn" && scanner_role === "Sấu Ham Ăn") {
        document.getElementById('avatar').src = "./images/16.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Cứ bình tĩnh, ai cũng rối mà!"
        document.getElementById('quoteText').style.top = "77.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Cá sấu quét trúng thợ săn còn sống ==================================================================================> Xong
    if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Sấu Ham Ăn" && owner_status === "Còn sống") {
        document.getElementById('imageSrc0').style.paddingTop = 0
        document.getElementById('avatar').src = "./images/11.png"
        document.getElementById('quoteText').innerHTML = "Thắng không quan trọng, quan trọng là bạn phải thắng."
        document.getElementById('imageSrc1').src = "./images/btn_chay.png"
        document.getElementById('imageSrc2').src = "./images/btn_call.png"

        function handleNotClicked() {
            if (!button1Clicked || !button2Clicked) {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    "data": [
                        {
                            "ID": scanner_id,
                            "STATUS": "Đã dẹo",
                            "DESC": "Suy nghĩ quá lâu, cho 1 vé chim cook"
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
                    document.getElementById('quoteText').innerHTML = "Suy nghĩ quá lâu, cho 1 vé chim cook nhé"
                    document.getElementById('quoteText').style.color = "red"
                    document.getElementById('button-action-1').style.display = "none"
                    document.getElementById('button-action-2').style.display = "none"
                    localStorage.setItem('status', 'dead');
                })
                .catch((error) => console.error(error));
            }
        }

        const timeoutId = setTimeout(handleNotClicked, 60000);

        button1.addEventListener('click', function () {
            button1Clicked = true;
            clearTimeout(timeoutId);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "data": [
                    {
                        "ID": scanner_id,
                        "STATUS": "Đã dẹo",
                        "DESC": "Đi 1 mình mà đòi lụm thợ săn"
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
                document.getElementById('quoteText').innerHTML = "Đi 1 mình mà dám quét thợ săn hả, 1 vé chim cook"
                document.getElementById('quoteText').style.color = "red"
                document.getElementById('button-action-1').style.display = "none"
                document.getElementById('button-action-2').style.display = "none"
                localStorage.setItem('status', 'dead');
            })
            .catch((error) => console.error(error));
        })

        button2.addEventListener('click', showPopup);

        function showPopup() {
            button2Clicked = true;
            clearTimeout(timeoutId);
            popup.style.display = 'block';
            overlay.style.display = 'block';
        }

        function submitPopup() {
            let mobile = document.getElementById('mobile').value
            if (mobile.startsWith('0')) {
                mobile = '84' + mobile.slice(1)
            }
            let coop_mobile = mobile + document.getElementById('token').value;

            const getCrocc = {
                method: "GET",
                redirect: "follow"
            };

            fetch("https://dev.akadigital.net/getcrocc", getCrocc)
            .then((response) => response.json())
            .then((result) => {
                const getScannerMobile = result.received.filter(obj => obj.user_id === scanner_id);
                const isValuePresent = result.received.some(item => item.owner_mobile === coop_mobile && item.role === "Sấu Ham Ăn" && item.user_id != scanner_id);
                if (isValuePresent) {
                    postData()
                    popup.style.display = 'none';
                    overlay.style.display = 'none';
                } else {
                    document.getElementById('errorMessage').style.display = "block"
                    document.getElementById('errorMessage').style.color = "red"
                    document.getElementById('errorMessage').innerHTML = "Đừng có cheat nữa, nhập đúng thông tin nào"
                }

                async function postData() {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    const raw = JSON.stringify({
                        "data": [
                            {
                                "ID": user_id,
                                "STATUS": "Đã dẹo",
                                "SCANNER_MOBILE": getScannerMobile[0].owner_mobile,
                                "COOP_MOBILE": coop_mobile
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
                        document.getElementById('quoteText').innerHTML = "Tiêu diệt mục tiêu thành công"
                    })
                    .catch((error) => console.error(error));
                }
            })
            .catch((error) => console.error(error));
        }

        btnSubmit.addEventListener('click', submitPopup);
        overlay.addEventListener('click', submitPopup);
    }
    // Cá sấu quét trúng thợ săn đã chết ===================================================================================> Xong
    if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Sấu Ham Ăn" && owner_status === "Đã dẹo") {
        document.getElementById('avatar').src = "./images/12.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Ghi công chứ không có ghi điểm"
        document.getElementById('quoteText').style.top = "76.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Cá sấu quét trúng dân còn sống ======================================================================================> Xong
    if (owner_role === "Dân Lương Thiện" && scanner_role === "Sấu Ham Ăn" && owner_status === "Còn sống") {
        document.getElementById('avatar').src = "./images/9.png"
        document.getElementById('imageSrc1').style.maxWidth = "40%"
        document.getElementById('imageSrc2').style.top = "89%"
        document.getElementById('imageSrc2').style.maxWidth = "47%"
        document.getElementById('imageSrc2').style.left = "50%"
        document.getElementById('quoteText').innerHTML = "Thắng không quan trọng, quan trọng là bạn phải thắng."
        document.getElementById('quoteText').style.top = "76.5%";

        button1.addEventListener('click', function() {
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
                document.getElementById('quoteText').innerHTML = "Tiêu diệt mục tiêu thành công"
                document.getElementById('quoteText').style.color = "#04AA6D"
            })
            .catch((error) => console.error(error));
        })

        button2.addEventListener('click', function() {
            const getCrocc = {
                method: "GET",
                redirect: "follow"
            };

            fetch("https://dev.akadigital.net/getcrocc", getCrocc)
            .then((response) => response.json())
            .then((result) => {
                const getScannerMobile = result.received.filter(obj => obj.user_id === scanner_id);
                    
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    "data": [
                        {
                            "ID": user_id,
                            "STATUS": "Đã thả",
                            "SCANNER_MOBILE": getScannerMobile[0].owner_mobile,
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
                    document.getElementById('quoteText').innerHTML = "Lựa chọn juan chưa? Không có quay xe nhé"
                    document.getElementById('quoteText').style.color = "red"
                })
                .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
        })
    }
    // Cá sấu quét trúng dân đã chết =======================================================================================> Xong
    if (owner_role === "Dân Lương Thiện" && scanner_role === "Sấu Ham Ăn" && owner_status === "Đã dẹo") {
        document.getElementById('avatar').src = "./images/10.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Ghi công chứ không có ghi điểm"
        document.getElementById('quoteText').style.top = "76.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Thợ săn quét trúng cá sấu còn sống ==================================================================================> Xong
    if (owner_role === "Sấu Ham Ăn" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && owner_status === "Còn sống") {
        document.getElementById('avatar').src = "./images/9.png"
        document.getElementById('imageSrc1').style.maxWidth = "40%"
        document.getElementById('imageSrc2').style.top = "89%"
        document.getElementById('imageSrc2').style.maxWidth = "47%"
        document.getElementById('imageSrc2').style.left = "50%"
        document.getElementById('quoteText').innerHTML = "Thắng không quan trọng, quan trọng là bạn phải thắng."
        document.getElementById('quoteText').style.top = "76.5%";

        button1.addEventListener('click', function() {
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
                document.getElementById('quoteText').innerHTML = "Tiêu diệt mục tiêu thành công"
                document.getElementById('quoteText').style.color = "#04AA6D"
            })
            .catch((error) => console.error(error));
        })

        button2.addEventListener('click', function() {
            const getHunter = {
                method: "GET",
                redirect: "follow"
            };

            fetch("https://dev.akadigital.net/gethunter", getHunter)
            .then((response) => response.json())
            .then((result) => {
                const getScannerMobile = result.received.filter(obj => obj.user_id === scanner_id);
                    
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    "data": [
                        {
                            "ID": user_id,
                            "STATUS": "Đã thả",
                            "SCANNER_MOBILE": getScannerMobile[0].owner_mobile
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
                    document.getElementById('quoteText').innerHTML = "Lựa chọn juan chưa? Không có quay xe nhé"
                    document.getElementById('quoteText').style.color = "red"
                })
                .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
        })
    }
    // Thợ săn quét trúng cá sấu đã chết ===================================================================================> Xong
    if (owner_role === "Sấu Ham Ăn" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && owner_status === "Đã dẹo") {
        document.getElementById('avatar').src = "./images/10.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Ghi công chứ không có ghi điểm"
        document.getElementById('quoteText').style.top = "76.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Thợ săn quét trúng thợ săn ==========================================================================================> Xong
    if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('avatar').src = "./images/16.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Cứ bình tĩnh, ai cũng rối mà!"
        document.getElementById('quoteText').style.top = "77.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Thợ săn quét trúng dân ==============================================================================================> Xong
    if (owner_role === "Dân Lương Thiện" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('avatar').src = "./images/16.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Cứ bình tĩnh, ai cũng rối mà!"
        document.getElementById('quoteText').style.top = "76.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Dân quét trúng cá sấu còn sống ======================================================================================> Xong
    if (owner_role === "Sấu Ham Ăn" && scanner_role === "Dân Lương Thiện" && owner_status === "Còn sống") {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "data": [
                {
                    "ID": scanner_id,
                    "STATUS": "Đã dẹo",
                    "DESC": "Tự chui vào rọ"
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
        document.getElementById('avatar').src = "./images/13.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Dù không thắng, thì ít nhất cũng troll!"
        document.getElementById('quoteText').style.top = "76.5%"
        document.getElementById('quoteText').style.color = "red"
    }
    // Dân quét trúng cá sấu đã chết =======================================================================================> Xong
    if (owner_role === "Sấu Ham Ăn" && scanner_role === "Dân Lương Thiện" && owner_status === "Đã dẹo") {
        document.getElementById('avatar').src = "./images/12.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Ghi công chứ không có ghi điểm"
        document.getElementById('quoteText').style.top = "77.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Dân quét trúng thợ săn ==============================================================================================> Xong
    if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Dân Lương Thiện") {
        document.getElementById('avatar').src = "./images/15.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Cứ bình tĩnh, ai cũng rối mà!"
        document.getElementById('quoteText').style.top = "77.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Dân quét trúng dân ==================================================================================================> Xong
    if (owner_role === "Dân Lương Thiện" && scanner_role === "Dân Lương Thiện") {
        document.getElementById('avatar').src = "./images/14.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Đoàn kết, hay là tự lo đi!"
        document.getElementById('quoteText').style.top = "77.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
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
            document.getElementById('message').style.color = "#ffffff"
            document.getElementById('fixed-height').style.backgroundColor = "rgba(255, 0, 0, 0.5)"
        })
        .catch((error) => console.error(error));
}