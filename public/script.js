let button = document.getElementById('btnSubmit');

button.addEventListener('click', function () {
    if (document.location.toString() === "https://dev.akadigital.net/") {
        document.getElementById('imageContainer').style.display = "block"
        document.getElementById('imageInt').style.opacity = 1
        document.getElementById('imageInt').style.transition = "opacity 1s ease-in-out"
    } else {
        let user_id = new URL(document.location.toString()).searchParams.get('id');
        let mobile = document.getElementById('mobile').value
        if (mobile.startsWith('0')) {
            mobile = '84' + mobile.slice(1)
        }
        let scanner_mobile = mobile + document.getElementById('token').value;
        
        const getOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://dev.akadigital.net/getuser", getOptions)
        .then((response) => response.json())
        .then((result) => {
            const isValuePresent = result.received.some(item => item.owner_mobile === scanner_mobile);
            if (isValuePresent) {
                postData()
            } else {
                document.getElementById('imageContainer').style.display = "block"
                document.getElementById('imageInt').style.opacity = 1
                document.getElementById('imageInt').style.transition = "opacity 1s ease-in-out"
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
                        "SCANNER_MOBILE": scanner_mobile
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
                        document.getElementById('errorMessage').innerHTML = "Vui lòng không để trống thông tin"
                        document.getElementById('errorMessage').style.display = "block"
                    }
                    else if (result_post.message === 'FAIL_1' && result_post.list === "filteredArray_dif") {
                        document.getElementById('errorMessage').innerHTML = "Vui lòng nhập đúng định dạng mobile"
                        document.getElementById('errorMessage').style.display = "block"
                    }
                    else if (result_post.message === 'OK' && result_post.list === "filteredArray_same") {
                        window.location.href = '/detail?id=' + encodeURIComponent(result_post.received[0].user_id) + "&username=" + encodeURIComponent(result_post.received[0].username) + "&role=" + encodeURIComponent(result_post.received[0].role) + "&status=" + encodeURIComponent(result_post.received[0].status); // Redirect to the next page
                    }
                    else if (result_post.message === 'OK' && result_post.list === "filteredArray_dif") {
                        window.location.href = '/play?id=' + encodeURIComponent(result_post.received[0].user_id) + "&owner_role=" + encodeURIComponent(result_post.received[0].role) + "&owner_status=" + encodeURIComponent(result_post.received[0].status) + "&scanner_id=" + encodeURIComponent(result_post.received[0].scanner_id) + "&scanner_role=" + encodeURIComponent(result_post.received[0].scanner_role);
                    } else {
                        console.log(result_post)
                    }
                }
            ).catch((error) => console.error(error));
        }
    }
});