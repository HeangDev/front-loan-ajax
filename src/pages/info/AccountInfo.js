import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import http from '../../services/api'
import Header from '../../components/Header'
import Icon_01 from '../../assets/icon/ic_01.png'
import Icon_02 from '../../assets/icon/ic_04.png'

const AccountInfo = () => {
    const [cStatus, setCStatus] = useState('')
    const [sStatus, setSStatus] = useState('')
    const id_user = localStorage.getItem('auth_id')

    const checkCustomerStatus = async () => {
        await http.get(`api/user/${id_user}`).then(({data}) => {
            setCStatus(data.status)
        }).catch(({err}) => {
            //console.log(err)
        })
    }

    const checkSignatureStatus = async () => {
        await http.get(`api/signature/${id_user}`).then(({data}) => {
            console.log()
            setSStatus(data.status)
        }).catch(({err}) => {
            //console.log(err)
        })
    }

    useEffect(() => {
        checkCustomerStatus()
        checkSignatureStatus()
    }, [])

    return (
        <>
            <Header url="/account" title="ประวัติของฉัน"/>
            <div className="content">
                <div>
                    <div className="list">
                        <div className="list_inn">
                            {cStatus != 'complete' ? (
                                <Link to="/profileinfo" className="list_link">
                                    <div className="list_icon">
                                        <img src={Icon_01} alt=""/>
                                    </div>
                                    <div className="txt_wrap">
                                        <h4 className="tit">ข้อมูลโปรไฟล์</h4>
                                        <p className="des">แจ้งให้เราทราบข้อมูลโปรไฟล์ของคุณ</p>
                                    </div>
                                    <div className="right">
                                        <div>
                                            <span className="not">ไม่สมบูรณ์</span>
                                        </div>
                                    </div>
                                </Link> 
                            ) : (
                                <Link to="/showinfo" className="list_link">
                                    <div className="list_icon">
                                        <img src={Icon_01} alt=""/>
                                    </div>
                                    <div className="txt_wrap">
                                        <h4 className="tit">ข้อมูลโปรไฟล์</h4>
                                        <p className="des">แจ้งให้เราทราบข้อมูลโปรไฟล์ของคุณ</p>
                                    </div>
                                    <div className="right">
                                        <div>
                                            <span className="not">กรอกข้อมูลแล้ว</span>
                                        </div>
                                    </div>
                                </Link> 
                            )}

                            {sStatus != '1' ? (
                                <Link to="/signature" className="list_link">
                                    <div className="list_icon">
                                        <img src={Icon_02} alt=""/>
                                    </div>
                                    <div className="txt_wrap">
                                        <h4 className="tit">ลายเซ็นที่เขียนด้วยลายมือ</h4>
                                        <p className="des">*สำหรับการเซ็นสัญญา</p>
                                    </div>
                                    <div className="right">
                                        <div>
                                            <span className="not">ไม่สมบูรณ์</span>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <Link to="/ssignature" className="list_link">
                                    <div className="list_icon">
                                        <img src={Icon_02} alt=""/>
                                    </div>
                                    <div className="txt_wrap">
                                        <h4 className="tit">ลายเซ็นที่เขียนด้วยลายมือ</h4>
                                        <p className="des">*สำหรับการเซ็นสัญญา</p>
                                    </div>
                                    <div className="right">
                                        <div>
                                            <span className="not">กรอกข้อมูลแล้ว</span>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="info">
                        <p>ฉันได้อ่านและตกลงที่จะลงนามใน สัญญาสินเชื่อเพื่อการบริโภคส่วนบุคคล และ หนังสือมอบอำนาจการสอบถามรายงานเครดิตส่วนบุคคล ตกลงที่จะส่งข้อมูลที่เกี่ยวข้องกับเงินกู้ไปยังฐานข้อมูลพื้นฐานของข้อมูลเครดิตทางการเงิน (PBC Credit Information System)</p>
                    </div>
                    <div className="btn_wrap">
                        <Link to="/" className="btn_b40">ยืมเลย</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountInfo
