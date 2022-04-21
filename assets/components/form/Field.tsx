import React from "react";
import {Form} from "react-bootstrap";

type FieldProps = {
    name : string,
    value : string,
    type : string,
    placeholder? : string,
    size?: string,
    error : string | undefined
    onChange : () => void
}

const Field : React.FunctionComponent<FieldProps> = (props) => {
    return (
        <Form.Group>
            <Form.Label htmlFor={props.name}>{label}</Form.Label>
            <Form.Control
                value={props.value}
                onChange={props.onChange}
                type={props.type}
                size={props.size ? props.size : ''}
                placeholder={props.placeholder || label}
                name={props.name}
                id={props.name}
                className={"form-control" + (props.error && " is-invalid")}
            />
            {props.error && <p className="invalid-feedback">{props.error}</p>}
        </Form.Group>
    )
}

export default Field;