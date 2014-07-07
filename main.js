var mosaicContainer = document.getElementById('mosaic');
var videoElement;
var shooter;
var imagesPerRow = 5;
var maxImages = 20;

window.addEventListener('resize', onResize);

GumHelper.startVideoStreaming(function(error, stream, videoEl, width, height) {
	if(error) {
		alert('Cannot open the camera. Sad times: ' + error.message);
		return;
	}


    videoElement = videoEl;
	videoElement.width = width / 2;
	videoElement.height = height / 2;

	shooter = new VideoShooter(videoElement);

	startCapturing();

});

function startCapturing() {

	shooter.getShot(onFrameCaptured, 3, 0.1, function onProgress(progress) {
		console.log('done ', progress);
	});

}

function onFrameCaptured(pictureData) {
	var img = document.createElement('img');
	img.src = pictureData;

	var imageSize = getImageSize();

	img.style.width = imageSize[0] + 'px';
	img.style.height = imageSize[1] + 'px';

	mosaicContainer.insertBefore(img, mosaicContainer.firstChild);


	if(mosaicContainer.childElementCount > maxImages) {
		mosaicContainer.removeChild(mosaicContainer.lastChild);	
	}

	setTimeout(startCapturing, 100);
}

function getImageSize() {
	var windowWidth = window.innerWidth;
	var imageWidth = Math.round(windowWidth / imagesPerRow);
	var imageHeight = (imageWidth / videoElement.width) * videoElement.height;

	return [ imageWidth, imageHeight ];
}

function onResize(e) {
	var imageSize = getImageSize();
	var imageWidth = imageSize[0];
	var imageHeight = imageSize[1];

	for(var i = 0; i < mosaicContainer.childElementCount; i++) {
		var img = mosaicContainer.children[i];
		img.style.width = imageWidth + 'px';
		img.style.height = imageHeight + 'px';
	}
}
