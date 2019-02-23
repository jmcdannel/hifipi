import React, { Component } from 'react';

import AudioListener from '../audio/audio-listener.component';
import AudioAnalyzer from '../audio/audio-analyzer.component';
import GrpahicEQ from './graphic-eq/graphic-eq.component';
import Spectrum from './spectrum/spectrum.component';
import { AudioContext } from '../audio/audio.context';
import { AudioProvider } from '../audio/audio.provider';
import './visualizers.scss';

export class Visualizers extends Component {

  render() {
    return (
      <AudioProvider>
        <AudioListener />
        <AudioContext.Consumer>{context=> 
          <AudioAnalyzer 
            ref={this.analyzerRef}
            engines={context.engines}
            audio={context.audio}
          />
        }</AudioContext.Consumer>
          
        <main className="d-flex flex-wrap flex-row">
          <AudioContext.Consumer>{context=>
            <React.Fragment>
              <section className="visualizer-container d-flex flex-column justify-content-center">
                <div className="visualizer graphic-eq d-flex flex-column align-items-center justify-content-center">
                  {context.audio ? <GrpahicEQ 
                    range={context.audio.range}
                    config={this.props.config.eq}
                  /> : 
                  (<div className="animationload">
                      <div className="osahanloading"></div>
                  </div>)}
                </div>
              </section>

              <section className="visualizer-container d-flex flex-column justify-content-center">
                <div className="visualizer graphic-eq d-flex flex-rcolumn align-items-center justify-content-center">
                  {context.audio ? <GrpahicEQ 
                    range={context.audio.range}
                    config={this.props.config.eq}
                  />: 
                  (<div className="animationload">
                      <div className="osahanloading"></div>
                  </div>)}
                </div>
              </section>
              
              <section className="visualizer-container d-flex flex-column justify-content-center">
                  <div className="visualizer d-flex flex-row align-items-center justify-content-center">
                    {context.audio ?  <Spectrum />: 
                  (<div className="animationload">
                      <div className="osahanloading"></div>
                  </div>)}
                  </div>
              </section>
              <section className="visualizer-container d-flex flex-column justify-content-center">
                  <div className="visualizer d-flex flex-row align-items-center justify-content-center">
                    {context.audio ?  <Spectrum />: 
                  (<div className="animationload">
                      <div className="osahanloading"></div>
                  </div>)}
                  </div>
              </section>
            </React.Fragment>
          }</AudioContext.Consumer>
        </main>
      </AudioProvider>
    );
  }
}

export default Visualizers;
