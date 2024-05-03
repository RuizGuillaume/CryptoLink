import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { post, postMultipart } from '../../services/api/api';
import { Editor } from "react-draft-wysiwyg";
import { EditorState  , convertToRaw, ContentState   } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function ModalAjoutArticle(props) {

    toast.configure()
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [credentials, setCredentials] = useState({ title: '', publish_date : '', content: '' , thumbnailfile : null })
    const handleClose = () => props.setShow(false);

    const ajouter = async (e) => {
        e.preventDefault()
        credentials.content = draftToHtml(convertToRaw(editorState.getCurrentContent()))

        let formData = new FormData();    //formdata object

        
        formData.set('title',  credentials.title);
        formData.set('publish_date',  credentials.publish_date); 
        formData.set('content',  credentials.content); 
        formData.append('thumbnailfile',  credentials.thumbnailfile);    //append the values with key, value pair
        let response = await postMultipart( 'article' , formData);

        if( response === 200  ) {
            toast.success('Votre article a été crée avec succès')
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

        const value = event.currentTarget.value
        const name = event.currentTarget.name

        setCredentials({ ...credentials, [name]: value })
    }

    
    const onEditorStateChange = (editState) => {
        setEditorState(editState)
    }

    return (


        <>
            <Modal dialogClassName="modalArticle" show={props.show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Ajouter un article</Modal.Title>
                </Modal.Header>
                <form  onSubmit={ajouter} >
                    <Modal.Body>

                        <label>Titre</label>
                        <input className='form-control col-md-6' value={credentials.title} onChange={handleChange} name="title" type="text" placeholder='Titre' required={true} />

                        <label>Date de publication</label>
                        <input className='form-control col-md-6' value={credentials.publish_date} onChange={handleChange} name="publish_date" type="date"  required={true} />

                        <div className="form-outline form-white">
                            <label >Image</label>
                            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleInputFileChange} name="thumbnailfile" className="form-control" />
                        </div>
                        <br/>
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
                            Ajouter
                        </button>

                        <button className="btn btn-secondary" onClick={handleClose}>
                            Fermer
                        </button>

                    </Modal.Footer>
                </form>

            </Modal>
        </>
    )
}
