let photoContainer = document.getElementById('image-container');
let loader = document.getElementById('loader');

let ready = false;
let imageLoaded = 0;
let totalImages = 0;

let imageArray = [];

let count = 5;
let yourKey = 'ayjtg-E_NstwRZ1zTbBl7dr-U7Uiu8JxBC5WkoCCC7M';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${yourKey}&count=${count}`;

function imagesLoaded() {
    imageLoaded++;
    console.log(imageLoaded);

    if(imageLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 5;
        apiURL = `https://api.unsplash.com/photos/random/?client_id=${yourKey}&count=${count}`;
    }

}

function setAttributes(element, attribute) {
    for(const key in attribute) {
       element.setAttribute(key, attribute[key]);
}
}
// display the images 
function displayImage () {
    imageLoaded = 0;

    totalImages = imageArray.length;
    imageArray.forEach((photo) => {
        // to create a anchor tag to click the image and go to the image path
        const list = document.createElement('a');
        // list.setAttribute('href', photo.links.html);
        // list.setAttribute('target', '_blank');

        setAttributes(list, {
            href: photo.links.html,
            target: '_blank'
        });

        // to create a img tag to rendor the image 
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', imagesLoaded);

        list.appendChild(img);
        photoContainer.appendChild(list);
    });
}
// scrolled the image 
window.addEventListener('scroll', () => {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready){
       ready = false;
        getUnsplash();
        
        console.log('loaded');
    }
})

// to get the data in unsplash.com 
async function getUnsplash() {
    try{
        const response = await fetch(apiURL);
        imageArray = await response.json();
        displayImage();
    }catch(error){
        console.log("Oops! ", error);
    }
}



// on load 
getUnsplash();

