import React, { useState } from 'react'
import Header from '../../../components/Header'
import { useForm } from "react-hook-form";
import { useNavigate} from 'react-router-dom'
import http from '../../../services/api'
import IconCamera from '../../../assets/icon/ic_camera.png'
import FrontID from '../../../assets/uppic1.png'
import BackID from '../../../assets/uppic2.png'
import FullID from '../../../assets/uppic3.png'

const AddProfile = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [currentWork, setCurrentWork] = useState('')
    const [income, setIncome] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [otherContact, setOtherContact] = useState('')
    const [bankName, setBankName] = useState('')
    const [bankAccount, setBankAccount] = useState('')
    const [name, setName] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [frontImage, setFrontImage] = useState()
    const [backImage, setBackImage] = useState()
    const [fullImage, setFullImage] = useState()

    const [frontImageUrl, setFrontImageUrl] = useState(FrontID)
    const [backImageUrl, setBackImageUrl] = useState(BackID)
    const [fullImageUrl, setFullImageUrl] = useState(FullID)
    const id_user = localStorage.getItem('auth_id')

    const navigate = useNavigate();

    const chooseFrontImage = (e) => {
        setFrontImage(e.target.files[0])
        setFrontImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const chooseBackImage = (e) => {
        setBackImage(e.target.files[0])
        setBackImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const chooseFullImage = (e) => {
        setFullImage(e.target.files[0])
        setFullImageUrl(URL.createObjectURL(e.target.files[0]))
    }
    
    return (
        <>
            <Header url="/info" title="ข้อมูลพื้นฐาน"/>
            <div className="content">
                <form
                    autoComplete="off"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit(() => {
                        const formData = new FormData()
                        formData.append('_method', 'PATCH')
                        formData.append('id_user', id_user)
                        formData.append('currentWork', currentWork)
                        formData.append('income', income)
                        formData.append('contactNumber', contactNumber)
                        formData.append('currentAddress', currentAddress)
                        formData.append('otherContact', otherContact)
                        formData.append('bankName', bankName)
                        formData.append('bankAccount', bankAccount)
                        formData.append('name', name)
                        formData.append('idNumber', idNumber)
                        formData.append('frontImage', frontImage)
                        formData.append('backImage', backImage)
                        formData.append('fullImage', fullImage)

                        http.post(`api/user/${id_user}`, formData, {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            }} ).then((data) => {
                            navigate('/info')
                        }).catch(({err}) => {
                            console.log(err)
                        })
                    })}>
                    <div>
                        <div className="frm_info">
                            <p>กรอกข้อมูลจริงและถูกต้องการตรวจสอบจะผ่านไป</p>
                        </div>
                        <div className="frm_wrap">
                            <div className="frm_grp required">
                                <label htmlFor="currentWork">อาชีพปัจจุบัน</label>
                                <div className="frm_col">
                                    <input
                                        {...register("currentWork", { required: "อาชีพปัจจุบันต้องไม่ว่างเปล่า." })}
                                        type="text" placeholder="กรุณากรอกอาชีพปัจจุบันของคุณ" id="currentWork" value={currentWork}
                                        onChange={e => setCurrentWork(e.target.value)}
                                    />
                                    {errors.currentWork && <span className="msg_error">{errors.currentWork?.message}</span>}
                                </div>
                            </div>
                            <div className="frm_grp required">
                                <label htmlFor="income">รายได้ต่อเดือน</label>
                                <div className="frm_col">
                                    <input
                                        {...register("income", { required: "รายได้ต่อเดือนไม่ว่างเปล่า." })}
                                        type="text" placeholder="กรุณากรอกรายได้ต่อเดือนจากการทำงานเงินบาท" id="currentWork" value={income}
                                        onChange={e => setIncome(e.target.value)}
                                    />
                                    {errors.income && <span className="msg_error">{errors.income?.message}</span>}
                                </div>
                            </div>
                            <div className="frm_grp required">
                                <label htmlFor="contactNumber">เบอร์ติดต่อ</label>
                                <div className="frm_col">
                                    <input
                                        {...register("contactNumber", { required: "เบอร์ติดต่อไม่ว่างเปล่า." })}
                                        type="text" placeholder="โปรดป้อนหมายเลขโทรศัพท์ของคุณ" id="currentWork" value={contactNumber}
                                        onChange={e => setContactNumber(e.target.value)}
                                    />
                                    {errors.contactNumber && <span className="msg_error">{errors.contactNumber?.message}</span>}
                                </div>
                            </div>
                            <div className="frm_grp required">
                                <label htmlFor="currentAddress">ที่อยู่ปัจจุบัน</label>
                                <div className="frm_col">
                                    <input
                                        {...register("currentAddress", { required: "ที่อยู่ปัจจุบันไม่ว่างเปล่า." })}
                                        type="text" placeholder="กรุณากรอกข้อมูลที่อยู่ปัจจุบัน" id="currentWork" value={currentAddress}
                                        onChange={e => setCurrentAddress(e.target.value)}
                                    />
                                    {errors.currentAddress && <span className="msg_error">{errors.currentAddress?.message}</span>}
                                </div>
                            </div>
                            <div className="frm_grp required">
                                <label htmlFor="otherContact">เบอร์ติดต่อฉุกเฉิน</label>
                                <div className="frm_col">
                                    <input
                                        {...register("otherContact", { required: "ที่อยู่ปัจจุบันไม่ว่างเปล่า." })}
                                        type="text" placeholder="โปรดป้อนหมายเลขโทรศัพท์ติดต่อฉุกเฉิน" id="currentWork" value={otherContact}
                                        onChange={e => setOtherContact(e.target.value)}
                                    />
                                    {errors.otherContact && <span className="msg_error">{errors.otherContact?.message}</span>}
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
                                <select className="combobox" onChange={e => setBankName(e.target.value)}>
                                <option value="ธนาคารไทยพาณิชย์（SCB）">ธนาคารไทยพาณิชย์ （SCB）</option>
                                <option value="ธนาคาร กสิกรไทย （KBANK)">ธนาคาร กสิกรไทย （KBANK)</option>
                                <option value="ธนาคาร กรุงศรีอยุธยา （BAY)">ธนาคาร กรุงศรีอยุธยา （BAY)</option>
                                <option value="ธนาคาร กรุงไทย （KTB)">ธนาคาร กรุงไทย （KTB)</option>
                                <option value="ธนาคาร กรุงเทพ（BBL)">ธนาคาร กรุงเทพ（BBL)</option>
                                <option value="ธนาคารเพื่อการเกษตร ธ ก ส（BAAC）">ธนาคารเพื่อการเกษตร ธ ก ส（BAAC）</option>
                                <option value="ธนาคาร ทหารไทย （TTB)">ธนาคาร ทหารไทย （TTB)</option>
                                <option value="ธนาคาร ซีไอเอ็มบี ไทย(CIMB)">ธนาคาร ซีไอเอ็มบี ไทย(CIMB)</option>
                                <option value="ธนาคาร ยูโอบี (UOB)">ธนาคาร ยูโอบี (UOB)</option>
                                <option value="ธนาคาร ออมสิน(GSB)">ธนาคาร ออมสิน(GSB)</option>
                                <option value="ธนาคารแลนด์ แอนด์ เฮ้าส์">ธนาคารแลนด์ แอนด์ เฮ้าส์</option>
                                <option value="ธนาคาร ธนชาติ（TBANK)">ธนาคาร ธนชาติ（TBANK)</option>
                                <option value="ธนาคารทิสโก้">ธนาคารทิสโก้</option>
                                <option value="ธนาคารเกียรตินาคิน">ธนาคารเกียรตินาคิน</option>
                                <option value="ทรูวอลเล็ท">ทรูวอลเล็ท</option>                          
                                <option value="ธนาคาร ไอซีบีซี(ICBC)">ธนาคาร ไอซีบีซี(ICBC)</option>           
                                </select>
                            </div>
                            <div className="frm_grp required">
                                <label htmlFor="bankAccount">หมายเลขบัญชี</label>
                                <div className="frm_col">
                                    <input
                                        {...register("bankAccount", { required: "จำเป็นต้องมีบัญชีธนาคาร." })}
                                        type="text" placeholder="กรุณากรอกหมายเลขบัตรธนาคาร" id="bankAccount" value={bankAccount}
                                        onChange={e => setBankAccount(e.target.value)}
                                    />
                                    {errors.bankAccount && <span className="msg_error">{errors.bankAccount?.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div>
                        <p className="frm_info">กรอกข้อมูลจริงและถูกต้องรีวิวจะผ่าน ~</p>
                        <div className="frm_wrap">
                            <div className="frm_grp required">
                                <label htmlFor="name">ชื่อ</label>
                                <div className="frm_col">
                                    <input
                                        {...register("name", { required: "ชื่อจริงของคุณที่จำเป็น." })}
                                        type="text" placeholder="กรุณากรอกชื่อจริงของคุณ" id="name" value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    {errors.name && <span className="msg_error">{errors.name?.message}</span>}
                                </div>
                            </div>
                            <div className="frm_grp required">
                                <label htmlFor="idNumber">เลขประจำตัว</label>
                                <div className="frm_col">
                                    <input
                                        {...register("idNumber", { required: "จำเป็นต้องมีหมายเลขประจำตัวที่แท้จริงของคุณ." })}
                                        type="text" placeholder="กรุณากรอกหมายเลขบัตรประจำตัวจริง" id="idNumber" value={idNumber}
                                        onChange={e => setIdNumber(e.target.value)}
                                    />
                                    {errors.idNumber && <span className="msg_error">{errors.idNumber?.message}</span>}
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
                                <div className="input_show_file"><img src={frontImageUrl} alt=""/></div>
                                <input type="file" accept="image/*" onChange={chooseFrontImage}/>
                                <div className="btn_upload"><img src={IconCamera} alt=""/></div>
                                <div className="txt_wrap">หน้าบัตรประชาชน</div>
                            </div>
                        </div>
                        <div className="frm_upload_wrap">
                            <div className="file_input">
                                <div className="input_show_file"><img src={backImageUrl} alt=""/></div>
                                <input type="file" accept="image/*" onChange={chooseBackImage}/>
                                <div className="btn_upload"><img src={IconCamera} alt=""/></div>
                                <div className="txt_wrap">ด้านหลังบัตรประชาชน</div>
                            </div>
                        </div>
                        <div className="frm_upload_wrap">
                            <div className="file_input">
                                <div className="input_show_file"><img src={fullImageUrl} alt=""/></div>
                                <input type="file" accept="image/*" onChange={chooseFullImage}/>
                                <div className="btn_upload"><img src={IconCamera} alt=""/></div>
                                <div className="txt_wrap">ถือบัตรประชาชน</div>
                            </div>
                        </div>
                    </div>
                    <div className="btn_wrap">
                        <button type="submit" className="btn_b40">ส่ง</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddProfile
