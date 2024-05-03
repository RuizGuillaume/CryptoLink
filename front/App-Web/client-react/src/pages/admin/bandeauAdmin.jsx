import React, { useEffect } from 'react'
import { useState } from 'react'
import LigneAnnouncementAdmin from '../../components/admin/announcementAdmin/ligneAnnouncementAdmin'
import SideBar from '../../components/general/sideBar'
import { getData, isAuthorised } from '../../services/api/api'

export default function BandeauAdmin() {
    const [announcements, setAnnouncements] = useState()
    const [dataModified, setDataModified] = useState(false)
    const displayAnnouncement = async () => {
        let datas = await getData('announcement/admin')
        setAnnouncements(datas)
    }
    useEffect(() => {
        setDataModified(false)
        displayAnnouncement()
    }, [dataModified])

  return (
    <>
        <SideBar/>
            {
                isAuthorised(['ROLE_ADMIN'])
                    ?
                    <div className='container'>
                        <h1 style={{paddingTop : '25px' , textAlign : 'center'}}>Administration du bandeau de communication</h1>
                        <div className='row border-bottom mt-5'>
                            <div className='col-3'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Message</p>
                            </div>
                            <div className='col-3'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Date de debut</p>
                            </div>
                            <div className='col-3'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Date de fin</p>
                            </div>
                            <div className='col-3'>
                                <p style={{color: 'black', fontWeight:'bold'}}>Actions</p>
                            </div>
                        </div>
                        {announcements &&
                            <LigneAnnouncementAdmin dataModified={dataModified} setDataModified={setDataModified} announcement={announcements} />
                        }
                    </div>
                    :
                    <></>
            }
    </>
  )
}
