import React, { useState, useEffect } from 'react'
import Header from '../../../components/Header'
import NotFound from '../../../assets/no_data.svg'
import http from '../../../services/api'
import { currencyFormat } from '../../../utils/Formatter'

const Loan = () => {
    const [durationMonth, setDurationMonth] = useState('')
    const [durationPercent, setDurationPercent] = useState('')
    const [loanAmount, setLoanAmount] = useState('')
    const [loanInterest, setLoanInterest] = useState('')
    const [loanTotal, setLoanTotal] = useState('')
    const [loanPayMonth, setLoanPayMonth] = useState('')
    const [loanDate, setLoanDate] = useState('')
    const id = localStorage.getItem('auth_id')

    const fetchCustomerLoan = async () => {
        await http.get(`api/loan/${id}`).then(({data}) => {
            const { month, percent, amount, interest, total, pay_month, date} = data
            setDurationMonth(month)
            setDurationPercent(percent)
            setLoanAmount(amount)
            setLoanInterest(interest)
            setLoanTotal(total)
            setLoanPayMonth(pay_month)
            setLoanDate(date)
        }).catch (({err}) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchCustomerLoan()
    }, [])
    return (
        <>
            <Header url="/account" title="เงินกู้ของฉัน"/>
            <div className="content">
                <div className="not_found">
                    {
                        loanAmount == '' || loanAmount == null ?
                        <div className="not_found_img">
                            <img src={NotFound} alt="" />
                        </div>
                        :
                        <></>
                    }

                    <div className="des">

                        {
                            loanAmount == '' || loanAmount == null ?
                            <span>คุณยังไม่ได้ส่งใบสมัครสิทธิ์ประโยช์ใดๆ</span>
                            :
                           <div className='grid'>
                                <div className='grid grid-cols-6 gap-6 text_head_loan bg-slate-300'>
                                    <div>จำนวน</div>
                                    <div>เดือน</div>
                                    <div>ดอกเบี้ย</div>
                                    <div>รวมดอก</div>
                                    <div>ต่อเดือน</div>
                                    <div>วันที่กู้</div>
                                </div>
                                <div className='grid grid-cols-6 gap-6 text_head_loan'>
                                    <div>{currencyFormat(loanAmount)}</div>
                                    <div>{durationMonth}</div>
                                    <div>{durationPercent}%</div>
                                    <div>{loanTotal}</div>
                                    <div>{loanPayMonth}</div>
                                    <div>{loanDate}</div>
                                </div>
                           </div>
                            
                           
                        }
                        
                    </div>
                    <div className='loan_des'>
                    <p className="tit_note"> การชำระหนี้” </p>
                    <p className='txt_note'>  
                        <span>หมายถึง การกระทำการเพื่อปลดภาระหนี้ การชำระหนี้ตามข้อตกลงในสัญญากู้ยืมเงินสดเพื่อการบริโภค หมายถึง การที่ลูกหนี้ชำระหนี้เงินกู้คืนให้แก่เจ้าหนี้ การขอปฏิบัติชำระหนี้ - การชําระหนี้จะกระทำโดยการทำคำเสนอจริงตามกำหนดระยะเวลาในการชำระหนี้ของภาระหนี้อย่างเคร่งครัด <br/>
                        <p className='tit_note'> (มาตรา 460 แห่งรัฐบัญญัติกฎหมายแพ่ง)</p>
                        </span>
                    </p>  
                    </div>

                </div>
            </div>
        </>
    )
}

export default Loan
