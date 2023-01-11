import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import http from '../../../services/api'

const ShowSignature = () => {
    const [signature, setSignature] = useState()
    const id = localStorage.getItem('auth_id')

    const fetchSignature = async () => {
        await http.get(`api/signature/${id}`).then(({data}) => {
            setSignature(data.sign)
        }).catch (({err}) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchSignature()
    }, [])
    return (
        <>
            <Header url="/info" title="ลายเซ็นที่เขียนด้วยลายมือ"/>
            <div className="content">
            <form encType="multipart/form-data">
                    <div className="sign_wrap">
                        <img src={`http://localhost:8000/storage/signature/${signature}`} alt="" className="mt-[50px] mx-auto w-[200px]"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ShowSignature