import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import LigneCheckSiteAdmin from '../../components/admin/checkSiteAdmin/ligneCheckSiteAdmin'
import ModalAjoutCheckSiteAdmin from '../../components/admin/checkSiteAdmin/modalAjoutCheckSiteAdmin'
import SideBar from '../../components/general/sideBar'
import { getDataArray, isAuthorised } from '../../services/api/api'

export default function CheckSiteAdmin() {
  const [websites, setWebsites] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [dataModified, setDataModified] = useState(false)
  const [showAjout, setShowAjout] = useState(false)


  useEffect(() => {
    getWebsite()
    setDataModified(false)
    setShowAjout(false)
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
      let datasArray = await getDataArray('websites')
      setWebsites(datasArray)

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

        <h3>Rechercher votre site ici</h3>
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
        <div>
          {websitesEnCours === undefined || websitesEnCours.length === 0
            ?
            <h1>Aucun sites trouvée</h1>
            :
            <>
              <br />
              {websites.map((website, index) => {
                return (
                    <LigneCheckSiteAdmin setDataModified={setDataModified} key={index} website={website} />
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
        {isAuthorised(['ROLE_ADMIN'])
          ?
          <>
            <a onClick={() => {
              setShowAjout(true)
            }}
              className="floatRead">
              <i className="bi bi-plus my-float" />
            </a>
            <ModalAjoutCheckSiteAdmin show={showAjout} setShow={setShowAjout} setDataModified={setDataModified} />
          </>
          :
          <>
          </>
        }
      </div>
    </>
  )
}
