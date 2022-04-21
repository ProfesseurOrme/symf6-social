import {Spinner} from "react-bootstrap";
import React from "react";

const SpinnerApp = () => {
    return (
        <Spinner style={{
            width: "5rem",
            height: "5rem",
            border: "0.5em solid currentColor",
            borderRight: ".5em solid transparent",
            borderRadius: "50%",
        }} animation={"border"} variant={"light"}/>
    )
}

export default SpinnerApp;