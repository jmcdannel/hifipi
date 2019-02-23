import { Component } from 'react';
import { getFrequencies } from './audio.utils';

export class AudioAnalyzer extends Component {

    componentDidUpdate() {
        const { engines, audio } = this.props;
        if (audio && engines.length > 0) {
            getFrequencies(audio.analyser, audio.frequencyArray, engines);
        }
    }

    render() {
        return null;
    }
}

export default AudioAnalyzer;