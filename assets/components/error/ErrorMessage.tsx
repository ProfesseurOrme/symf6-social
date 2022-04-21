import React from "react";
import {Button, Card} from "react-bootstrap";

type ErrorMessageProps = {
    code: number,
    message: string
}

const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = (props) => {

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <Card className="text-center card-error">
            <Card.Body>
                <Card.Title>Error : <strong>{props.code}</strong></Card.Title>
                <Card.Text>
                    {props.message}
                </Card.Text>
                <Button onClick={refreshPage} variant="primary">Reload page</Button>
            </Card.Body>
        </Card>
    )
}

export default ErrorMessage;