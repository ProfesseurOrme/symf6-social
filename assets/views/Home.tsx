import React from "react";
import PictureApi from "../services/pictureApi";
import {IPictureData} from "../types/IPictureData";
import {Col, Row, Spinner} from "react-bootstrap";
import PictureCard from "../components/picture/PictureCard";

type IInitialStatePictures = {
    items: IPictureData[] | null,
    totalItems: number,
    currentPage: number,
    loaded: boolean
}

const initialStatePictures: IInitialStatePictures = {
    currentPage: 1,
    items: [],
    totalItems: 0,
    loaded: false
}

const Home: React.FunctionComponent = () => {

    const [ pictures, setPictures ] = React.useState<IInitialStatePictures>(initialStatePictures)
    const pictureRepo = new PictureApi();

    React.useEffect(() => {
        pictureRepo.findAll("/api/pictures?page=1")
            .then(results => {
                setPictures({
                    currentPage: 1,
                    items: results.data["hydra:member"],
                    totalItems: results.data["hydra:totalItems"],
                    loaded: true
                })
            })
            .catch(errors => {
                console.log(errors);
            })
    }, [])

    return (
        <>
            {
                !pictures.loaded ?
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
                    <Row>
                        <div className={"pictures"}>
                            {
                                pictures.items.map(picture => (
                                    <PictureCard key={picture["@id"]} {...picture}/>
                                ))
                            }
                        </div>
                    </Row>
            }
        </>
    )
}

export default Home;