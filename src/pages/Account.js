import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Other_03 from '../assets/other_03.jpg'
import Info from '../assets/icon/icon_user.png'
import Money from '../assets/icon/icon_money.png'
import Bag from '../assets/icon/icon_bag.png'
import Lock from '../assets/icon/icon_lock.png'
import Logout from '../assets/icon/icon_logout.png'
import http from '../services/api'

const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
];
  
const Account = () => {
    const [data, setData] = useState()
    const [showModal, setShowModal] = useState(false);
    const id_user = localStorage.getItem('auth_id')
    let timer;

    const useAuth = () => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            return true
        } else {
            return false
        }
    }

    const user = useAuth();

    const logout = () => {
        localStorage.clear();
        window.location.pathname = '/'
    }

    const fetchUser = async () => {
        await http.get(`api/getinfo/${id_user}`).then(({data}) => {
            setData(data.tel)
        }).catch (({err}) => {
            console.log(err)
        })
    }

    const resetTimer = () => {
        if (timer) clearTimeout(timer)
    }

    const handleTimer = () => {
        timer = setTimeout(() => {
            resetTimer()
            Object.values(events).forEach((item) => {
                window.removeEventListener(item, resetTimer)
            })
            logout()
        }, 600000)
    }

    useEffect(() => {
        fetchUser()
        Object.values(events).forEach((item) => {
            window.addEventListener(item, () => {
                resetTimer()
                handleTimer()
            })
        })
    }, [])
    return (
        <>
            <div className="banner">
                <img src={Other_03} alt=""/>
            </div>
            <div className="acc_info">
                <div className="container">
                    {!data ? (
                        <></>
                    ): (
                        <div className="user_info">{data}</div>
                    )}
                    <div className="list">
                        <Link to="/info">
                            <dl>
                                <dt>
                                    <img src={Info} alt="" />
                                </dt>
                                <dd>
                                    <p>ประวัติของฉัน</p>
                                </dd>
                            </dl>
                        </Link>
                        <Link to="/loan">
                            <dl>
                                <dt>
                                    <img src={Money} alt="" />
                                </dt>
                                <dd>
                                    <p>เงินกู้ของฉัน</p>
                                </dd>
                            </dl>
                        </Link>
                        <Link to="/repay">
                            <dl>
                                <dt>
                                    <img src={Bag} alt="" />
                                </dt>
                                <dd>
                                    <p>การชำระคืนของฉัน</p>
                                </dd>
                            </dl>
                        </Link>
                    </div>
                    {
                        user && <>
                            <div className="list">
                                <Link to="/change-password">
                                    <dl>
                                        <dt>
                                            <img src={Lock} alt="" />
                                        </dt>
                                        <dd>
                                            <p>เปลี่ยนรหัสผ่าน</p>
                                        </dd>
                                    </dl>
                                </Link>
                                <button type="button" onClick={() => setShowModal(true)}>
                                    <dl>
                                        <dt>
                                            <img src={Logout} alt="" />
                                        </dt>
                                        <dd>
                                            <p>ออกจากระบบ</p>
                                        </dd>
                                    </dl>
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div>
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
                                    <button className="btn_b50" onClick={logout}>ยืนยัน</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : null}
            
        </>
    )
}

export default Account
