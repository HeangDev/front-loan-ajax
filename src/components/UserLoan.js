import React from 'react'
import { userloan } from '../data/userloan'

const UserLoan = () => {
    return (
        <>
            <div className="loan_wrap">
                <marquee scrollamount="2" scrolldelay="80" direction="up">
                    {userloan.map((item, i) => {
                        return (
                            <div className="loan" key={i}>
                                <span className="loan_date">{item.date} </span>
                                :
                                <span className="loan_phone"> {item.tel} </span>
                                กู้เงินสำเร็จ
                                <span className="loan_money"> {item.amount}</span>฿!
                            </div>    
                        )
                    })}
                </marquee>
            </div>
        </>
    )
}

export default UserLoan