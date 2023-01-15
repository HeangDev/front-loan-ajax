import React, { useEffect, useState } from "react";
import http from '../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { currencyFormat } from '../utils/Formatter'
import Other_03 from "../assets/other_03.jpg";
import Safe_icon from '../assets/safe-icon.png'

const Wallet = () => {
    const [credit, setCredit] = useState()
    const [code, setCode] = useState()
    const [description, setDescription] = useState()
    const [withdrawCode, setWithdrawCode] = useState('')
    const id = localStorage.getItem('auth_id')

    const fetchDeposit = async () => {
        await http.get(`api/deposit/${id}`).then(({data}) => {
            const { withdraw_code, deposit_amount, description } = data
            setCode(withdraw_code)
            setCredit(deposit_amount)
            setDescription(description)

        }).catch (({err}) => {
            console.log(err)
        })
    }

    const handleWithdraw = async (e) => {
        if (withdrawCode == '' || withdrawCode == null) {
            toast.warn('กรุณากรอกรหัสถอนเงินของคุณ', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (withdrawCode !== code) {
            toast.warn('รหัสถอนเงินของคุณไม่ถูกต้อง', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setWithdrawCode('')
        } else if (credit == '0' || credit == null) {
            toast.warn('คุณไม่มีเงินที่จะถอน', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setWithdrawCode('')
        } else {
            const formData = new FormData()
            formData.append('id', id)
            formData.append('credit', credit)
            formData.append('withdrawCode', withdrawCode)

            http.post(`api/withdraw`, formData).then((data) => {
                toast.success('คุณได้ถอนเงินกู้ของคุณสำเร็จแล้ว', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setWithdrawCode('')
                fetchDeposit()
            }).catch(({err}) => {
                console.log(err)
            })
        }
    }

    useEffect(() => {
        fetchDeposit()
    }, [])

    return (
        <>
            <ToastContainer />
            <div className="banner">
                <img src={Other_03} alt="" />
            </div>
            <div className="withdraw_wrap">
                <div className="head_withdraw">
                    <div className="left">
                        <h4 className="tit">จำนวนเงินที่ดำเนินการถอน (บาท)</h4>
                        {
                            credit == '' || credit == null ?
                            <h3 className="des">{currencyFormat(0)}</h3>
                            :
                            <h3 className="des">{currencyFormat(credit)}</h3>
                        }
                    </div>
                    <div className="right">
                        <h4 className="tit">จำนวนเงินสด (บาท)</h4>
                        {
                            credit == '' || credit == null ?
                            <h3 className="des">{currencyFormat(0)}</h3>
                            :
                            <h3 className="des">{currencyFormat(credit)}</h3>
                        }
                    </div>
                </div>

                <div>
                <div className="input_wrap">
                    <input type="number" placeholder="ครุณาใส่รหัสถอนด้วยค่ะ" autoFocus value={withdrawCode} onChange={e => setWithdrawCode(e.target.value) }/>
                   
                </div>
                <div className="btn_wrap">
                    <button className="btn_b100" onClick={handleWithdraw}>ถอน</button>
                    <button className="btn_b100">ยกเลิก</button>
                </div>
                </div>
                <div className="withdraw_des">
                    <p className="tit_note">สถานะการกู้: {description === 'กำหลังดำเนินการ' ? 'กำหลังดำเนินการ' : description }</p>
                    <p>คำเตือน:<br /></p>
                    <p className="txt_note">
                        <img src={Safe_icon} alt="" /> 
                        <span>โปรดติดต่อฝ่ายบริการลูกค้าออนไลน์เพื่อขอรับรหัสถอนความปลอดภัยของเงินในบัญชีได้รับการประกันโดยธนาคาร</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Wallet;