let button = document.getElementById('btnSubmit');

button.addEventListener('click', function () {
    if (document.location.toString() === "https://dev.akadigital.net/") {
        document.getElementById('errorMessage').innerHTML = "Phá vừa thôi, rảnh thì ra quét QR đi kìa"
        document.getElementById('errorMessage').style.display = "block"
    } else {
        user_id = new URL(document.location.toString()).searchParams.get('id');
        scanner_email = document.getElementById('email').value + document.getElementById('token').value;
        
        const getOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://dev.akadigital.net/getuser", getOptions)
        .then((response) => response.json())
        .then((result) => {
            const isValuePresent = result.received.some(item => item.owner_email === scanner_email);
            if (isValuePresent) {
                postData()
            } else {
                document.getElementById('errorMessage').innerHTML = "Hệ thống không có lỗi. Tại bạn cả thôi!"
                document.getElementById('errorMessage').style.display = "block"
            }
        })
        .catch((error) => console.error(error));
        
        async function postData() {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "data": [
                    {
                        "ID": user_id,
                        "EMAIL_ADDRESS": scanner_email
                    }
                ]
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("https://dev.akadigital.net/checksheet", requestOptions)
                .then((response) => response.json())
                .then((result_post) => {
                    if (result_post.message === 'FAIL_0' && result_post.list === "filteredArray_dif") {
                        //console.log(result)
                        document.getElementById('errorMessage').innerHTML = "Vui lòng không để trống thông tin"
                        document.getElementById('errorMessage').style.display = "block"
                    }
                    else if (result_post.message === 'FAIL_1' && result_post.list === "filteredArray_dif") {
                        //console.log(result)
                        document.getElementById('errorMessage').innerHTML = "Vui lòng nhập đúng định dạng email"
                        document.getElementById('errorMessage').style.display = "block"
                    }
                    else if (result_post.message === 'OK' && result_post.list === "filteredArray_same") {
                        //console.log(result_post)
                        window.location.href = '/detail?id=' + encodeURIComponent(result_post.received[0].user_id) + "&username=" + encodeURIComponent(result_post.received[0].username) + "&role=" + encodeURIComponent(result_post.received[0].role) + "&status=" + encodeURIComponent(result_post.received[0].status); // Redirect to the next page
                    }
                    else if (result_post.message === 'OK' && result_post.list === "filteredArray_dif") {
                        //console.log(result_post)
                        window.location.href = '/play?id=' + encodeURIComponent(result_post.received[0].user_id) + "&owner_role=" + encodeURIComponent(result_post.received[0].role) + "&owner_status=" + encodeURIComponent(result_post.received[0].status) + "&scanner_id=" + encodeURIComponent(result_post.received[0].scanner_id) + "&scanner_role=" + encodeURIComponent(result_post.received[0].scanner_role);
                    } else {
                        console.log(result_post)
                    }
                }
            ).catch((error) => console.error(error));
        }
    }
});