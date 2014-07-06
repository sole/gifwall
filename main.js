var previewContainer = document.getElementById('preview');
var mosaicContainer = document.getElementById('mosaic');
var videoElement;
var shooter;

GumHelper.startVideoStreaming(function(error, stream, videoEl, width, height) {
	if(error) {
		// TODO
		return;
	}


    videoElement = videoEl;
	videoElement.width = width / 4;
	videoElement.height = height / 4;

	previewContainer.appendChild(videoElement);
	
	shooter = new VideoShooter(videoElement);

	startCapturing();

});

function startCapturing() {

	console.log('start capturing, current number of images ', mosaicContainer.childElementCount);

	shooter.getShot(onFrameCaptured, 4, 0.2, function onProgress(progress) {
		console.log('done ', progress);
	});

}

function onFrameCaptured(pictureData) {
	console.log('ta-da');
	var img = document.createElement('img');
	img.src = pictureData;
	mosaicContainer.insertBefore(img, mosaicContainer.firstChild);

	setTimeout(startCapturing, 100);
}
