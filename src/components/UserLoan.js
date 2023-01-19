import React, { useState, useEffect } from 'react'
import http from '../services/api'

const UserLoan = () => {
    const [message, setMessage] = useState()

    const fetchMessage = async () => {
        await http.get(`api/message`).then(({data}) => {
            setMessage(data)
        })
    }

    useEffect(() => {
        fetchMessage()
    }, [])
    return (
        <>
            <div className="loan_wrap">
                <marquee scrollamount="2" scrolldelay="80" direction="up">
                    {
                        message && message.length > 0 && (
                            message.map((item, i) => {
                                return (
                                    <div className="loan" key={i}>
                                        <span className="loan_date">{item.date} </span>
                                        :
                                        <span className="loan_phone"> {item.tel} </span>
                                        กู้เงินสำเร็จ
                                        <span className="loan_money"> {item.amount}</span>฿!
                                    </div>
                                )
                            })
                        )
                    }
                </marquee>
            </div>
        </>
    )
}

export default UserLoan