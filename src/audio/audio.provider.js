import React, { Component } from 'react';
import { AudioContext } from './audio.context';

export class AudioProvider extends Component {

  state = {
    audio: null,
    engines: [],
    registerEngine: engine => {
      this.setState({ engines: [...this.state.engines, engine] })
    },
    setAudio: audio => {
      this.setState({ audio });
    }
  }
   
   render() {
    return (
      <AudioContext.Provider value={this.state}>
        {this.props.children}
      </AudioContext.Provider>
    );
  }
 }