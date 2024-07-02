const form = document.getElementById('contact-form');

if (form !== null) {
    const submitButton = document.getElementById('contact-form-button');
    const submitStatus = document.getElementById('contact-form-status');

    function buttonOnError() {
        submitStatus.textContent = "Formular konnte nicht versendet werden!";
        submitButton.disabled = false
    }

    function success() {
        form.reset();
        submitStatus.textContent = "Formular erfolgreich versendet!";
        submitButton.style.display = 'none';
    }

    function fail(response) {
        buttonOnError()
        response.json().then(value => {
            console.log('Request status: ' + response.status)
            console.log('Request error: ')
            console.log(value)
        })
    }

    function error(reason) {
        buttonOnError()
        console.log(reason)
    }

    form.onsubmit = function (event) {
        submitButton.disabled = true

        const data = new FormData(form);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch("https://api.staticforms.xyz/submit", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(data)),
            headers: myHeaders,
        }).then(response => {
            if (response.ok) {
                if (response.status !== 200) {
                    fail(response)
                } else {
                    success();
                }
            } else {
                fail(response);
            }
        }).catch(reason => {
            error(reason)
        });

        return false;
    }
}