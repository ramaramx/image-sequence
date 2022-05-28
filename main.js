 
//This script lets you scroll through an image sequence with a correlating number sequence on top of the image. It also creates a download link to a higres image, of the displayed image, located in a separate directory. 

//Works on desktop and mobile.

// based on https://scrollmagic.io/examples/expert/image_sequence.html

//  low res and highres images need to be stored in seperate directories with the same file name and named: 0000.fileType, 0001.fileType, 0002.fileType, ...

// works on desktop and mobile!

// include
//jquery https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
//GSAP https://cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min.js
//scrollmagic https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js
//GSAP animation https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js
//scrollmagic debug indicators https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js


// define these vars to your needs

var framePath = "./asset/ezgif-frame-"; //Define file path for your images
var highResPath = "./asset/ezgif-frame-"; //if you have a downloadable high res image, define its path here.  
var nFrames = 147; //Define amount of images. counting starts at 0, to have it count to 400 you would have to ad 401 images. 
var fileType = ".png"; //Define your image file type.
var pageLengt = 20000; // this defines over what distance, in pixels, your image sequence should be displayed. esentally it defines how speady you scroll trough all the individual images. make shure your page has at least this lengt in px aswel.

//no need to change anything further down here.

//Define arrays.

var images = []; //Define array for images
var numberSequence = []; //Define array for number sequence
var higresimages =[]; //Define array for higres images


// ad images with path to array

function pad(number, length) { // pad numbers with leading zeros for your image sequence
    var str = '' + number;
        while (str.length < length) { str = '0' + str; }
        return str;
}

for (i = 0; i < (nFrames); i++) {//loop through all pictures
    images.push(framePath +pad(i, 4) + fileType); //Add every image to array with pad numbers and file type
}


// ad higres images with path to array

for (i = 0; i < (nFrames); i++) {//loop through all pictures
    higresimages.push(highResPath +pad(i, 4) + fileType); //Add the higResPath to the array with pad numbers and file type
}


// ad numbers to numbersequence array

for (i = 0; i < (nFrames); i++) {
    numberSequence.push(i); //Add N numbers to array
}


// TweenMax can tween any property of any object. We use this object to cycle through the array
var obj = {curImg: 0};

// create tween
var ImageSequenceTween = new TimelineMax()
.to(obj, 0.5,
    {
        curImg: images.length - 0,	// animate propery curImg to number of images
        roundProps: "curImg",				// only integers so it can be used as an array index
        repeat: 0,									// repeat 3 times
        immediateRender: true,			// load first image automatically
        ease: Linear.easeNone,			// show every image the same ammount of time
        onUpdate: function () {
          $("#imgsequence").attr("src", images[obj.curImg]);// set the image source
          $("#framesequencenumber").text(numberSequence[obj.curImg]);// set sequence number
          $("#higreslink").attr("href", higresimages[obj.curImg]);// set higres download link path

        }
    }
)


// When the DOM is ready
$(function() {


// init controller
var ImageSequenceController = new ScrollMagic.Controller();

    // build scene --> image sequence
var scene = new ScrollMagic.Scene({
    triggerElement: ".trigger", 
    triggerHook: 0,
    offset: -100,
    duration: pageLengt,
})
                
.setTween(ImageSequenceTween)
//.addIndicators() // add indicators (requires plugin)
.addTo(ImageSequenceController);


    
});