import React, { Component } from 'react';
import moment from 'moment';
import { getFrequenciesByRange } from '../../audio/audio.utils';
import { AudioContext } from '../../audio/audio.context';
import { isSVGLoaded } from '../svg.utils';
import { isEqual } from 'lodash';


const defaultConfig = {
	frequencyCount: 512, // 
	fidelity: 100, // higher number means more detail in EQ
	peakDecay: 400, // time to delay before resetting peak
	peakFallRate: 5, // rate at which peak descends after decay
	peakFadeRate: .1, // rate at which peak fades after decay
	sensitivity: .7, // input gain value (suggested range: .4 to 1)
	bands: [
		{ frequency: 25, peak: 0, label: '25 Hz' },
		{ frequency: 45, peak: 0, label: '45 Hz' },
		{ frequency: 65, peak: 0, label: '66 Hz' },
		{ frequency: 100, peak: 0, label: '100 Hz' },
		{ frequency: 160, peak: 0, label: '160 Hz' },
		{ frequency: 250, peak: 0, label: '250 Hz' },
		{ frequency: 400, peak: 0, label: '400 Hz' },
		{ frequency: 630, peak: 0, label: '630 Hz' },
		{ frequency: 1000, peak: 0, label: '1 KHz' },
		{ frequency: 1600, peak: 0, label: '1.6 KHz' },
		{ frequency: 2500, peak: 0, label: '2.5 KHz' },
		{ frequency: 6300, peak: 0, label: '6.3 KHz' },
		{ frequency: 10000, peak: 0, label: '10 KHz' },
		{ frequency: 16000, peak: 0, label: '16 KHz' }
	],
	enablePeaks: true, // not implemented
	theme: 'stoplight', // css class
}

export class GraphicEQEngine extends Component {

	static contextType = AudioContext;

    constructor(props) {
        super(props);
				this.state = {
					config: Object.assign({}, defaultConfig, this.props.config)
				}
    }

    componentDidMount() {
			isSVGLoaded(this.props.svgObj)
			.then((visualizer) => {
				this.initialize(visualizer);
				this.context.registerEngine(this.draw.bind(this));
			})
			// .catch((err) => console.warn('SVG not laoded', err));
		}
		
		componentDidUpdate(prevProps) {
			if (!isEqual(prevProps.config, this.props.config)) {
				this.setConfig();
			}
		}

		setConfig() {
			this.setState({ config: Object.assign({}, defaultConfig, this.props.config) });
		}

    initialize(visualizer) {
		const { fidelity, bands } = this.state.config;
		const svgDoc = this.props.svgObj.contentDocument;
		const labelsEl = svgDoc.getElementById('eq-labels');
		const bandsEl = svgDoc.getElementById('eq-bands');
		const peaksEl = svgDoc.getElementById('eq-peaks');
		const size = bands.length * fidelity;
		let eqPath, peakPath, label, line1, line2;

		visualizer.setAttribute('viewBox', `0 0 ${size} ${size}`);

		bands.map((band, idx) => {
			eqPath = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'path');
			eqPath.setAttribute('stroke-width', fidelity * .9);
			eqPath.setAttribute('stroke-dasharray', `${fidelity * .4}, ${fidelity * .06}`);
			bandsEl.appendChild(eqPath);

			peakPath = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'path');
			peakPath.setAttribute('stroke-width', fidelity * .9);
			peaksEl.appendChild(peakPath);

			label = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text');
			label.setAttribute('x', (idx * fidelity) + (fidelity / 2));
			label.setAttribute('y', (bands.length * fidelity) - 10);

			line1 = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
			line1.textContent = this._formatLabel(bands[idx].frequency);
			line1.setAttribute('x', (idx * fidelity) + (fidelity / 2));
			line1.setAttribute('y', (bands.length * fidelity) - 10);
			line1.setAttribute('dy', '-2.4em');

			line2 = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
			line2.textContent = ' Hz';
			line2.setAttribute('x', (idx * fidelity) + (fidelity / 2));
			line2.setAttribute('y', (bands.length * fidelity) - 10);
			line2.setAttribute('dy', '-1.2em');
			
			label.appendChild(line1);
			label.appendChild(line2);
			//labelsEl.appendChild(label);

			this._calculateBandRange(band, idx);
			return band;
		});

		this.bandPaths = bandsEl.getElementsByTagName('path');
		this.peakPaths = peaksEl.getElementsByTagName('path');
	}

	draw(frequencyArray) {
		const now = new moment();
		this.state.config.bands.map(this._drawBand.bind(this, frequencyArray, now));
	}

	// TODO: move to a utility
	_formatLabel(frequency) {
		if (frequency < 1000) {
			return frequency;
		} else {
			return `${parseInt((frequency / 100), 10) / 10}K`;
		}
	}

	_drawBand(frequencyArray, now, band, idx) {
        band.value = this._whatsTheFrequencyKenneth(band, frequencyArray);
		this._calculatePeaks(band, now);
		this.bandPaths[idx].setAttribute('d', this._getEQLine(idx, band.value));
		this.peakPaths[idx].setAttribute('d', this._getPeakLine(idx, band.peak));
		this.peakPaths[idx].setAttribute('style', `opacity: ${band.opacity}`);
	}

	_whatsTheFrequencyKenneth(band, frequencyArray) {
        // if (frequencyArray[0] > 20) debugger;
		const frequencies =
			getFrequenciesByRange(frequencyArray, band.min, band.max, this.context.audio.range);
		const frequencyLen = frequencies.length;
		return frequencyLen === 0 ?
			0 : frequencies.reduce((acc, val) => acc + val, 0) / frequencyLen;
	}

	_calculateBandRange(band, bandIdx) {
		const { bands } = this.state.config;
		band.min = bandIdx === 0 ? 0 : bands[bandIdx - 1].frequency;
		band.max = bands[bandIdx].frequency;
	}

	_calculatePeaks(band, now) {
		const { peakDecay, peakFallRate, peakFadeRate } = this.state.config;
		if (band.value > band.peak) { // new peak detected
			band.peak = band.value;
			band.opacity = 1;
			band.decay = new moment();
		} else if (moment.duration(now.diff(band.decay)) > peakDecay) { // decay peak
			band.peak = band.peak - peakFallRate;
			band.opacity = band.opacity - peakFadeRate;
		}
	}

	_getEQLine(idx, frequency) {
		const { fidelity, bands } = this.state.config;
		const x = (idx * fidelity) + (fidelity / 2);
		const y = bands.length * fidelity;
		const h = this._calculateLineLength(frequency);
		return `M ${x},${y} L ${x},${h}`;
	}

	_getPeakLine(idx, frequency) {
		const { fidelity } = this.state.config;
		const x = (idx * fidelity) + (fidelity / 2);
		const y = this._calculateLineLength(frequency);
		const h = y - fidelity * .2;
		return `M ${x},${y} L ${x},${h}`;
	}

	_calculateLineLength(frequency) {
		let { bands, fidelity, frequencyCount, sensitivity } = this.state.config;
				let numBands = bands.length;
		// if (sensitivity != .7 ) console.log('sensitivity', sensitivity);
		frequencyCount = frequencyCount * sensitivity;
		return parseInt((numBands * fidelity) - (frequency * numBands * fidelity / frequencyCount), 10);
	}

	render() {
		const { bands } = this.state.config;
			return (<ol className="band-labels d-flex flex-row">
				{bands.map(band => 
					<li key={band.frequency}>{this._formatLabel(band.frequency)}<br/>Hz</li>
				)}
			</ol>);
	}
}

export default GraphicEQEngine;