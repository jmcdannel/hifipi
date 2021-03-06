import React, { Component } from 'react';
import './eqBandsSVG.scss'

export class EQBandsSVG extends Component {
  render() {
    return (<svg id="visualizer" width="100" height="50" preserveAspectRatio="none" version="1.1" 
      xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <g>
        <defs>
            <mask id="mask-bands">
                <g id="eq-bands"></g>
            </mask>
            <mask id="mask-peaks">
                <g id="eq-peaks"></g>
            </mask>
            <linearGradient id="gradient-bands" x1="0%" y1="0%" x2="0%" y2="100%">
                
                <stop offset="0%" style={{'stop-color':'#010101', 'stop-opacity':1}} />
                <stop offset="20%" style={{'stop-color':'#111111', 'stop-opacity':1}} />
                <stop offset="90%" style={{'stop-color':'#222222', 'stop-opacity':1}} />
                <stop offset="100%" style={{'stop-color':'#333333', 'stop-opacity':1}} />

            </linearGradient>
            <linearGradient id="gradient-peaks" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{'stop-color':'#ff0a0a', 'stop-opacity':1}} />
                <stop offset="25%" style={{'stop-color':'#ff580a', 'stop-opacity':1}} />
                <stop offset="75%" style={{'stop-color':'#fff129', 'stop-opacity':1}} />
                <stop offset="85%" style={{'stop-color':'#15b300', 'stop-opacity':1}} />
                <stop offset="100%" style={{'stop-color':'#15b300', 'stop-opacity':1}} />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-bands)" mask="url(#mask-bands)"></rect>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-peaks)" mask="url(#mask-peaks)"></rect>
    </g>
</svg>);
  }
}

