import { Component } from 'react';
import { createAudioStream } from './audio.utils';

import { AudioContext } from './audio.context';

export class AudioListener extends Component {

    static contextType = AudioContext;

    componentDidMount() {
        navigator.getUserMedia(
          { audio: {sampleRate:48000, channelCount: 2 } }, 
          (stream) => {
              console.log('user accepted audio request');
              this.context.setAudio(createAudioStream(stream));
          },
          (err) => {
            console.log('user audio request error');
            console.log(err);
          }
        );
    }

    render() {
        return null;
    }
}

export default AudioListener;