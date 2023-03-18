import React, { useState } from "react";

import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Films from "../../Films";
import "./style.css";

const Movie = () => {
  const [userInput, setUserInput] = useState("");
  const [hasUserSubmitted, setSubmissionStatus] = useState(false);
  return (
    <div>
      <p className="films-analysis-service">Films Analysis Service </p>
      <form
        id="input-form"
        onSubmit={(event) => {
          event.preventDefault();
          console.log("value");
          setSubmissionStatus(true);
        }}
      >
        <div
          className="director-name-input-box"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Input
            id="input-box"
            className="enter-director-name"
            placeHolder="Enter director name"
            onChange={(value) => {
              setSubmissionStatus(false);
              setUserInput(value);
            }}
            value={userInput}
            enterKeyEvent={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
        </div>
        <Button type="submit" className="submit-button">
          <span className="submit-button-text" style={{ marginLeft: 0 }}>
            Submit
          </span>
        </Button>
      </form>
      {hasUserSubmitted && <Films directorName={userInput} />}
    </div>
  );
};

export default Movie;
