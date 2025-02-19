"use client";

import React, { Component } from "react";
import Toggler from "./toggler";
import FeedbackForm from "./feedback-form";


class FloatingButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleOpen = () => {
    this.setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
    }));
  };

  render() {
    const {
      logo,
      imagePlaceHolder,
      apiUrl,
      apiKey,
      dimension,
      direction,
      distance,
      degree,
      backgroundColor,
      buttonColor,
      itemBackgroundColor,
      buttonType,
    } = this.props;
    return (
      <div style={{ position: "absolute", bottom:"25px" , right:"25px" }}>
        <Toggler
          buttonType={buttonType}
          dimension={dimension}
          backgroundColor={backgroundColor}
          buttonColor={buttonColor}
          toggleOpen={this.toggleOpen}
          isOpen={this.state.isOpen}
        />
        <FeedbackForm
          dimension={"100"}
          itemBackgroundColor={itemBackgroundColor}
          isOpen={this.state.isOpen}
          direction={direction}
          degree={degree}
          distance={distance}
          logo={logo}
          imagePlaceHolder={imagePlaceHolder}
          apiUrl={apiUrl}
          apiKey={apiKey}
          toggleOpen={this.toggleOpen}
        />
      </div>
    );
  }
}

export default FloatingButtons;
