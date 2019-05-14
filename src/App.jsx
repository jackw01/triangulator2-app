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
      svgW: 3840,
      svgH: 2400,
      svgSizeCSS: { width: '', height: '' },
    };
  }

  updateOptions(event) {
    console.log(event.target);
    const updatedState = { svgNeedsUpdating: true };
    updatedState[event.target.id] = parseInt(event.target.value, 10);
    this.setState(updatedState);
    this.forceUpdate();
  }

  generateSVG(element) {
    const { svgNeedsUpdating, svgW, svgH } = this.state;
    if (svgNeedsUpdating) {
      const svgString = Triangulator.generate({
        svgInput: element,
        forceSVGSize: false,
        seed: 4,
        width: svgW,
        height: svgH,
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
      });

      const windowAspect = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        / Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const svgSizeCSS = { width: '', height: '' };
      if ((svgW / svgH) > windowAspect) svgSizeCSS.width = '100%';
      else svgSizeCSS.height = '100%';

      this.setState({ svgNeedsUpdating: false, svgSizeCSS });
    }
  }

  render() {
    return (
      <div className='main h-100'>
        <svg
          id='image'
          //key={this.state.svgNeedsUpdating}
          style={this.state.svgSizeCSS}
          viewBox={`0 0 ${this.state.svgW} ${this.state.svgH}`}
          ref={this.generateSVG.bind(this)}
        />
        <Form className='controls-container'>
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
              defaultValue={this.state.svgW}
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
              defaultValue={this.state.svgH}
              onChange={this.updateOptions.bind(this)}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default App;
