import React from 'react'
import Header from '../../../components/Header'
import NotFound from '../../../assets/no_data.svg'

const Repay = () => {
    return (
        <>
            <Header url="/account" title="อินเทอร์เฟซการชำระคืนของฉัน"/>
            <div className="content">
                <div className="not_found">
                    <div className="not_found_img">
                        <img src={NotFound} alt="" />
                    </div>
                    <div className="des">
                        ไม่ต้องชดใช้!！<br/>
                        คุณไม่มีใบเรียกเก็บเงินที่จะชำระคืนในเดือนนี้
                    </div>
                </div>
            </div>
        </>
    )
}

export default Repay
