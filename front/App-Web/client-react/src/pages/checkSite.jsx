import React, { useEffect, useState } from 'react'
import SideBar from '../components/general/sideBar'
import { getDataArray, isAuthorised } from '../services/api/api';
import ReactPaginate from 'react-paginate';
import FormulaireContactCheckSite from '../components/checkSite/formulaireContactCheckSite';
import Footer from '../components/general/footer';

export default function CheckSite() {
  const [websites, setWebsites] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [dataModified, setDataModified] = useState(false)
  const [showFormulaire, setshowFormulaire] = useState(false)


  useEffect(() => {
    getWebsite()
    setDataModified(false)
    setshowFormulaire(false)
  }, [dataModified])



  const handleChange = (event) => {

    setSearchWord(event.currentTarget.value)

  }

  const rechercher = (e) => {
    e.preventDefault()
    setDataModified(true)
  }

  const getWebsite = async () => {
    if (searchWord !== undefined && searchWord !== null && searchWord.trim() !== '') {
      let datasArray = await getDataArray('websites/' + searchWord)
      setWebsites(datasArray)
    }
    else {
      setWebsites([])

    }
  }


  /*Pagination*/
  const itemsPerPage = 5
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % websites.length;
    setItemOffset(newOffset);
  };

  const endOffset = itemOffset + itemsPerPage;

  const websitesEnCours = websites.slice(itemOffset, endOffset);
  const pageCount = (Math.ceil(websites.length / itemsPerPage));

  return (
    <>
      <SideBar />
      <div className='container' style={{ paddingTop: '5rem', textAlign: 'center' }}>
        {showFormulaire ?
          <>
            <FormulaireContactCheckSite setshowFormulaire={setshowFormulaire} />

          </>

          :

          <>
            <h3>Check-site</h3>
            <form onSubmit={rechercher}>
              <div className="row mt-4">
                <div className="col-7 offset-2">
                  <input className="form-control" onChange={handleChange} type="text" content="Search" placeholder="Rechercher votre site ici" name="nom_saisi" />
                </div>
                <div className="col-1">
                  <button className="btn btn-primary"> <i className="bis bi-search"></i></button>
                </div>

              </div>
            </form>
            <div>
              {websitesEnCours === undefined || websitesEnCours.length === 0
                ?
                  isAuthorised(['ROLE_USER']) ?
                  <p style={{ marginTop: '5%' }}>Aucun sites trouvés n'hésitez pas à contacter un administrateur avec ce <a style={{ textDecoration: 'underline' }} onClick={() => { setshowFormulaire(true) }}> formulaire <i className="bi bi-send"></i></a></p>
                  :
                  <></>
                :
                <>
                  <br />
                  {websites.map((website, index) => {
                    return (
                      <div key={index} className='row my-2 border-bottom'>
                        {website.fraudulent === undefined || website.fraudulent
                          ?
                          <div style={{ color: 'red' }} className='col-6'><i className="bi bi-x"></i> {website.url}</div>

                          :
                          <div style={{ color: 'green' }} className='col-6'><i className="bi bi-check2"></i> {website.url} </div>

                        }
                        <div className='col-4'>(vérifié par {website.pseudo})</div>

                      </div>

                    )
                  })}
                  {pageCount > 1
                    ?
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="&raquo;"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={1}
                      pageCount={pageCount}
                      previousLabel="&laquo;"
                      renderOnZeroPageCount={null}
                      activeClassName='active'
                      containerClassName='pagination pagination'
                      pageClassName='page-item'
                      pageLinkClassName='page-link'
                      previousClassName='page-item'
                      previousLinkClassName='page-link'
                      nextClassName='page-item'
                      nextLinkClassName='page-link'
                    />
                    :
                    <></>
                  }

                </>


              }
            </div>
            {isAuthorised(['ROLE_USER'])
              ?
              <a onClick={() => {
                setshowFormulaire(true)
              }}
                className="floatRead">
                <i className="bi bi-send my-float" />
              </a>
              :
              <>
                <p className='mt-5' >Connectez vous pour envoyer une demande à un admin en cliquant <a href='/login'>ici</a></p>
              </>
            }

          </>
        }
      </div>
      <Footer/>

    </>
  )
}
