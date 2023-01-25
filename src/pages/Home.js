import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../assets/banner.jpg'
import Other_01 from '../assets/other_01.jpg'
import Other_02 from '../assets/other_02.jpg'
import UserLoan from '../components/UserLoan'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import IconMinus from '../assets/icon/ic_minus.png'
import IconPlus from '../assets/icon/ic_plus.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { currencyFormat } from '../utils/Formatter'
import http from '../services/api'
import Parser from 'html-react-parser';

const Home = () => {
    const [checked, setChecked] = useState(false);

    const [durations, setDurations] = useState()
    const [durationId, setDurationId] = useState()
    const [amount, setAmount] = useState(50000)
    const [month, setMonth] = useState()
    const [percent, setPercent] = useState()
    const [interest, setInterest] = useState()
    const [payMonthly, setPayMonthly] = useState()
    const [total, setTotal] = useState()

    const [agreement, setAgreement] = useState()

    const [active, setActive] = useState(1)
    const navigate = useNavigate()
    const checkedRef = useRef(null)
    const [showModal, setShowModal] = useState(false)

    const handleChange = () => {
        setChecked(!checked);
    };

    const minusAmount = () => {
        const currentAmount = amount
        if (currentAmount >= 5000) {
            setAmount(currentAmount - 1000)
            const totalInterest = currentAmount * (percent / 100)
            const totalAmount = currentAmount + totalInterest
            const totalPayMonthly = totalAmount / month

            setInterest(totalInterest)
            setPayMonthly(totalPayMonthly)
            setTotal(totalAmount)
        } else {
            toast.warn('คุณไม่สามารถน้อยกว่า จำนวนเงิน ที่น้อย ที่สุด', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        
    }

    const plusAmount = () => {
        const currentAmount = amount
        if (currentAmount <= 1000000) {
            setAmount(currentAmount + 1000)
            const totalInterest = currentAmount * (percent / 100)
            const totalAmount = currentAmount + totalInterest
            const totalPayMonthly = totalAmount / month

            setInterest(totalInterest)
            setPayMonthly(totalPayMonthly)
            setTotal(totalAmount)
        } else {
            toast.warn('ไม่สามารถอยู่เหนือจำนวนเงิน ที่มาก ที่สุดได้', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const selectMonth = (id, month, percent) => {
        setMonth(month)
        setPercent(percent)
        setDurationId(id)

        const totalInterest = amount * (percent / 100)
        const totalAmount = amount + totalInterest
        const totalPayMonthly = totalAmount / month

        setPercent(percent)
        setInterest(totalInterest)
        setPayMonthly(totalPayMonthly)
        setTotal(totalAmount)
        setActive(id)
    }

    const fetchDuration = async () => {
        await http.get(`api/duration`).then(({data}) => {
            setMonth(data[0].month)
            setPercent(data[0].percent)
            setDurations(data)
            setDurationId(data[0].id)
            
            const totalInterest = amount * (data[0].percent / 100)
            const totalAmount = amount + totalInterest
            const totalPayMonthly = totalAmount / data[0].month

            setInterest(totalInterest)
            setPayMonthly(totalPayMonthly)
            setTotal(totalAmount)
        })
    }

    const fetchAgreement = async () => {
        await http.get(`api/agreement`).then(({data}) => {
            setAgreement(data)
        })
    }

    useEffect(() => {
        fetchDuration()
        fetchAgreement()
    }, [])

    const updateAmount = (value) => {
        setAmount(value)
        setActive(1)

        const totalInterest = value * (percent / 100)
        const totalAmount = value + totalInterest
        const totalPayMonthly = totalAmount / month

        setInterest(totalInterest)
        setPayMonthly(totalPayMonthly)
        setTotal(totalAmount)
    }

    const handleBorrow = async (e) => {
        const id_user = localStorage.getItem('auth_id')
        await http.get(`api/user/${id_user}`).then(({data}) => {
            const status = data.status
            const sign_status = data.sign_status
            if (!localStorage.getItem('auth_token')) {
                navigate('/login')
            } else if (status === 'incomplete') {
                toast.warn('โปรดกรอกข้อมูลให้ครบค่ะ', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (sign_status === '0') {
                toast.warn('คุณยังไม่ได้สมัครขอสินเชื่อ', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (!checkedRef.current.checked) {
                toast.warn('โปรคลิกเห็นด้วยเพื่อยืนยันว่าคุณได้ตกลงที่จะกู้เงิน', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                const formData = new FormData()
                formData.append('id_user', id_user)
                formData.append('durationId', durationId)
                formData.append('amount', amount)
                formData.append('interest', interest)
                formData.append('payMonthly', payMonthly)
                formData.append('total', total)

                http.post(`api/loan`, formData).then(({data}) => {
                    toast.success('คุณสมัครสินเชื่อสำเร็จแล้ว', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }).catch(({err}) => {
                    console.log(err)
                })
            }
        })   
    }

    
    return (
        <>
            <ToastContainer />
            <div className="banner">
                <img src={Banner} alt=""/>
            </div>
            <div className="content">
                <div className="amount_warp">
                    <div className="amount_tit">จำนวนเงินที่ขอสินเชื่อ (ไทย/บาท)</div>
                    <div className="new_amount">{currencyFormat(amount)}</div>
                    <div className="amount_slide">
                        <span className="ic_minus" onClick={minusAmount}>
                            <img src={IconMinus} alt=""/>
                        </span>
                        <InputRange
                            minValue={50000}
                            maxValue={1000000}
                            step={1000}
                            value={amount}
                            onChange={value => updateAmount(value)}
                        />
                        <span className="ic_plus" onClick={plusAmount}>
                            <img src={IconPlus} alt=""/>
                        </span>
                    </div>
                </div>
                <div className="duration_wrap">
                    <h3>ระยะเวลาการกู้ยืม</h3>
                    <div className="duration">
                        {
                            durations && durations.length > 0 && (
                                durations.map((item, i) => {
                                    return (
                                        <button id={item.month} className={active === item.id ? 'btn_duration active': 'btn_duration'} key={i} onClick={(e) => selectMonth(item.id, item.month, item.percent, e)}>
                                            <span className="duration_value">{item.month}</span>
                                            เดือน
                                        </button>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
                <div className="total_wrap">
                    <h3 className="total_text">ผ่อนต่องวด</h3>
                    <div className="total_loan">
                        <span className="monthly_pay">{currencyFormat(payMonthly)}</span>
                        <span className="total_sub">
                            (ด้วยอัตราดอกเบี้ย
                            <span> {percent}</span>%
                            <span> {currencyFormat(interest)}</span>)
                        </span>
                    </div>
                </div>
                <div className="agr_wrap">
                    <div className="chkBx_control">
						
                            <input type="checkbox" ref={checkedRef} onChange={handleChange}/>
                            <span className="agre">
                                เห็นด้วย
                                <label onClick={() => setShowModal(true)}>
                                    <span className="txt_link" >《ข้อตกลงการใช้บริการผู้ใช้》</span>
						        </label>
                            </span>
                         
					</div>
                </div>
                <div className="btn_wrap">
                    <button className="btn_b40" onClick={(e) => handleBorrow()}>กู้ทันที</button>
                </div>
                <>
                    <UserLoan/>
                </>
                <div className="other"><img src={Other_01} alt=""/></div>
                <div className="other"><img src={Other_02} alt=""/></div>
            </div>
            { showModal ? (
                <div className="pop_wrap msg_agg flexCenter">
                    <div className="pop_inn mgbox_inn">
                        <div className="pop_content">
                            <div className="pop_msg">
                                {
                                    agreement && agreement.length > 0 && (
                                        agreement.map((item, i) => {
                                            return (
                                                item.status === '1' ? 
                                                <p key={i}>{Parser(item.description)}</p>
                                                :
                                                <></>
                                            )
                                        })
                                    )
                                }
                            </div>
                        </div>
                        <div className="pop_footer">
                            <button  className="btn_g100" onClick={() => setShowModal(false)}>ยอมรับ</button>
                        </div>
                    </div>
                </div>
        ) : null }
        </>
    )
}

export default Home
