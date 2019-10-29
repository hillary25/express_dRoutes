// this is a partially revealing module pattern - just a variation on what we've already done

const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch

    let userButtons = document.querySelectorAll('.u-link'),
        lightbox = document.querySelector('.lightbox');

    function renderSocialMedia(socialMedia) {
        return `<ul class="u-social">
                    ${socialMedia.map(item => `<li>${item}</li>`).join('')}
                </ul>`
    }

    function parseUserData(person) { // person is the database result
        // this is where creativity comes; motion, loading animation, css, js, etc.
        // pop open a lightbox and fill that data in
        let targetDiv = document.querySelector('.lb-content'),
            targetImg = lightbox.querySelector('img');

        let bioContent = `
            <p>${person.bio}</p>
            <h4>Social Media:</h4>
            ${renderSocialMedia(person.social)}
        `;

        console.log(bioContent);

        targetDiv.innerHTML = bioContent;
        targetImg.src = person.imgsrc;

        lightbox.classList.add('show-lb');
    }

    function getUserData(event) {
        // kill the default anchor tag behaviour (don't navigate anywhere)
        event.preventDefault();
        // debugger;
        // find the image closest to the anchor tag and get its course property
        let imgSrc = this.previousElementSibling.getAttribute('src');

        // this will look like /1 (which is a route change)
        let url = `/${this.getAttribute('href')}`;

        fetch(url) // go get the data
            .then(res => res.json()) // then turn it into something js can use, parse the json result into a plain object
            .then(data => { //log data to console
                console.log("my database result is: ", data)

                data[0].imgsrc = imgSrc;

                parseUserData(data[0]); // take this data and put it in the parseUserData function
            })
            .catch((err) => {
                console.log(err)
            });
    }

    userButtons.forEach(button => button.addEventListener('click', getUserData));

    lightbox.querySelector('.close').addEventListener('click', function() {
        lightbox.classList.remove('show-lb');
    });

})();