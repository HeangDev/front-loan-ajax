import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from '../../services/api';
import Header from '../../components/Header'

const ProfileInfo = () => {
    const [conpanyName, setCompanyName] = useState('')
    const [conpanyLocation, setConpanyLocation] = useState('')
    const [conpanyTel, setConpanyTel] = useState('')
    const [conpanyAddress, setConpanyAddress] = useState('')
    const [salary, setSalary] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [familyName, setFamilyName] = useState('')
    const [familyTel, setFamilyTel] = useState('')
    const [familyRelated, setFamilyRelated] = useState('')
    const [otherName, setOtherName] = useState('')
    const [otherTel, setOtherTel] = useState('')
    const [otherRelated, setOtherRelated] = useState('')

    const navigate = useNavigate()

    const saveInfo = (event) => {
        event.preventDefault();
        if (conpanyName == '' && conpanyLocation == '' && conpanyTel == '' && conpanyAddress == '' && salary == '' && currentAddress == '' & familyName == '' && familyTel == '' && familyRelated == '' && otherName == '' && otherTel == '' && otherRelated == '') {
            toast.error('ข้อมูลไม่ครบถ้วนโปรดตรวจสอบ!', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            const formData = new FormData()

            formData.append('conpanyName', conpanyName)
            formData.append('conpanyLocation', conpanyLocation)
            formData.append('conpanyTel', conpanyTel)
            formData.append('conpanyAddress', conpanyAddress)
            formData.append('salary', salary)
            formData.append('currentAddress', currentAddress)
            formData.append('familyName', familyName)
            formData.append('familyTel', familyTel)
            formData.append('familyRelated', familyRelated)
            formData.append('otherName', otherName)
            formData.append('otherTel', otherTel)
            formData.append('otherRelated', otherRelated)

            http.post('http://127.0.0.1:8000/api/saveinfo', formData).then(({data}) => {
                //console.log(data)
                navigate('/info')
            }).catch(({err}) => {
                console.log(err)
            })
        }
    }

    return (
        <>
            <ToastContainer />
            <Header url="/info" title="ข้อมูลหน่วย"/>
            <div className="content">
                <form autoComplete="off" onSubmit={saveInfo}>
                    <p className="frm_info">กรอกข้อมูลจริงและถูกต้องการตรวจสอบจะผ่านไป~</p>
                    <div className="frm_wrap">
                        <div className="frm_grp">
                            <label htmlFor="">ชื่อ บริษัท</label>
                            <input type="text" placeholder="กรุณาใส่ชื่อ บริษัท" value={conpanyName} onChange={e => setCompanyName(e.target.value)}/>
                        </div>
                        <div className="frm_grp">
                            <label htmlFor="">ตำแหน่ง</label>
                            <input type="text" placeholder="กรุณากรอกตำแหน่ง" value={conpanyLocation} onChange={e => setConpanyLocation(e.target.value)}/>
                        </div>
                        <div className="frm_grp">
                            <label htmlFor="">โทรศัพท์</label>
                            <input type="text" placeholder="โปรดป้อนหมายเลขโทรศัพท์ของคุณ" value={conpanyTel}  onChange={e => setConpanyTel(e.target.value)}/>
                        </div>
                        <div className="frm_grp">
                            <label htmlFor="">ที่อยู่บริษัท</label>
                            <input type="text" placeholder="กรุณากรอกที่อยู่ที่ทำงาน" value={conpanyAddress}  onChange={e => setConpanyAddress(e.target.value)}/>
                        </div>
                        <div className="frm_grp">
                            <label htmlFor="">รายได้ต่อเดือน</label>
                            <input type="text" placeholder="กรุณากรอกรายได้ต่อเดือนจากการทำงานเงินบาท" value={salary}  onChange={e => setSalary(e.target.value)}/>
                            <span className="ic_baht"></span>
                        </div>
                        <div className="frm_grp">
                            <label htmlFor="">ที่อยู่ปัจจุบัน</label>
                            <input type="text" placeholder="กรุณากรอกข้อมูลที่อยู่ปัจจุบัน" value={currentAddress}  onChange={e => setCurrentAddress(e.target.value)}/>
                        </div>
                    </div>
                    <p className="frm_info">ติดต่อครอบครัว~</p>
                    <div className="frm_wrap">
                        <div className="frm_grp">
                            <label htmlFor="">ชื่อ</label>
                            <input type="text" placeholder="กรุณากรอกชื่อผู้ติดต่อ" value={familyName}  onChange={e => setFamilyName(e.target.value)}/>
                        </div>
                        <div className="frm_grp">
                            <label htmlFor="">หมายเลขโทรศัพท์</label>
                            <input type="text" placeholder="กรุณาใส่หมายเลขโทรศัพท์" value={familyTel}  onChange={e => setFamilyTel(e.target.value)}/>
                        </div>
                        <div className="frm_grp">
                            <label htmlFor="">ความสัมพันธ์</label>
                            <input type="text" placeholder="กรุณากรอกความสัมพันธ์" value={familyRelated}  onChange={e => setFamilyRelated(e.target.value)}/>
                        </div>
                    </div>
                    <p className="frm_info">ผู้ติดต่ออื่น ๆ</p>
                    <div className="frm_wrap">
                        <div className="frm_grp">
                            <label htmlFor="">ชื่อ</label>
                            <input type="text" placeholder="กรุณากรอกชื่อผู้ติดต่อ" value={otherName}  onChange={e => setOtherName(e.target.value)}/>
                        </div>
                        <div className="frm_grp">
                            <label htmlFor="">หมายเลขโทรศัพท์</label>
                            <input type="text" placeholder="กรุณาใส่หมายเลขโทรศัพท์" value={otherTel}  onChange={e => setOtherTel(e.target.value)}/>
                        </div>
                        <div className="frm_grp">
                            <label htmlFor="">ความสัมพันธ์</label>
                            <input type="text" placeholder="กรุณากรอกความสัมพันธ์" value={otherRelated}  onChange={e => setOtherRelated(e.target.value)}/>
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

export default ProfileInfo