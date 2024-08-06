let button = document.getElementById('btnSubmit');

button.addEventListener('click', function () {
    let user_id = "";
    let scanner_email = "";

    user_id = new URL(document.location.toString()).searchParams.get('id');
    scanner_email = document.getElementById('email').value;
        
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
        .then((result) => {
            if (result.message === 'OK' && result.list === "filteredArray_same") {
                //console.log(result)
                window.location.href = '/detail?id=' + encodeURIComponent(result.received[0].user_id) + "&username=" + encodeURIComponent(result.received[0].username) + "&role=" + encodeURIComponent(result.received[0].role) + "&status=" + encodeURIComponent(result.received[0].status); // Redirect to the next page
            }
            else if (result.message === 'OK' && result.list === "filteredArray_dif") {
                //console.log(result)
                window.location.href = '/play?id=' + encodeURIComponent(result.received[0].user_id) + "&owner_role=" + encodeURIComponent(result.received[0].role) + "&scanner_role=" + encodeURIComponent(result.received[0].scanner_role);
            } else {
                console.log(result)
                document.getElementById('errorMessage').innerHTML = "Vui lòng nhập đúng thông tin"
                document.getElementById('errorMessage').style.display = "block"
            }
        }
    ).catch((error) => console.error(error));
});