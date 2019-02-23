import React, { Component } from 'react';
import { debounce } from 'lodash';
import './slider.scss';

const sliderScale = 1000;

export class SliderControl extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 250)
    this.state = { 
      value: this.props.value * sliderScale,
      defaultValue: this.props.value * sliderScale
    };
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel()
  }

  handleChange(e) {
    const value = parseFloat(e.target.value / sliderScale);
    this.setState({ value: value  * sliderScale });
    this.emitChangeDebounced(value);
  }

  emitChange = value => {
      this.props.handleChange(value);
  }

  reset() {
    this.setState({ value: this.state.defaultValue });
  }

  formatValue = value => parseInt(value / 10);

  render() {
    return (
      <div className="input-group mb-3 slider-input-group">
        <div className="input-group-preppend d-flex align-items-center">
            <span>{this.props.label}</span>
        </div>
        <input type="range" className="form-control" id="formControlRange"
          value={this.state.value}
          min="0" 
          max="1000" 
          onChange={this.handleChange} />
        <div className="input-group-append">
            <input className="slider-value" 
              type="text" 
              disabled 
              value={this.formatValue(this.state.value)} size="3" />
            <button className="btn btn-outline-secondary" type="button" onClick={this.reset.bind(this)}>Reset</button>
        </div>
    </div>
    );
  }
}

export default SliderControl;
