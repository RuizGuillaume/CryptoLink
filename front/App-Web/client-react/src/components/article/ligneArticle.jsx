import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthorised } from '../../services/api/api';
import { getImageUrl } from '../../services/env';
import ModalModificationArticle from './modalModificationArticle';
import ModalSuppresionArticle from './modalSuppresionArticle';



export default function LigneArticle(props) {

  const [show, setShow] = useState(false)
  const [showDelete, setShowDelete] = useState(false)


  useEffect(() => {
    setShow(false)
  }, [])

  const modifier = () => {
    setShow(true)
  }

  const supprimer = () => {
    setShowDelete(true)
  }

  const datePublication = new Date(props.article.publish_date)
  var options = { weekday: "long", year: "numeric", month: "long", day: "2-digit" };

  return (

    <div className="row">

      <div className="col-md-5 wrapthumbnail">

        <Link style={{ textDecoration: 'none' }} to={"/article"}

          state={props.article}>

          <img className="img-fluid" src={getImageUrl() + props.article.thumbnail} alt="" />

        </Link>
      </div>
      <div className="col-md-7">
        <div className="card-block">
          <h2 className="card-title"><Link style={{ textDecoration: 'none' }} to={"/article"} state={props.article}>{props.article.title}</Link></h2>
          {props.article.content === undefined || props.article.content == null || props.article.content.length === 0 ?
            <></>
            :
            props.article.content.length > 254 ?
              <>
                <h4 className="card-text" dangerouslySetInnerHTML={{ __html: props.article.content.substring(0, 254) + '...' }}></h4>
              </>
              :

              <>
                <h4 className="card-text" dangerouslySetInnerHTML={{ __html: props.article.content }}></h4>
              </>


          }


          <div className="wrapfooter">

            <span className="author-meta">
              <span className="post-date"><strong>publié le</strong> {datePublication.toLocaleDateString("fr-FR", options)}</span><span className="dot">            {
                props.mesArticles && isAuthorised(['ROLE_ADMIN', 'ROLE_EDITOR'])
                  ?
                  <>
                    <span><i onClick={() => {
                      setShow(true)
                    }} className='bi bi-pen-fill' /> </span>

                  </>
                  :

                  isAuthorised(['ROLE_ADMIN'])
                    ?
                    <>
                      {props.article.visible
                        ?
                        <label  className="badge rounded-pill bg-info">Visible</label>
                        :
                        <label  className="badge rounded-pill bg-info">Masqué</label>}

                      <span className='mx-2'><i onClick={modifier} className='bi bi-pen-fill' /> </span>
                      <span><i onClick={supprimer}className='bi bi-trash-fill' /> </span>
                    </>
                    :
                    <></>

              }</span>
            </span>
          </div>

        </div>
      </div>


      <ModalModificationArticle show={show} mesArticles={props.mesArticles} setShow={setShow} index={props.index} article={props.article} setDataModified={props.setDataModified} />
      <ModalSuppresionArticle setShow={setShowDelete} show={showDelete} index={props.index} article={props.article} setDataModified={props.setDataModified} />
    </div>
  )
}
