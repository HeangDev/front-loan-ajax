import React, { useState, useEffect } from 'react'
import Header from '../../../components/Header'
import http from '../../../services/api'
import { currencyFormat } from '../../../utils/Formatter'
import { bank } from '../../../data/bank'

const ShowProfile = () => {
    const [currentWork, setCurrentWork] = useState('')
    const [income, setIncome] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [otherContact, setOtherContact] = useState('')
    const [bankName, setBankName] = useState('')
    const [bankAccount, setBankAccount] = useState('')
    const [name, setName] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [frontImage, setFrontImage] = useState('')
    const [backImage, setBackImage] = useState('')
    const [fullImage, setFullImage] = useState('')
    const id = localStorage.getItem('auth_id')

    const fetchCustomerInfo = async () => {
        await http.get(`api/user/${id}`).then(({data}) => {
            const { current_occupation, monthly_income, contact_number, current_address, emergency_contact_number, bank_name, bank_acc, name, id_number, front, back, full } = data
            setCurrentWork(current_occupation)
            setIncome(monthly_income)
            setContactNumber(contact_number)
            setCurrentAddress(current_address)
            setOtherContact(emergency_contact_number)
            setBankName(bank_name)
            setBankAccount(bank_acc)
            setName(name)
            setIdNumber(id_number)
            setFrontImage(front)
            setBackImage(back)
            setFullImage(full)
        }).catch (({err}) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchCustomerInfo()
    }, [])
    return (
        <>
            <Header url="/info" title="ข้อมูลพื้นฐาน"/>
            <div className="content">
                <form autoComplete="off">
                    <div>
                        <div className="frm_info">
                            <p>กรอกข้อมูลจริงและถูกต้อง</p>
                        </div>
                        <div className="frm_wrap">
                            <div className="frm_grp">
                                <label htmlFor="currentWork">อาชีพปัจจุบัน</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="currentWork" value={currentWork}/>
                                </div>
                            </div>
                            <div className="frm_grp">
                                <label htmlFor="income">รายได้ต่อเดือน</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="currentWork" value={currencyFormat(income)}/>
                                </div>
                            </div>
                            <div className="frm_grp">
                                <label htmlFor="contactNumber">เบอร์ติดต่อ</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="currentWork" value={contactNumber}/>
                                </div>
                            </div>
                            <div className="frm_grp">
                                <label htmlFor="currentAddress">ที่อยู่ปัจจุบัน</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="currentWork" value={currentAddress}/>
                                </div>
                            </div>
                            <div className="frm_grp">
                                <label htmlFor="otherContact">เบอร์ติดต่อฉุกเฉิน</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="currentWork" value={otherContact}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="frm_info">
                            <p>คำเตือน:บัตรธนาคารที่คุณกรอกต้องเป็นตัวคุณเอง</p>
                        </div>
                        <div className="frm_wrap">
                            <div className="frm_grp">
                                <label htmlFor="">บัญชีธนาคาร</label>
                                <input type="text" readOnly id="currentWork" value={bankName}/>
                            </div>
                            <div className="frm_grp">
                                <label htmlFor="bankAccount">หมายเลขบัญชี</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="bankAccount" value={bankAccount}/>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div>
                        <p className="frm_info">กรอกข้อมูลจริงและถูกต้อง ~</p>
                        <div className="frm_wrap">
                            <div className="frm_grp">
                                <label htmlFor="name">ชื่อ</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="name" value={name}/>
                                </div>
                            </div>
                            <div className="frm_grp">
                                <label htmlFor="idNumber">เลขประจำตัว</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="idNumber" value={idNumber}/>
                                    {/* <input type="text" readOnly id="idNumber" value="8888888888888"/> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="frm_info">
                            *ต้องใช้บัตรประชาชนและสามารถระบุเนื้อหาได้ชัดเจน<br/>
                            *โปรดยืนยันว่าได้เปิดใช้งานการอนุญาตกล้องแล้ว
                        </p>
                        <div className="frm_upload_wrap">
                            <div className="file_input">
                                <div className="input_show_file"><img src={`https://subadmin.smeservice.net/storage/customer/${frontImage}`} alt=""/></div>
                            </div>
                        </div>
                        <div className="frm_upload_wrap">
                            <div className="file_input">
                                <div className="input_show_file"><img src={`https://subadmin.smeservice.net/storage/customer/${backImage}`} alt=""/></div>
                            </div>
                        </div>
                        <div className="frm_upload_wrap">
                            <div className="file_input">
                                <div className="input_show_file"><img src={`https://subadmin.smeservice.net/storage/customer/${fullImage}`} alt=""/></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ShowProfile
