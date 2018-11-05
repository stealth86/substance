import React, { Component } from 'react';

export default class SVGComponent extends Component {
  render() {
    return <svg style={{position:'absolute'}} {...this.props} ref={el=>this.svg=el}>{this.props.children}</svg>;
  }
}