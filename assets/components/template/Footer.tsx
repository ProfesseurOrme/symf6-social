import React from "react";
import {Col, Container, Row } from "react-bootstrap";
import {FaReact, FaSymfony} from "react-icons/fa";

const AppFooter : React.FunctionComponent = () => {
    return (
        <Container>
            <Row >
                <Col className={"text-center vertical-align-center"}>
                    <p className={"text-black m-1"}>Made with Symfony <FaSymfony /> and React <FaReact /> - Github <a href={"#"}>repo</a> - ProfesseurOrme</p>
                </Col>
            </Row>
        </Container>
    )
}

export default AppFooter;