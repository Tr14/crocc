let owner_role = new URLSearchParams(window.location.search).get("owner_role")

let scanner_role = new URLSearchParams(window.location.search).get("scanner_role")

let user_id = new URL(document.location.toString()).searchParams.get('id')

let scanner_id = new URL(document.location.toString()).searchParams.get('scanner_id')

let owner_status = new URL(document.location.toString()).searchParams.get('owner_status')

let scanner_status = new URL(document.location.toString()).searchParams.get('scanner_status')

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

    // Cá sấu hẹo mà còn đòi quét ==========================================================================================> Xong
    if (scanner_role === "Sấu Ham Ăn" && scanner_status === "Đã dẹo") {
        document.getElementById('avatar').src = "./images/8.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Dẹo rồi mà còn rướn làm gì"
        document.getElementById('quoteText').style.top = "77.5%"
        document.getElementById('quoteText').style.color = "red"
    }
    // Thợ săn hẹo mà còn đòi quét =========================================================================================> Xong
    else if (scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_status === "Đã dẹo") {
        document.getElementById('imageSrc0').src = "./images/img_roll_thosan.png"
        document.getElementById('avatar').src = "./images/8.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Dẹo rồi mà còn rướn làm gì"
        document.getElementById('quoteText').style.top = "77.5%"
        document.getElementById('quoteText').style.color = "red"
    }
    // Dân hẹo mà còn đòi quét =============================================================================================> Xong
    else if (scanner_role === "Dân Lương Thiện" && scanner_status === "Đã dẹo") {
        document.getElementById('imageSrc0').src = "./images/img_roll_danlang.png"
        document.getElementById('avatar').src = "./images/8.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Dẹo rồi mà còn rướn làm gì"
        document.getElementById('quoteText').style.top = "77.5%"
        document.getElementById('quoteText').style.color = "red"
    }
    // Cá sấu quét trúng cá sấu ============================================================================================> Xong
    else if (owner_role === "Sấu Ham Ăn" && scanner_role === "Sấu Ham Ăn") {
        document.getElementById('avatar').src = "./images/16.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Cứ bình tĩnh, ai cũng rối mà!"
        document.getElementById('quoteText').style.top = "77.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Cá sấu quét trúng thợ săn còn sống ==================================================================================> Xong
    else if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Sấu Ham Ăn" && owner_status === "Còn sống") {
        document.getElementById('imageSrc0').src = "./images/img_roll_thosan.png"
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
                const isInArray = result.received.some(item => item.owner_mobile === coop_mobile && item.role === "Sấu Ham Ăn" && item.status != "Đã dẹo");
                if (isInArray) {
                    const isValuePresent = result.received.some(item => item.owner_mobile === coop_mobile && item.role === "Sấu Ham Ăn" && item.user_id != scanner_id);
                    if (isValuePresent) {
                        postData()
                        popup.style.display = 'none';
                        overlay.style.display = 'none';
                    } else {
                        document.getElementById('errorMessage').style.display = "block"
                        document.getElementById('errorMessage').style.color = "red"
                        document.getElementById('errorMessage').innerHTML = "Đừng có cheat nữa, nhập đúng thông tin nào"

                        async function getIpAddress() {
                            const response = await fetch('https://api.ipify.org?format=json');
                            const data = await response.json();
                            let ip_address = data.ip

                            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
                            let deviceInfo = {
                                type: "Unknown",
                                osVersion: "Unknown",
                                model: "Unknown"
                            };

                            // Detect iOS devices
                            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                                deviceInfo.type = "iOS";
                                const iOSMatch = userAgent.match(/OS (\d+)[._](\d+)(?:[._](\d+))?/);
                                if (iOSMatch) {
                                    deviceInfo.osVersion = `${iOSMatch[1]}.${iOSMatch[2]}.${iOSMatch[3] || 0}`;
                                }
                                // The following logic is a simple attempt to guess the device model, not very reliable
                                if (/iPhone/.test(userAgent)) {
                                    deviceInfo.model = "iPhone"; // Can be "iPhone 15" if known
                                } else if (/iPad/.test(userAgent)) {
                                    deviceInfo.model = "iPad";
                                }
                            }
                            
                            // Detect Android devices
                            else if (/android/i.test(userAgent)) {
                                deviceInfo.type = "Android";
                                const androidMatch = userAgent.match(/Android (\d+)\.(\d+)(?:\.(\d+))?/);
                                if (androidMatch) {
                                    deviceInfo.osVersion = `${androidMatch[1]}.${androidMatch[2]}.${androidMatch[3] || 0}`;
                                }
                                // Detect the model name
                                const modelMatch = userAgent.match(/\((.*?)\)/);
                                if (modelMatch) {
                                    const infoParts = modelMatch[1].split(";").map(s => s.trim());
                                    deviceInfo.model = infoParts[infoParts.length - 1];
                                }
                            }


                            const myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");

                            const message_log = "Cố tình mò thông tin cá sấu khác để lụm thợ săn"

                            const raw = JSON.stringify({
                                ip_address,
                                deviceInfo,
                                message_log
                            });

                            const requestOptions = {
                                method: "POST",
                                headers: myHeaders,
                                body: raw,
                                redirect: "follow"
                            };

                            fetch("https://dev.akadigital.net/checkdevice", requestOptions)
                            .then((response) => response.json())
                            .then((result) => {})
                            .catch((error) => console.error(error));
                        }

                        getIpAddress()
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
                } else {
                    document.getElementById('errorMessage').style.display = "block"
                    document.getElementById('errorMessage').style.color = "red"
                    document.getElementById('errorMessage').innerHTML = "Khứa kia ngủm rồi, tính cheat gì cơ"

                    async function getIpAddress() {
                        const response = await fetch('https://api.ipify.org?format=json');
                        const data = await response.json();
                        let ip_address = data.ip

                        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
                        let deviceInfo = {
                            type: "Unknown",
                            osVersion: "Unknown",
                            model: "Unknown"
                        };

                        // Detect iOS devices
                        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                            deviceInfo.type = "iOS";
                            const iOSMatch = userAgent.match(/OS (\d+)[._](\d+)(?:[._](\d+))?/);
                            if (iOSMatch) {
                                deviceInfo.osVersion = `${iOSMatch[1]}.${iOSMatch[2]}.${iOSMatch[3] || 0}`;
                            }
                            // The following logic is a simple attempt to guess the device model, not very reliable
                            if (/iPhone/.test(userAgent)) {
                                deviceInfo.model = "iPhone"; // Can be "iPhone 15" if known
                            } else if (/iPad/.test(userAgent)) {
                                deviceInfo.model = "iPad";
                            }
                        }
                        
                        // Detect Android devices
                        else if (/android/i.test(userAgent)) {
                            deviceInfo.type = "Android";
                            const androidMatch = userAgent.match(/Android (\d+)\.(\d+)(?:\.(\d+))?/);
                            if (androidMatch) {
                                deviceInfo.osVersion = `${androidMatch[1]}.${androidMatch[2]}.${androidMatch[3] || 0}`;
                            }
                            // Detect the model name
                            const modelMatch = userAgent.match(/\((.*?)\)/);
                            if (modelMatch) {
                                const infoParts = modelMatch[1].split(";").map(s => s.trim());
                                deviceInfo.model = infoParts[infoParts.length - 1];
                            }
                        }


                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");

                        const message_log = "Định cheat bằng thông tin cá sấu khác không đi chung"

                        const raw = JSON.stringify({
                            ip_address,
                            deviceInfo,
                            message_log
                        });

                        const requestOptions = {
                            method: "POST",
                            headers: myHeaders,
                            body: raw,
                            redirect: "follow"
                        };

                        fetch("https://dev.akadigital.net/checkdevice", requestOptions)
                        .then((response) => response.json())
                        .then((result) => {})
                        .catch((error) => console.error(error));
                    }

                    getIpAddress()
                }
            })
            .catch((error) => console.error(error));
        }

        btnSubmit.addEventListener('click', submitPopup);
        overlay.addEventListener('click', submitPopup);
    }
    // Cá sấu quét trúng thợ săn đã chết ===================================================================================> Xong
    else if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Sấu Ham Ăn" && owner_status === "Đã dẹo") {
        document.getElementById('imageSrc0').src = "./images/img_roll_thosan.png"
        document.getElementById('avatar').src = "./images/12.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Ghi công chứ không có ghi điểm"
        document.getElementById('quoteText').style.top = "76.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Cá sấu quét trúng dân còn sống ======================================================================================> Xong
    else if (owner_role === "Dân Lương Thiện" && scanner_role === "Sấu Ham Ăn" && owner_status === "Còn sống") {
        document.getElementById('imageSrc0').src = "./images/img_roll_danlang.png"
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
    else if (owner_role === "Dân Lương Thiện" && scanner_role === "Sấu Ham Ăn" && owner_status === "Đã dẹo") {
        document.getElementById('imageSrc0').src = "./images/img_roll_danlang.png"
        document.getElementById('avatar').src = "./images/10.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Ghi công chứ không có ghi điểm"
        document.getElementById('quoteText').style.top = "76.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Thợ săn quét trúng cá sấu còn sống ==================================================================================> Xong
    else if (owner_role === "Sấu Ham Ăn" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && owner_status === "Còn sống") {
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
    else if (owner_role === "Sấu Ham Ăn" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && owner_status === "Đã dẹo") {
        document.getElementById('avatar').src = "./images/10.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Ghi công chứ không có ghi điểm"
        document.getElementById('quoteText').style.top = "76.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Thợ săn quét trúng thợ săn ==========================================================================================> Xong
    else if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('imageSrc0').src = "./images/img_roll_thosan.png"
        document.getElementById('avatar').src = "./images/16.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Cứ bình tĩnh, ai cũng rối mà!"
        document.getElementById('quoteText').style.top = "77.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Thợ săn quét trúng dân ==============================================================================================> Xong
    else if (owner_role === "Dân Lương Thiện" && scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
        document.getElementById('imageSrc0').src = "./images/img_roll_danlang.png"
        document.getElementById('avatar').src = "./images/16.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Cứ bình tĩnh, ai cũng rối mà!"
        document.getElementById('quoteText').style.top = "76.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Dân quét trúng cá sấu còn sống ======================================================================================> Xong
    else if (owner_role === "Sấu Ham Ăn" && scanner_role === "Dân Lương Thiện" && owner_status === "Còn sống") {
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
        document.getElementById('imageSrc0').src = "./images/img_roll_danlang.png"
        document.getElementById('avatar').src = "./images/13.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Dù không thắng, thì ít nhất cũng troll!"
        document.getElementById('quoteText').style.top = "76.5%"
        document.getElementById('quoteText').style.color = "red"
    }
    // Dân quét trúng cá sấu đã chết =======================================================================================> Xong
    else if (owner_role === "Sấu Ham Ăn" && scanner_role === "Dân Lương Thiện" && owner_status === "Đã dẹo") {
        document.getElementById('avatar').src = "./images/12.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Ghi công chứ không có ghi điểm"
        document.getElementById('quoteText').style.top = "77.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Dân quét trúng thợ săn ==============================================================================================> Xong
    else if (owner_role === "Võ Tòng Lòng Vòng Bắt Sấu" && scanner_role === "Dân Lương Thiện") {
        document.getElementById('imageSrc0').src = "./images/img_roll_danlang.png"
        document.getElementById('avatar').src = "./images/15.png"
        document.getElementById('button-action-1').style.display = "none"
        document.getElementById('button-action-2').style.display = "none"
        document.getElementById('quoteText').innerHTML = "Cứ bình tĩnh, ai cũng rối mà!"
        document.getElementById('quoteText').style.top = "77.5%"
        document.getElementById('quoteText').style.color = "#04AA6D"
    }
    // Dân quét trúng dân ==================================================================================================> Xong
    else if (owner_role === "Dân Lương Thiện" && scanner_role === "Dân Lương Thiện") {
        document.getElementById('imageSrc0').src = "./images/img_roll_danlang.png"
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