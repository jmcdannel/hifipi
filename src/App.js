import React, { Component } from 'react';

import { config as defaultConfig } from './visualizers/visualizers.config';
import { Menu } from './menu/menu.component';
import { Visualizers } from './visualizers/visualizers.component';

import { cloneDeep } from 'lodash';

import './App.scss';

class App extends Component {

  state = { config: defaultConfig };

  updateConfig(engineId, prop, value) {
    const newconfig = cloneDeep(this.state.config);
    newconfig[engineId][prop] = value;
    this.setState({ config: newconfig });
  }

  render() {
    return (
      <React.Fragment>
        <Menu config={this.state.config} updateConfig={this.updateConfig.bind(this)} />
        <Visualizers config={this.state.config} />
      </React.Fragment>
    );
  }
}

export default App;
