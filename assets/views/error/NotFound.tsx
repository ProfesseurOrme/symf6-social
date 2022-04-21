import React from "react";
import {Col, Row } from "react-bootstrap";
import ErrorMessage from "../../components/error/ErrorMessage";

const NotFound : React.FunctionComponent = () => {
    return (
        <Row>
            <Col className={"text-center"}>
                <ErrorMessage  code={404} message={"Whoops ! Your page does not exist"}/>
            </Col>
        </Row>
    )
}

export default NotFound;