import React, {Component, PropTypes} from 'react';
import color from 'color';
import mui from 'material-ui';
const FlatButton = mui.FlatButton;
const RaisedButton = mui.RaisedButton;

class Tag extends Component {
  render() {
    const {tag, selected, onChange} = this.props;
    let button;
    let c = color({r: tag.color[0], g: tag.color[1], b: tag.color[2]}).hexString();
    if (selected) {
      button = (<RaisedButton label={tag.label} primary={true} onClick={onChange} backgroundColor={c} />);
    } else {
      button = (<FlatButton label={tag.label} primary={true} onClick={onChange} style={{color:c}}/>);
    }
    return button;
  }
}

export default Tag;
