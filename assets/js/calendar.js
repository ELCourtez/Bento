            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic amJlbmFyZDoxakJHX3UxNEpvc1Q5QzE=");
            myHeaders.append("Cookie", "cookie_test=test; __Host-nc_sameSiteCookielax=true; __Host-nc_sameSiteCookiestrict=true; oc_sessionPassphrase=RoJZ1ye9HwatXWr9VaihFKLwPjOGrdlqzRCn7ajz06c5hyKT%2Bc6NhH8AOpLz%2BIkdd6M1A0TJGh9GsNrGbgYJlT5ppNRJUh9LOUJcDWiJKdm4zk7iQLIfo8FBEZDkkWmA; ocjug6sjwdyv=n0nf2t9bpke8o9f31nhjs0uc9v");
            myHeaders.append("Content-Type", "application/json");

            var myHeader = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic amJlbmFyZDoxakJHX3UxNEpvc1Q5QzE='
            };

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            var calendar = '';

            var mycalendar = fetch("https://cloud.woodphant.fr/remote.php/dav/calendars/jbenard/28c6e092-8c4b-4698-a8e4-713d4ca6894c/?export&accept=jcal", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

            console.log("test");
            console.log(mycalendar);
