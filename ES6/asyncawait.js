const photos = [];

function photoUpload() {
    let uploadStatus = new Promise( (resolve, reject) => {
        setTimeout( () => {
            photos.push("Profile picture");
            resolve("Upload successful!");
        }, 3000)
    });

    let result = uploadStatus; // *

    console.log(result);  // Promise
    console.log(photos);  // []
}

photoUpload();

// * a JS fentről lefelé szinkron módon futtatja a kódot. Mikor a let result sorhoz érünk, a Promise még
// mindig nem resolvált (3mp), ezért kapjuk a console log eredményét
// megoldás: async function + let result = await uploadStatus
// await: amíg nem resolvált a promise, addig nem megyünk a következő sorra,
// így a result változóba a helyes uploadStatus érték fog kerülni

// ezután a console log: "Upload successful", és ["Profile picture"]
