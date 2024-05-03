import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { isAuthorised, putMultipart } from '../../services/api/api';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { convertFromHTML } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';


export default function ModalModificationArticle(props) {
    toast.configure()
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(props.article.content))))
    const [credentials, setCredentials] = useState({ title: props.article.title, publish_date: new Date(props.article.publish_date).toLocaleString('sv').split(' ')[0], content: '', thumbnailfile: null, visible: props.article.visible })


    const handleClose = () => props.setShow(false);
    const modifier = async (e) => {
        e.preventDefault()
        credentials.content = draftToHtml(convertToRaw(editorState.getCurrentContent()))

        let formData = new FormData();    //formdata object

        formData.set('title', credentials.title);
        formData.set('publish_date', credentials.publish_date.toString());
        formData.set('visible', credentials.visible);
        formData.set('content', credentials.content);
        formData.append('thumbnailfile', credentials.thumbnailfile);    //append the values with key, value pair

        let response = await putMultipart('article/' + props.article.id_article, formData);

        if (response === 200) {
            toast.success('l\'article a été modifié avec succès')
            props.setDataModified(true)
            props.setShow(false)
        }
        else {
            toast.error('Une erreur est survenue')
        }
    }



    const handleInputFileChange = (event) => {
        setCredentials({ ...credentials, [event.currentTarget.name]: event.target.files[0] })
    }


    const handleChange = (event) => {

        let value = event.currentTarget.value
        const name = event.currentTarget.name
        if(name === 'visible'){
            value = credentials.visible === true ? false : true
        } 

        setCredentials({ ...credentials, [name]: value })
    }


    const onEditorStateChange = (editState) => {
        setEditorState(editState)
    }

    return (


        <>
            <Modal id={"modalModif" + props.index} dialogClassName="modalArticle" show={props.show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modifier cet article</Modal.Title>
                </Modal.Header>
                <form onSubmit={modifier} >
                    <Modal.Body>


                        <label>Titre</label>
                        <input className='form-control col-md-6' value={credentials.title} onChange={handleChange} name="title" type="text" placeholder='Titre' required={true} />

                        <label>Date de publication</label>
                        <input className='form-control col-md-6' value={credentials.publish_date} onChange={handleChange} name="publish_date" type="date" required={true} />

                        <div className="form-outline form-white">
                            <label >Image (ne rien renseigner pour conserver l'image en cours)</label>
                            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleInputFileChange} name="thumbnailfile" className="form-control" />
                        </div>
                        <br />

                        {
                            isAuthorised(['ROLE_ADMIN', 'ROLE_EDITOR'])
                                ?

                                <div className="form-check">
                                    <input className='form-check-input col-md-6' value={credentials.visible} onChange={handleChange} name="visible" type="checkbox" defaultChecked={credentials.visible} />
                                    <label className="form-check-label" >
                                        Visible
                                    </label>
                                </div>

                                :
                                <></>
                        }


                        <br />
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                        />

                        
                    </Modal.Body>
                    <Modal.Footer>

                        <button className="btn btn-primary" type="submit">
                            Modifier
                        </button>

                        <button className="btn btn-secondary" type="button" onClick={handleClose}>
                            Fermer
                        </button>

                    </Modal.Footer>
                </form>

            </Modal>
        </>
    )
}
