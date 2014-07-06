var mosaicContainer = document.getElementById('mosaic');
var videoElement;
var shooter;

GumHelper.startVideoStreaming(function(error, stream, videoEl, width, height) {
	if(error) {
		alert('Cannot open the camera. Sad times: ' + error.message);
		return;
	}


    videoElement = videoEl;
	videoElement.width = width / 4;
	videoElement.height = height / 4;

	shooter = new VideoShooter(videoElement);

	startCapturing();

});

function startCapturing() {

	shooter.getShot(onFrameCaptured, 4, 0.2, function onProgress(progress) {
		console.log('done ', progress);
	});

}

function onFrameCaptured(pictureData) {
	var img = document.createElement('img');
	img.src = pictureData;

	img.style.width = videoElement.width + 'px';
	img.style.height = videoElement.height + 'px';

	mosaicContainer.insertBefore(img, mosaicContainer.firstChild);


	if(mosaicContainer.childElementCount > 20) {
		mosaicContainer.removeChild(mosaicContainer.lastChild);	
	}

	setTimeout(startCapturing, 100);
}
