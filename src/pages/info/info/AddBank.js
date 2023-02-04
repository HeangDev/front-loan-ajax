import React, { useState } from 'react'
import Header from '../../../components/Header'
import { useForm } from "react-hook-form";
import { useNavigate} from 'react-router-dom'
import http from '../../../services/api'


const AddBank = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [bankName, setBankName] = useState('')
    const [bankAccount, setBankAccount] = useState('')
    const id_user = localStorage.getItem('auth_id')

    const navigate = useNavigate();

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
                        formData.append('bankName', bankName)
                        formData.append('bankAccount', bankAccount)
                        http.post(`api/bank/${id_user}`, formData, {
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
                    {/* <div>
                        <p className="frm_info">กรอกข้อมูลจริงและถูกต้อง​~</p>
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
                        </div>
                    </div> */}
                    <div className="btn_wrap">
                        <button type="submit" className="btn_b40">ส่ง</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddBank
