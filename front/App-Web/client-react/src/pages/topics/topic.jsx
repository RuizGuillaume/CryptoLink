import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SideBar from '../../components/general/sideBar';
import LigneTopic from '../../components/topic/ligneTopic';
import { getDataArray, getInfoUser, isAuthorised, post } from '../../services/api/api';
import { getImageUrl } from '../../services/env';
import dateFormat from "dateformat";
import ReactPaginate from 'react-paginate';
import ModerationPost from '../../components/topic/moderationpost';
import { toast } from 'react-toastify';
import Footer from '../../components/general/footer';


export default function Topic() {
  let location = useLocation();
  const topic = location.state || {}
  toast.configure()



  const [posts, setPosts] = useState([])
  const [dataModified, setDataModified] = useState(false)
  const [itemOffset, setItemOffset] = useState(0);
  const [user, setUser] = useState({})

  const [reponse, setReponse] = useState({post : ''})

  const getPosts = async () => {

    if (isAuthorised(['ROLE_MODERATOR', 'ROLE_ADMIN'])) {
      setPosts(await getDataArray('posts/' + topic.id_topic + '/moderate'))
    }
    else {
      setPosts(await getDataArray('posts/' + topic.id_topic))
    }
  }

  const getUser = async () => {
    setUser(await getInfoUser(false))
  }

  useEffect(() => {
    getUser()
    getPosts()
    setDataModified(false)
  }, [dataModified])


  const handleChange = (event) => {

    const value = event.currentTarget.value
    const name = event.currentTarget.name

    setReponse({ ...reponse, [name]: value })
  }

  const poster = async (e) => {
    e.preventDefault()

    if (reponse.post === undefined && reponse.post === null && reponse.post.trim().length()) {
      toast.error('Atention , vous devez saisir du texte pour pouvoir poster un commentaire')
    }
    reponse.writing_date = new Date()

    let response = await post('post/' + topic.id_topic , reponse )
    if (response.status === 200) {
      toast.success('Votre commentaire a bien été posté')
      setReponse({ ...reponse, ['post']: '' })
      setDataModified(true)
    }
  }

  /* paginate */

  const itemsPerPage = 5

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };


  const endOffset = itemOffset + itemsPerPage;

  const postsEncours = posts.slice(itemOffset, endOffset);
  const pageCount = (Math.ceil(posts.length / itemsPerPage));

  return (
    <>
      <SideBar />
      <div className='container' style={{ paddingTop: '5rem' , paddingBottom: '3rem'  }}>
        <LigneTopic setDataModified={setDataModified} topic={topic} isConsulted={true} />
        <br />
        {postsEncours === undefined || postsEncours.length === 0
          ?
          <></>
          :


          postsEncours.map((post, index) => {
            return (
              <div key={index}>
                <div key={index} className="comment-widgets m-b-20">
                  <div className="d-flex flex-row comment-row">
                    <div className="p-2"><span className="round"><img src={getImageUrl() + post.avatar} alt="user" width="50" /></span></div>
                    <div className="comment-text w-100">
                      <h5>{post.pseudo}</h5>
                      <div className="comment-footer"> <span className="date">{dateFormat(new Date(post.writing_date), 'dd/mm/yy à HH:MM')} </span> </div>
                      <p className="m-b-5 m-t-10">{post.post}</p>

                    </div>
                    <ModerationPost post={post} setDataModified={setDataModified} />

                  </div>
                </div>
              
              </div>
            )
          })

        }

        {
          !topic.closed 
          ?
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
                      <form onSubmit={poster}>

                        <textarea value={reponse.post} className="form-control" name="post" placeholder="Votre commentaire" required={true} onChange={handleChange}></textarea>
                        <button className='btn btn-primary' style={{ marginTop: '15px' }}>Répondre</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
            :
            <></>
        }
      

        <ReactPaginate
          breakLabel="..."
          nextLabel="&raquo;"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
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


      </div>
      <Footer />

    </>
  )
}
