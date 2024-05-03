import React, { useState, useEffect } from 'react'
import LigneArticle from '../../components/article/ligneArticle'
import { getDataArray, isAuthorised } from '../../services/api/api'
import ReactPaginate from 'react-paginate';
import ModalAjoutArticle from '../../components/article/modalAjoutArticle';
import SideBar from '../../components/general/sideBar';
import Footer from '../../components/general/footer';

export default function Articles() {



    const [articles, setArticles] = useState([])



    const [dataModified, setDataModified] = useState(false)
    const [showAjout, setShowAjout] = useState(false)
    const [mesArticles, setMesArticles] = useState(false)
    const [searchWord, setSearchWord] = useState('')



    /*Pagination*/
    const itemsPerPage = 5  

    const [itemOffset, setItemOffset] = useState(0);

    async function displayListeArticle() {

        if (mesArticles === true) {
            setArticles([])
            setArticles(await getDataArray('userarticles'))
            return
        }

        if (searchWord.trim() === "") {
            if(isAuthorised(['ROLE_ADMIN'])) {
                setArticles([])
                setArticles(await getDataArray('articles/admin'))
            }
            else{
                setArticles([])
                setArticles(await getDataArray('articles'))
            }
           
        }
        else {
            if (isAuthorised(['ROLE_ADMIN'])) 
                {
                    setArticles([])
                    setArticles(await getDataArray('articles/' + searchWord + '/admin'))

                }
                else 
                {
                    setArticles([])
                    setArticles(await getDataArray('articles/' + searchWord))

                }
        }

    }


    const ajouter = () => {
        setShowAjout(true)
    }

    useEffect(() => {

        setDataModified(false)
        displayListeArticle()
        setItemOffset(0)

        /*Pagination*/


    }, [mesArticles, dataModified])

    const handleChange = (event) => {

        setSearchWord(event.currentTarget.value)

    }

    const rechercher = (e) => {
        e.preventDefault()
        setDataModified(true)
    }

    const showMesArticles = () => {
        const bool = mesArticles ? false : true
        setMesArticles(bool)
    }

    /*Pagination*/
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % articles.length;
        setItemOffset(newOffset);
    };

    const endOffset = itemOffset + itemsPerPage;

    const articlesEnCours = articles.slice(itemOffset, endOffset);
    const pageCount = (Math.ceil(articles.length / itemsPerPage));
    return (
        <>
            <SideBar />
            <div className="container" style={{ textAlign: 'center', paddingTop: '75px' , paddingBottom: '3rem'  }}>
                <form onSubmit={rechercher}>
                    <div className="row">
                        <div className="col-7 offset-2">
                            <input className="form-control" onChange={handleChange} type="text" content="Search" placeholder="Rechercher un article" name="nom_saisi" />
                        </div>
                        <div className="col-1">
                            <button className="btn btn-primary"> <i className="bis bi-search"></i></button>
                        </div>

                    </div>
                </form>
                {articles === undefined || articles.length === 0

                    ?
                    <h1 style={{ marginTop: '5%' }}>Aucun articles trouvés </h1>
                    :
                    <div className="card-columns listrecent">

                        {articlesEnCours.map((article, index) => {
                            return (
                                <div key={index} className="card">
                                    <LigneArticle mesArticles={mesArticles} index={index} article={article} setDataModified={setDataModified} />
                                </div>
                            )
                        })}


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
                }
                {
                    isAuthorised(['ROLE_ADMIN', 'ROLE_EDITOR'])
                        ?
                        <>
                            <ModalAjoutArticle show={showAjout} setShow={setShowAjout} setDataModified={setDataModified} />
                            <a onClick={ajouter} className="floatWrite">
                                <i className="bi bi-vector-pen my-float" />
                            </a>
                            {
                                mesArticles === false
                                    ?
                                    <>
                                        <a onClick={
                                            showMesArticles
                                        } className="floatRead">
                                            <i className="bi bi-newspaper my-float" />
                                        </a>
                                    </>
                                    :
                                    <>
                                        <a onClick={
                                            showMesArticles
                                        } className="floatRead">
                                            <i className="bi bi-arrow-left my-float" />
                                        </a>
                                    </>

                            }

                        </>
                        :
                        <></>
                }

            </div>
            <Footer/>
        </>

    )
}
