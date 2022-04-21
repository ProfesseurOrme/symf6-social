import React from "react";
import {Button, Card, Col, Stack} from "react-bootstrap";
import {IPictureData} from "../../types/IPictureData";
import {BsHeart} from "react-icons/bs";
import {FaComment} from "react-icons/fa";
import {Link} from "react-router-dom";
import PictureApi from "../../services/pictureApi";

const PictureCard: React.FunctionComponent<IPictureData> = (props) => {

    return (
        <>
            <Col>
                <Link to={`/pictures/${props.id}`}>
                    <Card>
                        <Card.Img variant="top" src={props.image}/>
                        <Card.Body>
                            <Stack direction="horizontal" gap={4} className={"card-social mx-auto"}>
                                <div className={"card-social-btn comments"}>
                                    <FaComment/> {props.comments.length}
                                </div>
                                <div className={"card-social-btn likes"}>
                                    <BsHeart/> {props.likes.length}
                                </div>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        </>
    )
}

export default PictureCard;