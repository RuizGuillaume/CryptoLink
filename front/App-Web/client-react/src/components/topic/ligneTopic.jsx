import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../../services/env'
import dateFormat from "dateformat";

import { Link } from 'react-router-dom';
import { isAuthorised, put } from '../../services/api/api';
import ModalModificationTopic from './modalModificationTopic';
import ModalSuppressionTopic from './modalSuppressionTopic';

export default function LigneTopic(props) {
    let topic = props.topic



    const [showModify, setShowModify] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {

        setShowModify(false)        
        setShowDelete(false)

    }, [props.dataModified])

    const cloture = async () => {

        if (topic.is_owned || isAuthorised(['ROLE_ADMIN', 'ROLE_MODERATOR'])) {
            topic.closed = topic.closed ? false : true
            const response = await put('topic/' + topic.id_topic, topic)
            props.setDataModified(true)
        }

    }
    return (
        <div className="row mt-5 mx-2" >
            <div className="post-list">
                <div className="row">
                    <div className="col-sm-1">
                        <div className="picture">
                            <img style={{ borderRadius: '100%' , maxWidth : '100px' }} className='thumbnail' src={getImageUrl() + topic.avatar} />
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <h4>
                            <a hre="#" className="username">{topic.title}</a>
                            <label style={{ marginLeft: '5px' }} className="badge rounded-pill bg-primary">#{topic.category_name}</label>
                            {
                                topic.closed
                                    ?
                                    <a onClick={cloture}><label style={{ marginLeft: '5px' }} className="badge rounded-pill bg-danger">Cloturé</label></a>

                                    :
                                    <a onClick={cloture}><label style={{ marginLeft: '5px' }} className="badge rounded-pill bg-success">Ouvert</label></a>

                            }

                            {isAuthorised(['ROLE_ADMIN'])
                                ?
                                <>
                                        <a className='mx-2' onClick={() => {
                                            setShowModify(true)
                                        }} >
                                            <i className="bi bi-pen-fill my-float" />
                                        </a>
                                        <ModalModificationTopic show={showModify} setShow={setShowModify} topic={topic} setDataModified={props.setDataModified} />

                                        <a  onClick={() => {
                                            setShowDelete(true)
                                        }} >
                                            <i className="bi bi-trash-fill my-float" />
                                        </a>
                                        <ModalSuppressionTopic  show={showDelete} setShow={setShowDelete} topic={topic} setDataModified={props.setDataModified} />
                                </>
                                :
                                <></>
                            }
                        </h4>


                        <p>
                            <i className="bi bi-calendar2-event"> </i>
                            {
                                dateFormat(topic.publish_date, "dd/mm/yyyy")
                            } par {topic.pseudo}
                        </p>
                        {topic.content === undefined || topic.content == null || topic.content.length === 0 ?
                            <></>
                            :
                            topic.content.length > 254 && (props.isConsulted === undefined || !props.isConsulted) ?
                                <>
                                    <p className="description">{topic.content.substring(0, 254)}... </p>
                                </>
                                :

                                <>
                                    <p className="description">{topic.content}</p>
                                </>


                        }
                    </div>
                    {
                        props.isConsulted === undefined || props.isConsulted === false
                            ?
                            <div className="col-sm-4">
                                <Link to={"/topic"} state={topic} className="btn btn-outline-dark btnPost btn-download btn-round pull-right">
                                    Consulter <i className="bi bi-arrow-right-circle"></i>
                                </Link>
                            </div>
                            : <></>
                    }

                </div>
            </div>
        </div>
    )
}
