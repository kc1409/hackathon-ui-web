import React, { useState } from "react";
import { Container, Drawer } from "@material-ui/core";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import "./../App.css";

const Terms = () => {
  const [agree, setAgree] = useState(false);

  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree);
    // Don't miss the exclamation mark
  };

  // When the button is clicked
  const btnHandler = () => {
    alert("The buttion is clickable!");
  };

  return (
    <div className="App">
      <div className="container">
        <div>
          <Container style={{ paddingTop: 12 }}>
            <TextareaAutosize
              maxRows={14}
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua."
              style={{ width: 358, height: 50 }}
            />
          </Container>
          <input type="checkbox" id="agree" onChange={checkboxHandler} />
          <label htmlFor="agree">
            I agree to <b>terms and conditions</b>
          </label>
        </div>

        {/* Don't miss the exclamation mark* */}
        <Container style={{ marginTop: 36 }}>
          <Button
            variant="Outlined"
            style={{ backgroundColor: "#A3BCF9" }}
            onClick={btnHandler}
            disabled={!agree}
          >
            Let's Begin
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Terms;
