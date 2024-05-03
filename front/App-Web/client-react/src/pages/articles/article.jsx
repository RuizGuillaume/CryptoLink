import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getImageUrl } from '../../services/env';
import Commentaires from './commentaires';
import { getInfoUser, post } from '../../services/api/api'
import RadioButton from '../../components/general/radioButton';
import { toast } from 'react-toastify';
import ModalAjoutArticle from '../../components/article/modalAjoutArticle';
import SideBar from '../../components/general/sideBar';
import Footer from '../../components/general/footer';

export default function Article(props) {
  let location = useLocation();
  const article = location.state || {}
  toast.configure()

  const [user, setUser] = useState({})
  const [pageCount, setPageCount] = useState(5)
  const [commentaire, setCommentaire] = useState({ comment: '', })
  const [dataModified, setDataModified] = useState(false)
  const [showAjout, setShowAjout] = useState(false)

  const handleChangePaginationCount = (e) => {
    setPageCount(e.currentTarget.value)
  }
  const getUser = async () => {
    setUser(await getInfoUser(false))
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleChange = (event) => {

    const value = event.currentTarget.value
    const name = event.currentTarget.name

    setCommentaire({ ...commentaire, [name]: value })
  }

  const commenter = async (event) => {


    event.preventDefault()

    if (commentaire.comment === undefined && commentaire.comment === null && commentaire.comment.trim().length()) {
      toast.error('Atention , vous devez saisir du texte pour pouvoir poster un commentaire')
    }
    commentaire.writing_date = new Date()

    let response = await post('comment/' + article.id_article, commentaire)
    if (response.status === 200) {
      toast.success('Votre commentaire a bien été posté')
      setDataModified(true)
      setCommentaire({ ...commentaire, ['comment']: '' })
    }

  }


  return (
    <>
      <SideBar />
      <div className='container' >
        <div style={{ textAlign: 'center', paddingTop: '10%' , paddingBottom: '3rem' }}>


          <h1 >{article.title}</h1>
          <br />
          <img className='img-fluid' width={800} height={200} style={{ marginBottom: '5%' }} src={getImageUrl() + article.thumbnail} />
          <br />
        </div>

        <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: article.content }} />
        <br />
        <h3 className='barre' >&nbsp;</h3>
        <br />

        {
          user === null || user === undefined ?
            <>
              <h4 style={{ textAlign: 'center' }}><a href='/login'>Connectez vous pour poster un commentaire</a></h4>
            </>
            :
            <>
              <div className="comment-widgets m-b-20">
                <div className="d-flex flex-row">
                  <div className="p-2"><span className="round"><img src={getImageUrl() + user.avatar} alt="user" width="50" /></span></div>
                  <div className="comment-text w-100">
                    <h5>{user.pseudo}</h5>
                    <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                      <form onSubmit={commenter}>

                        <textarea className="form-control" name="comment" placeholder="Votre commentaire" required={true} onChange={handleChange}></textarea>
                        <button className='btn btn-primary' style={{ marginTop: '15px' }}>Commenter</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>


              <div style={{ float: 'right' }}>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">

                  <RadioButton id="btnPagination5" value={5} display="5" name="paginationCount" change={handleChangePaginationCount} defaultChecked={true} />

                  <RadioButton id="btnPagination10" value={10} display="10" name="paginationCount" change={handleChangePaginationCount} defaultChecked={false} />

                  <RadioButton id="btnPagination15" value={15} display="15" name="paginationCount" change={handleChangePaginationCount} defaultChecked={false} />

                </div>
              </div>
            </>
        }


        <h3 className='barre' style={{ paddingTop: '25px' }} >&nbsp;
        </h3>
        <br />
        <Commentaires dataModified={dataModified} setDataModified={setDataModified} articleId={article.id_article} pageCount={pageCount} />
        

        <ModalAjoutArticle show={showAjout} setShow={setShowAjout} setDataModified={setDataModified} />

      </div>
      <Footer />
    </>

  )
}
