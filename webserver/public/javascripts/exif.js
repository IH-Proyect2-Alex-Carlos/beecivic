var ExifImage = require('exif').ExifImage;

try {
    new ExifImage({ image : '../uploads/img_1771.jpg' }, function (error, exifData) {
        if (error)
            console.log('Error: '+error.message);
        else
            console.log(exifData); // Do something with your data!
    });
} catch (error) {
    console.log('Error: ' + error.message);
}
