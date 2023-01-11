import React from 'react'
import Header from '../../../components/Header'
import NotFound from '../../../assets/no_data.svg'

const Loan = () => {
    return (
        <>
            <Header url="/account" title="เงินกู้ของฉัน"/>
            <div className="content">
                <div className="not_found">
                    <div className="not_found_img">
                        <img src={NotFound} alt="" />
                    </div>
                    <div className="des">
                        คุณยังไม่ได้ส่งใบสมัครสิทธิ์ประโยช์ใดๆ
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loan
