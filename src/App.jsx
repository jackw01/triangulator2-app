// triangulator2-app
// Copyright 2019 jackw01. Released under the MIT License (see LICENSE for details).

import _ from 'lodash';
import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, ButtonGroup, Button } from 'reactstrap';
import { ChromePicker } from 'react-color';
import chroma from 'chroma-js';
import Triangulator from 'triangulator2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgNeedsUpdating: true,
      svgSizeCSS: { width: '', height: '' },
      svgWidth: 3840,
      svgHeight: 2400,
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
        colorScaleInvert: false,
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

    this.allColorFunctions = [...Object.entries(Triangulator.ColorFunction).map(i => i[1])];
    this.allGradientFunctions = [...Object.entries(Triangulator.GradientFunction).map(i => i[1])];

    // Debounce input changes
    this.inputHandler = _.debounce(this.handleOptionChange, 150).bind(this);
  }

  // Handle input changes from non-text inputs
  handleOptionChange(target) {
    console.log(`change ${target.id}`);
    const updatedState = { svgNeedsUpdating: true, options: this.state.options };

    if (target.id === 'color') {
      updatedState.options[target.id] = this.allColorFunctions[parseInt(target.value, 10)];
    } else if (target.id === 'gradient') {
      updatedState.options[target.id] = this.allGradientFunctions[parseInt(target.value, 10)];
    } else if (target.step === 1) updatedState.options[target.id] = parseInt(target.value, 10);
    else updatedState.options[target.id] = parseFloat(target.value);

    this.setState(updatedState);
  }

  // Curried handler for toggle button inputs
  handleToggle(value) {
    return (event) => {
      console.log(event.target);
      const updatedState = { svgNeedsUpdating: true, options: this.state.options };
      updatedState.options[event.target.id] = value;
      this.setState(updatedState);
    };
  }

  // Curried handler for adding and removing color stops
  handleChangeColorStops(delta) {
    return () => {
      const newSize = this.state.options.colorPalette.length + delta;
      if (newSize > 0 && newSize <= 20) {
        const updatedState = { svgNeedsUpdating: true, options: this.state.options };
        updatedState.options.colorPalette = chroma.scale(this.state.options.colorPalette)
          .mode('lch').colors(newSize);
        this.setState(updatedState);
      }
    };
  }

  // Curried handler for color inputs
  handleColorChange(i) {
    return (color) => {
      console.log(color, i);
      const updatedState = { svgNeedsUpdating: true, options: this.state.options };
      updatedState.options.colorPalette[i] = color.hex;
      this.setState(updatedState);
    };
  }

  forceRegenerate() {
    console.log('force');
    this.forceUpdate();
  }

  async generateSVG(element) {
    const { svgNeedsUpdating, options } = this.state;
    // TODO: sometimes element is null, iont know wtf is goin on here
    if (svgNeedsUpdating && element) {
      console.log('update');

      // If update flag is set, unset it before anything else
      await this.setState({ svgNeedsUpdating: false });
      element.innerHTML = '';
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
      this.setState({ svgSizeCSS, svgWidth: options.width, svgHeight: options.height });
    }
  }

  render() {
    return (
      <div className='main h-100'>
        <svg
          id='image'
          style={this.state.svgSizeCSS}
          viewBox={`0 0 ${this.state.svgWidth} ${this.state.svgHeight}`}
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
              onChange={e => this.inputHandler(e.target)}
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
              onChange={e => this.inputHandler(e.target)}
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
              onChange={e => this.inputHandler(e.target)}
            />
          </FormGroup>
          <FormGroup>
            <Label className='input-group-label' for='gridMode'>Grid Mode:</Label>
            <Input
              id='gridMode'
              bsSize='sm'
              type='select'
              defaultValue={this.state.options.gridMode}
              onChange={e => this.handleOptionChange(e.target)}
            >
              <option value='1'>Square</option>
              <option value='2'>Triangle</option>
              <option value='3'>Poisson</option>
              <option value='4'>Override</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label className='input-group-label' for='cellSize'>Cell Size:</Label>
            <input
              id='cellSize'
              type='range'
              step='1'
              min='80'
              max='512'
              defaultValue={this.state.options.cellSize}
              onChange={e => this.inputHandler(e.target)}
            />
          </FormGroup>
          <FormGroup>
            <Label className='input-group-label' for='cellRandomness'>Cell Randomness:</Label>
            <input
              id='cellRandomness'
              type='range'
              step='0.001'
              min='0'
              max='1'
              defaultValue={this.state.options.cellRandomness}
              onChange={e => this.inputHandler(e.target)}
            />
          </FormGroup>
          <FormGroup>
            <Label className='input-group-label' for='color'>Color Mode:</Label>
            <Input
              id='color'
              bsSize='sm'
              type='select'
              defaultValue={5}
              onChange={e => this.handleOptionChange(e.target)}
            >
              {this.allColorFunctions.map((f, i) => (
                <option value={i}>{f.name}</option>
              ))}
            </Input>
            <br />
            <ButtonGroup size='sm'>
              <Button
                id='colorScaleInvert'
                color='secondary'
                onClick={this.handleToggle(false).bind(this)}
                active={!this.state.options.colorScaleInvert}
              >
                Default
              </Button>
              <Button
                id='colorScaleInvert'
                color='secondary'
                onClick={this.handleToggle(true).bind(this)}
                active={this.state.options.colorScaleInvert}
              >
                Invert
              </Button>
            </ButtonGroup>
          </FormGroup>
          <FormGroup>
            <Label className='input-group-label' for='colorRandomness'>Color Randomness:</Label>
            <input
              id='colorRandomness'
              type='range'
              step='0.001'
              min='0'
              max='1'
              defaultValue={this.state.options.colorRandomness}
              onChange={e => this.inputHandler(e.target)}
            />
          </FormGroup>
          <FormGroup className='color-picker-container'>
            <Label className='input-group-label' for='colorPalette'>Color Palette:</Label>
            <Button
              id='colorPaletteDecrease'
              size='sm'
              color='secondary'
              onClick={this.handleChangeColorStops(-1).bind(this)}
            >
              Remove Color Stop
            </Button>
            &nbsp;
            <Button
              id='colorPaletteIncrease'
              size='sm'
              color='secondary'
              onClick={this.handleChangeColorStops(1).bind(this)}
            >
              Add Color Stop
            </Button>
            {this.state.options.colorPalette.map((hex, i) => (
              <ChromePicker
                color={hex}
                disableAlpha
                onChangeComplete={this.handleColorChange(i).bind(this)}
              />
            ))}
          </FormGroup>
          <FormGroup>
            <Label className='input-group-label' for='quantizeSteps'>Color Quantization Levels:</Label>
            <input
              id='quantizeSteps'
              type='range'
              step='1'
              min='0'
              max='10'
              defaultValue={this.state.options.quantizeSteps}
              onChange={e => this.inputHandler(e.target)}
            />
          </FormGroup>
          <FormGroup>
            <Label className='input-group-label' for='useGradient'>Generate Gradients:</Label>
            <ButtonGroup size='sm'>
              <Button
                id='useGradient'
                color='secondary'
                onClick={this.handleToggle(true).bind(this)}
                active={this.state.options.useGradient}
              >
                On
              </Button>
              <Button
                id='useGradient'
                color='secondary'
                onClick={this.handleToggle(false).bind(this)}
                active={!this.state.options.useGradient}
              >
                Off
              </Button>
            </ButtonGroup>
          </FormGroup>
          <FormGroup className={this.state.options.useGradient ? '' : 'hidden'}>
            <Label className='input-group-label' for='gradient'>Gradient Mode:</Label>
            <Input
              id='gradient'
              bsSize='sm'
              type='select'
              defaultValue={5}
              onChange={e => this.handleOptionChange(e.target)}
            >
              {this.allGradientFunctions.map((f, i) => (
                <option value={i}>{f.name}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup className={this.state.options.useGradient ? '' : 'hidden'}>
            <Label className='input-group-label' for='gradientNegativeFactor'>Gradient Negative Factor:</Label>
            <input
              id='gradientNegativeFactor'
              type='range'
              step='0.001'
              min='0'
              max='0.1'
              defaultValue={this.state.options.gradientNegativeFactor}
              onChange={e => this.inputHandler(e.target)}
            />
          </FormGroup>
          <FormGroup className={this.state.options.useGradient ? '' : 'hidden'}>
            <Label className='input-group-label' for='gradientPositiveFactor'>Gradient Positive Factor:</Label>
            <input
              id='gradientPositiveFactor'
              type='range'
              step='0.001'
              min='0'
              max='0.1'
              defaultValue={this.state.options.gradientPositiveFactor}
              onChange={e => this.inputHandler(e.target)}
            />
          </FormGroup>
          <FormGroup>
            <Button
              color='secondary'
              onClick={this.forceRegenerate.bind(this)}
            >
              Regenerate Points
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default App;
