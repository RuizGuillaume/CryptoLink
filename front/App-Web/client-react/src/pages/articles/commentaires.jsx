import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import ModerationCommentaire from '../../components/article/moderationCommentaire';
import { getDataArray, isAuthorised, put } from '../../services/api/api'
import { getImageUrl } from '../../services/env';



export default function Commentaires(props) {

    const [commentaires, setCommentaires] = useState([])
    const [dataReceived, setDataReceived] = useState(false)
    const [dataModified, setDataModified] = useState(false)

    /*Pagination*/
    const itemsPerPage = props.pageCount

    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {

        setDataReceived(false)
        setDataModified(false)
        displayListeCommentaires()
        props.setDataModified(false)
        /*Pagination*/
    }, [dataModified, props.dataModified, props.pageCount])

    async function displayListeCommentaires() {
        if (dataReceived === false) {
            if (isAuthorised(['ROLE_MODERATOR', 'ROLE_ADMIN'])) {
                setCommentaires(await getDataArray('comments/' + props.articleId + '/moderate'))
            }
            else {
                setCommentaires(await getDataArray('comments/' + props.articleId))
            }
            setDataReceived(true)
        }
        else {
            setDataReceived(false)
        }
    }


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % commentaires.length;
        setItemOffset(newOffset);
    };


    const endOffset = itemOffset + itemsPerPage;

    const commentairesEnCours = commentaires.slice(itemOffset, endOffset);
    const pageCount = (Math.ceil(commentaires.length / itemsPerPage));


    return (
        <>
            {commentairesEnCours.map((commentaire, index) => {
                return (

                    <div key={index}>
                        <div className="comment-widgets m-b-20">
                            <div className="d-flex flex-row comment-row">
                                <div className="p-2"><span className="round"><img src={getImageUrl() + commentaire.avatar} alt="user" width="50" /></span></div>
                                <div className="comment-text w-100">
                                    <h5>{commentaire.pseudo}</h5>
                                    <div className="comment-footer"> <span className="date">{new Date(commentaire.writing_date).toLocaleDateString('fr-FR', { weekday: "long", year: "numeric", month: "long", day: "numeric" })} </span> </div>
                                    <p className="m-b-5 m-t-10">{commentaire.comment}</p>

                                </div>
                                <ModerationCommentaire commentaire={commentaire} setDataModified={props.setDataModified} />

                            </div>
                        </div>
                        <br />
                    </div>



                )
            })}
            <ReactPaginate
                breakLabel="..."
                nextLabel="&raquo;"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="&laquo;"
                renderOnZeroPageCount={null}
                activeClassName='active'
                containerClassName='pagination pagination-lg'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
            />
        </>
    )
}