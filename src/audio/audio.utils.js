export const createAudioStream = (stream) => {
	const audioContent = new AudioContext();
	const audioStream = audioContent.createMediaStreamSource(stream);
	const analyser = audioContent.createAnalyser();
	let frequencyArray;
	const range = audioStream.context.sampleRate / 2 / analyser.frequencyBinCount;
	audioStream.connect(analyser);
	analyser.fftSize = 2048;
	window.persistAudioStream = stream;
	frequencyArray = new Uint8Array(analyser.frequencyBinCount);
	return { analyser, range, frequencyArray };
}

export const getFrequenciesByRange = (
	frequencyArray,
	min,
	max,
	range
) => frequencyArray.filter((data, idx) => idx * range >= min && idx * range < max);

export const getFrequencies = (analyser, frequencyArray, engines) => {
	requestAnimationFrame(() => {
		engines.map(engine => engine(frequencyArray));
		getFrequencies(analyser, frequencyArray, engines);
	});
	analyser.getByteFrequencyData(frequencyArray);
}
