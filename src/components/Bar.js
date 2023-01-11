import React from 'react'
import { Link } from 'react-router-dom'

import IconHome from '../assets/icon/icon_home.png'
import IconWallet from '../assets/icon/icon_wallet.png'
import IconHelp from '../assets/icon/icon_help.png'
import IconAccount from '../assets/icon/icon_user.png'

const Bar = () => {
    return (
        <>
            <nav className="bar bar_tab bottom_bar">
                <Link to="/" className="bar_item">
                    <span className="bar_icon">
                        <img src={IconHome} alt=""/>
                    </span>
                    <span className="bar_text">หน้าแรก</span>
                </Link>
                <Link to="/wallet" className="bar_item">
                    <span className="bar_icon">
                        <img src={IconWallet} alt=""/>
                    </span>
                    <span className="bar_text">กระเป๋าตังค์</span>
                </Link>
                <Link to="/help" className="bar_item">
                    <span className="bar_icon">
                        <img src={IconHelp} alt=""/>
                    </span>
                    <span className="bar_text">เกี่ยวกับเรา</span>
                </Link>
                <Link to="/account" className="bar_item">
                    <span className="bar_icon">
                        <img src={IconAccount} alt=""/>
                    </span>
                    <span className="bar_text">บัญชี</span>
                </Link>
            </nav>
        </>
    )
}

export default Bar
