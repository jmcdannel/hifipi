import React, { Component } from 'react';
import spectrumSVG from './images/spectrum.svg';
import SpectrumEngine from './spectrum.engine';

class Spectrum extends Component {

    constructor(props) {
        super(props);
        
        this.objRef = null;
        this.state = { isLoaded: false };

        this.setObjRef = element => {
          this.objRef = element;
          this.setState({ isLoaded: true });
        };
    }

    render() {
        return (
            <React.Fragment>
                <object 
                    width="100%" 
                    height="100%" 
                    ref={this.setObjRef} 
                    data={spectrumSVG} 
                    type="image/svg+xml">
                </object>
                {this.state.isLoaded && (
                  <SpectrumEngine 
                      svgObj={this.objRef}
                      config={this.props.config} 
                  />
                )}
            </React.Fragment>
        );
    }
}

export default Spectrum;
