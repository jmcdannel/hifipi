import React, { Component } from 'react';
import eqSVG from './images/eq-bands.svg';
import GraphicEQEngine from './graphic-eq.engine';

class GraphicEQ extends Component {

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
                    data={eqSVG} 
                    type="image/svg+xml">
                </object>
                {this.state.isLoaded && (
                    <GraphicEQEngine 
                        svgObj={this.objRef} 
                        config={this.props.config} 
                    />
                )}
            </React.Fragment>
        );
    }
}

export default GraphicEQ;
