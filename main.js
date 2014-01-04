var previewContainer = document.getElementById('preview');
var mosaicContainer = document.getElementById('mosaic');
var shooter;

GumHelper.startVideoStreaming(function(error, stream, videoElement, width, height) {
	if(error) {
		// TODO
		return;
	}

	videoElement.width = width / 4;
	videoElement.height = height / 4;

	previewContainer.appendChild(videoElement);
	
	shooter = new VideoShooter(videoElement);

	startCapturing();

});

function startCapturing() {

	console.log('start capturing, current number of images ', mosaicContainer.childElementCount);
	if(mosaicContainer.childElementCount === 9) {
	//	debugger;
	}

	shooter.getShot(function onDone(pictureData) {
		console.log('ta-da');
		var img = document.createElement('img');
		img.src = pictureData;
		mosaicContainer.appendChild(img);

		setTimeout(startCapturing, 100);
	
	}, 1, 0.2, function onProgress(progress) {
		console.log('done ', progress);
	});

}
