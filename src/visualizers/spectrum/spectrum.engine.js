import { Component } from 'react';
import { AudioContext } from '../../audio/audio.context';
import { isSVGLoaded } from '../svg.utils';

const defaultConfig = { 
  sensitivity: 1,
  size: 255,
	theme: 'stoplight', // css class
}

export class SpectrumEngine extends Component {

  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.config = Object.assign(defaultConfig, this.props.config);
    this.state = {
        sensitivity: this.config.sensitivity
    }
  }

  componentDidMount() {
    isSVGLoaded(this.props.svgObj)
      .then((visualizer) => {
        this.initialize(visualizer);
        this.context.registerEngine(this.draw.bind(this));
      })
      .catch(() => console.warn('SVG not laoded'));
      
  }

  initialize(visualizer) {
    const svgDoc = this.props.svgObj.contentDocument;
    const mask = visualizer.getElementById('mask');
		const { size } = this.config;
    let path;

    visualizer.setAttribute('viewBox', `0 0 ${size} ${size}`);
    
    for (var i = 0 ; i < size; i++) {
      path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('stroke-dasharray', '4,1');
      mask.appendChild(path);
    }

		this.paths = svgDoc.getElementsByTagName('path');
	}

	draw(frequencyArray) {
		const { size } = this.config;
    let adjustedLength;
    for (var i = 0 ; i < size; i++) {
      adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
      this.paths[i].setAttribute('d', 'M '+ (i) +',255 l 0,-' + adjustedLength);
    }
  }

  render() {
      return null;
  }
}

export default SpectrumEngine;
