import React, { useState } from 'react'

const Modal = (logoutAction) => {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            {showModal ? (
                <div className="pop_wrap msg_wrap flexCenter">
                    <div className="pop_inn mgbox_inn">
                        <div className="pop_content">
                            <div className="pop_msg">
                                <p>แน่ใจไหมว่าต้องการออกจากระบบบัญชีปัจจุบัน</p>
                            </div>
                        </div>
                        <div className="pop_footer">
                            <ul>
                                <li>
                                    <button className="btn_g50" onClick={() => setShowModal(false)}>ยกเลิก</button>
                                </li>
                                <li>
                                    <button className="btn_b50" onClick={logoutAction}>ยืนยัน</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Modal