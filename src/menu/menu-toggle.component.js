import React, { Component } from 'react';
import './menu-toggle.scss';

export class MenuToggle extends Component {
  
    render() {
        return (
          <button 
            className={`menu-toggle ${this.props.isOpen && 'menu-toggle-open'}`} 
            onClick={this.props.toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
          </button>
        );
    }
}

export default MenuToggle;