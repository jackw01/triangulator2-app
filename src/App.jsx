// triangulator2-app
// Copyright 2019 jackw01. Released under the MIT License (see LICENSE for details).

import _ from 'lodash';
import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Triangulator from 'triangulator2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgNeedsUpdating: true,
      svgSizeCSS: { width: '', height: '' },
      options: {
        seed: 4,
        width: 3840,
        height: 2400,
        gridMode: Triangulator.GridMode.Poisson,
        gridOverride: false,
        cellSize: 150,
        cellRandomness: 0.2,
        colorOverride: false,
        color: Triangulator.ColorFunction.RadialFromBottom,
        colorPalette: ['#e7a71d', '#dc433e', '#9e084b', '#41062f'],
        colorRandomness: 0.15,
        quantizeSteps: 0,
        useGradient: true,
        gradient: Triangulator.GradientFunction.Random,
        gradientNegativeFactor: 0.03,
        gradientPositiveFactor: 0.03,
        strokeColor: false,
        strokeWidth: 1,
      },
    };
  }

  // Wrap _.throttle
  inputHandler(wait) {
    return (event) => {
      const { target } = event;
      _.throttle(this.handleOptionChange, wait).bind(this)(target.id, target.value);
    };
  }

  // This handle input changes from non-text inputs
  handleOptionChange(id, value) {
    const updatedState = { svgNeedsUpdating: true, options: this.state.options };
    updatedState.options[id] = parseInt(value, 10);
    this.setState(updatedState);
  }

  async generateSVG(element) {
    const { svgNeedsUpdating, options } = this.state;
    // TODO: sometimes element is null, iont know wtf is goin on here
    if (svgNeedsUpdating && element) {
      // If update flag is set, unset it before anything else
      await this.setState({ svgNeedsUpdating: false });
      const svgString = Triangulator.generate({
        svgInput: element,
        forceSVGSize: false,
        ...options,
      });
      // Determine correct css sizing based on image and browser aspect ratios
      const windowAspect = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        / Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const svgSizeCSS = { width: '', height: '' };
      if ((options.width / options.height) > windowAspect) svgSizeCSS.width = '100%';
      else svgSizeCSS.height = '100%';
      this.setState({ svgSizeCSS });
    }
  }

  render() {
    return (
      <div className='main h-100'>
        <svg
          id='image'
          style={this.state.svgSizeCSS}
          viewBox={`0 0 ${this.state.options.width} ${this.state.options.height}`}
          ref={this.generateSVG.bind(this)}
        />
        <Form className='controls-container'>
          <FormGroup>
            <Label className='input-group-label' for='seed'>Seed:</Label>
            <Input
              id='seed'
              bsSize='sm'
              type='number'
              step='1'
              defaultValue={this.state.options.seed}
              onChange={this.inputHandler(500)}
            />
          </FormGroup>
          <FormGroup>
            <Label className='input-group-label' for='resolution'>Resolution:</Label>
            <Input
              id='width'
              bsSize='sm'
              type='number'
              step='1'
              min='0'
              max='8192'
              defaultValue={this.state.options.width}
              onChange={this.inputHandler(500)}
            />
            &nbsp;x&nbsp;
            <Input
              id='height'
              bsSize='sm'
              type='number'
              step='1'
              min='0'
              max='8192'
              defaultValue={this.state.options.height}
              onChange={this.inputHandler(500)}
            />
          </FormGroup>
          <FormGroup>
            <Label className='input-group-label' for='cellSize'>Cell Size:</Label>
            <input
              id="cellSize"
              type="range"
              step="1"
              min="80"
              max="512"
              defaultValue={this.state.options.cellSize}
              onChange={this.inputHandler(100)}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default App;
