// triangulator2-app
// Copyright 2019 jackw01. Released under the MIT License (see LICENSE for details).

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

    this.timers = {
      seed: true,
      width: true,
      height: true,
    };
  }

  // Only start processing input changes after the user hasn't typed for a second
  // Otherwise typing numbers causes lag after every keystroke
  handleNumberInputChange(event) {
    if (this.timers[event.target.id]) {
      clearTimeout(this.timers[event.target.id]);
      event.persist();
      this.timers[event.target.id] = setTimeout(() => this.updateOptions(event), 1000);
    }
  }

  // This handle input changes from non-text inputs
  updateOptions(event) {
    const updatedState = { svgNeedsUpdating: true, options: this.state.options };
    updatedState.options[event.target.id] = parseInt(event.target.value, 10);
    this.setState(updatedState);
  }

  async generateSVG(element) {
    const { svgNeedsUpdating, options } = this.state;
    if (svgNeedsUpdating) { // If update flag is set, unset it before anything else
      await this.setState({ svgNeedsUpdating: false });
      console.log(`update${JSON.stringify(options)}`);
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
              onChange={this.handleNumberInputChange.bind(this)}
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
              onChange={this.handleNumberInputChange.bind(this)}
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
              onChange={this.handleNumberInputChange.bind(this)}
            />
          </FormGroup>
          <FormGroup>
            <Label className='input-group-label' for='cellSize'>Cell Size:</Label>
            <Input
              id='cellSize'
              bsSize='sm'
              type='number'
              step='1'
              min='80'
              max='512'
              defaultValue={this.state.options.cellSize}
              onChange={this.handleNumberInputChange.bind(this)}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default App;
