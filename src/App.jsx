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
  }

  updateOptions(event) {
    console.log(event.target);
    const updatedState = { svgNeedsUpdating: true, options: this.state.options };
    updatedState.options[event.target.id] = parseInt(event.target.value, 10);
    this.setState(updatedState);
  }

  async generateSVG(element) {
    const { svgNeedsUpdating, options } = this.state;
    if (svgNeedsUpdating) {
      await this.setState({ svgNeedsUpdating: false });
      const svgString = Triangulator.generate({
        svgInput: element,
        forceSVGSize: false,
        ...options,
      });

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
              className='input-inline-small'
              bsSize='sm'
              type='number'
              step='1'
              defaultValue={this.state.options.seed}
              onChange={this.updateOptions.bind(this)}
            />
          </FormGroup>
          <FormGroup>
            <Label className='input-group-label' for='resolution'>Resolution:</Label>
            <Input
              id='svgW'
              className='input-inline-small'
              bsSize='sm'
              type='number'
              step='1'
              min='0'
              max='8192'
              defaultValue={this.state.options.width}
              onChange={this.updateOptions.bind(this)}
            />
            &nbsp;x&nbsp;
            <Input
              id='svgH'
              className='input-inline-small'
              bsSize='sm'
              type='number'
              step='1'
              min='0'
              max='8192'
              defaultValue={this.state.options.height}
              onChange={this.updateOptions.bind(this)}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default App;
