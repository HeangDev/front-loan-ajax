import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Other_03 from '../assets/other_03.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from '../services/api';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import axios from 'axios';
axios.defaults.baseURL = 'https://subadmin.smeservice.net/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

const Login = () => {
    const [tel, setTel] = useState('')
    const [password, setPassword] = useState('')
    const [isRevealPwd, setIsRevealPwd] = useState(false)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        if (tel === '') {
            toast.warn('ต้องระบุหมายเลขโทรศัพท์', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (password === '') {
            toast.warn('ต้องการรหัสผ่าน', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            axios.get('/sanctum/csrf-cookie').then(response => {
                const formData = new FormData()
                formData.append('tel', tel)
                formData.append('password', password)
                http.post('api/login', formData, {headers: { 'Accept': 'application/json' } }).then((response) => {
                    localStorage.setItem('auth_id', response.id)
                    localStorage.setItem('auth_token', response.token)
                    navigate('/')
                }).catch((error) => {
                    toast.warn(error.response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
            });
        }
    }

    return (
        <>
            <ToastContainer />
            <Header url="/" title="เข้าสู่ระบบ"/>
            <div className="banner pt-[44px]">
                <img src={Other_03} alt=""/>
            </div>
            <form autoComplete="off" onSubmit={handleLogin}>
                <div className="frm_wrap">
                    <div className="frm_grp">
                        <label style={{width: '40px'}}>
                            <span className="icon"><AiOutlineUser/></span>
                        </label>
                        <input type="text" placeholder="กรุณาใส่หมายเลขโทรศัพท์" autoFocus onChange={e => setTel(e.target.value)}/>
                    </div>
                    <div className="frm_grp">
                        <label style={{width: '40px'}}>
                            <span className="icon"><AiOutlineLock/></span>
                        </label>
                        <div className="frm_ic_grp">
                            <input type={isRevealPwd ? "text" : "password"} placeholder="กรุณาใส่รหัสผ่าน" onChange={e => setPassword(e.target.value)}/>
                            <span className="input_text" onClick={() => setIsRevealPwd(prevState => !prevState)}>{isRevealPwd ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}</span>
                        </div>
                    </div>
                </div>
                <div className="btn_wrap">
                    <button type="submit" className="btn_b40">เข้าสู่ระบบ</button>
                    <Link to="/register" className="btn_b40">ลงทะเบียน</Link>
                </div>
            </form>
        </>
    )
}

export default Login