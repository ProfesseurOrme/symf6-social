import React from "react";
import PictureApi from "../../services/pictureApi";
import {IPictureData} from "../../types/IPictureData";
import {useParams} from "react-router-dom";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import ErrorMessage from "../../components/error/ErrorMessage";

type IInitialStatePicture = {
    item: IPictureData | null,
    loaded: boolean,
    error: {
        code: number | null,
        message: string | null
    }
}

const initialStatePicture: IInitialStatePicture = {
    item: null,
    loaded: false,
    error: {
        code: null,
        message: null
    },
}

const Picture: React.FunctionComponent = () => {

    const [ picture, setPicture ] = React.useState<IInitialStatePicture>(initialStatePicture);
    const {id} = useParams();
    const pictureRepo = new PictureApi();

    React.useEffect(() => {
        pictureRepo.findOne(`/api/pictures/${id}`)
            .then(results => {
                setPicture(prevState => ({
                    ...prevState,
                    item: results.data,
                    loaded: true
                }))
            })
            .catch(error => {
                setPicture(prevState => ({
                    ...prevState,
                    error: {
                        code: error.response.status,
                        message: error.response.data["hydra:description"]
                    },
                    loaded: true
                }))
            })
    }, [])

    return (
        <>
            {!picture.loaded ?
                <Row>
                    <Col className={"text-center"}>
                        <Spinner style={{
                            width: "5rem",
                            height: "5rem",
                            border: "0.5em solid currentColor",
                            borderRight: ".5em solid transparent",
                            borderRadius: "50%",
                        }} animation={"border"} variant={"light"}/>
                    </Col>
                </Row>

                :

                picture.item !== null && picture.error.code === null && picture.error.message === null ?
                    <Row>
                        <Col className={"picture"}>
                            <Card>
                                <Card.Img variant="top" src={picture.item.image}/>
                                <Card.Body>
                                    <Card.Text className={"mx-3"}>
                                        From : <strong>{picture.item.user.username}</strong>
                                    </Card.Text>
                                    <Card.Text className={"mx-3"}>
                                        {picture.item.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    :

                    <Row>
                        <Col className={"text-center"}>
                            <ErrorMessage code={picture.error.code} message={picture.error.message}/>
                        </Col>
                    </Row>
            }
        </>
    )
}

export default Picture;