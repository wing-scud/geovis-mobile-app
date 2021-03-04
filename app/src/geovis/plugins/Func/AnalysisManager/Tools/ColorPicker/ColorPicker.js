import React from "react";
import reactCSS from "reactcss";
import style from "./ColorPicker.css";
import { SketchPicker } from "react-color";
import { observer } from "mobx-react";

@observer
class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    displayColorPicker: false,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1"
    }
  };
  handleChangeComplete = color => {
    this.setState({ background: color.hex });
  };
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ color: color.rgb });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`
        }
      }
    });
    return (
      <div>
        <div className={style.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div className={style.popover}>
            <div className={style.cover} onClick={this.handleClose} />
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    );
  }
}
export default ColorPicker;
