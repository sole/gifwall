var previewContainer = document.getElementById('preview');

GumHelper.startVideoStreaming(function(error, stream, videoElement) {
	if(error) {
		// TODO
		return;
	}

	previewContainer.appendChild(videoElement);
	
	startCapturing();
});

function startCapturing() {

}
