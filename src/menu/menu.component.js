import React, { Component } from 'react';
import { MenuToggle } from './menu-toggle.component';
import { SliderControl } from '../controls/slider.component';
import './menu.scss';

export class Menu extends Component {

    state = { isOpen: false };

    toggleMenu() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <nav role="navigation">
                <MenuToggle 
                    isOpen={this.state.isOpen} 
                    toggleMenu={this.toggleMenu.bind(this)} />

                <div className={`menu ${this.state.isOpen ? 'menu-open' : 'menu-closed'}`}>
                    <form>
                        <SliderControl
                            label="EQ Sensitivity"
                            value={this.props.config.eq.sensitivity}
                            handleChange={value => this.props.updateConfig('eq', 'sensitivity', value)} />
                    </form>
                </div>
            </nav>
        );
    }
}

export default Menu;