// triangulator2-app
// Copyright 2019 jackw01. Released under the MIT License (see LICENSE for details).

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Triangulator from 'triangulator2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.run();
  }

  run() {

  }

  generateSVG(element) {
    const svgString = Triangulator.generate({
      svgInput: element,
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
    });

    console.log(svgString);
  }

  render() {
    return (
      <div className='main h-100'>
        <Container className='app h-100 d-flex flex-column' fluid>
          <svg ref={this.generateSVG} />
        </Container>
      </div>
    );
  }
}

export default App;
