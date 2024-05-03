import React, { useEffect, useState } from 'react'
import SideBar from '../../components/general/sideBar'
import { getDataArray, isAuthorised } from '../../services/api/api'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ReactPaginate from 'react-paginate';
import LigneTopic from '../../components/topic/ligneTopic';
import ModalAjoutTopic from '../../components/topic/modalAjoutTopic';
import Footer from '../../components/general/footer';


export default function Topics() {

    const [categoryTopics, setCategoryTopics] = useState([])
    const [categoryTopic, setCategoryTopic] = useState({ label: 'Toutes', category: {} })
    const [searchWord, setSearchWord] = useState('')
    const [searchSubmited, setSearchSubmited] = useState(false)
    const [topics, setTopics] = useState([])
    const [itemOffset, setItemOffset] = useState(0);

    const [dataModified, setDataModified] = useState(false)
    const [showAjout, setShowAjout] = useState(false)

    const getCategoryTopics = async () => {

        let datas = await getDataArray('categorytopic')


        let dataArray = []
        dataArray.push({ label: 'Toutes', category: {} })

        datas.forEach((data, index) => {
            let obj = { label: data.category, category: data }
            dataArray.push(obj)
        })
        setCategoryTopics(dataArray)
    }

    const getTopics = async () => {
        let datasArray = []

        if (categoryTopic.category.id_categorytopic !== undefined) {
            datasArray = await getDataArray('topics/' + categoryTopic.category.id_categorytopic)
            setTopics(datasArray)
            return
        }

        if (searchWord !== undefined && searchWord.trim().length > 0) {

            datasArray = await getDataArray('topics/search/' + searchWord)
            setTopics(datasArray)
            return
        }

        datasArray = await getDataArray('topics')
        setTopics(datasArray)
        return

    }

    useEffect(() => {
        getCategoryTopics()
        getTopics()
        setSearchSubmited(false)
        setDataModified(false)
        setShowAjout(false)
        setItemOffset(0)
    }, [searchSubmited, categoryTopic, dataModified])

    const handleChange = (event) => {
        setSearchWord(event.target.value);
    };

    const onSelect = (event, newValue) => {
        if (newValue !== undefined && newValue !== null)
            setCategoryTopic(newValue)
    }

    const rechercher = (e) => {
        e.preventDefault()
        setSearchSubmited(true)
    }
    /* paginate */

    const itemsPerPage = 5

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % topics.length;
        setItemOffset(newOffset);
    };


    const endOffset = itemOffset + itemsPerPage;

    const topicsEncours = topics.slice(itemOffset, endOffset);
    const pageCount = (Math.ceil(topics.length / itemsPerPage));

    return (
        <>
            <SideBar />
            <div className="container" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
                <form style={{ paddingLeft: '3rem' }} className="row g-3" onSubmit={rechercher}>
                    <div className="col-5">
                        <input className="form-control" onChange={handleChange} type="text" content="Search" placeholder="Recherche textuelle" name="searchWord" />
                    </div>
                    <div className="col-auto" >
                        <button className="btn btn-primary" type='submit'> <i className="bi bi-search"></i></button>
                    </div>
                    <div className="col-4">

                        <Autocomplete
                            disablePortal
                            id="categoryTopicAutocomplete"
                            onChange={onSelect}
                            name="categoryTopic"
                            options={categoryTopics}
                            renderInput={(params) => <TextField {...params} label="Catégories" />}
                            isOptionEqualToValue={(option, value) => option.label === value.category.category}
                            style={{ maxWidth: '10rem', minWidth: '100%' }}
                        />
                    </div>
                </form>
                {topics === undefined || topics.length === 0
                    ?
                    <h1 style={{ marginTop: '5%' }}>Aucun topics trouvés </h1>
                    :


                    topicsEncours.map((topic, index) => {
                        return (
                            <LigneTopic setDataModified={setDataModified} key={index} topic={topic} />
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
            {
                isAuthorised(['ROLE_USER'])
                    ?
                    <>
                        <ModalAjoutTopic show={showAjout} setShow={setShowAjout} setDataModified={setDataModified} />
                        <a onClick={() => setShowAjout(true)} style={{ fontSize: '40px' }} className="floatWrite">
                            <i className="bi bi-plus" />
                        </a>
                    </>
                    :
                    <></>
            }
            <Footer />

        </>

    )
}
