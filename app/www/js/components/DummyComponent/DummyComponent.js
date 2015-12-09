import React, { Component, PropTypes } from 'react';

class DummyComponent extends Component {

  render() {
    return (
      <div>
        <div className="counter" onClick={this.props.dummyActions.increment.bind(this)}>
          {this.props.dummy.counter}
        </div>
      </div>);
  }
}

DummyComponent.propTypes = {
  dummyActions: PropTypes.object,
  dummy: PropTypes.object,
};

export default DummyComponent;
