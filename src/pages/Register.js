import React, { useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import http from '../services/api';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [tel, setTel] = useState('')
    const [password, setPassword] = useState('')
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <Header url="/login" title="จดทะเบียน"/>
            <form
                method="POST"
                autoComplete="off" className="pt-[44px]"
                onSubmit={handleSubmit(() => {
                    const formData = new FormData()
                    formData.append('tel', tel)
                    formData.append('password', password)

                    http.get('/sanctum/csrf-cookie').then(response => {
                    http.post(`api/register`, formData).then(({data}) => {
                        if (data.status === 200) {
                            http.post('api/login', formData).then(({data}) => {
                                localStorage.setItem('auth_id', data.id)
                                localStorage.setItem('auth_token', data.token)
                                navigate('/profileinfo')
                            }).catch(({err}) => {
                                console.log(err)
                            })
                        }
                    }).catch(({err}) => {
                        console.log(err)
                    })
                });
                })}>
                <div className="frm_wrap">
                    <div className="frm_grp required">
                        <label htmlFor="tel">หมายเลขโทรศัพท์</label>
                        <div className="frm_col">
                            <input
                                {...register("tel", { required: 'ต้องระบุหมายเลขโทรศัพท์.' })}
                                type="text" placeholder="หมายเลขโทรศัพท์" autoFocus
                                id="tel" value={tel} onChange={e => setTel(e.target.value)}
                            />
                            {errors.password && <span className="msg_error">{errors.tel?.message}</span>}
                        </div>
                    </div>
                    <div className="frm_grp required">
                        <label htmlFor="password">ตั้งรหัสผ่าน</label>
                        <div className="frm_ic_grp">
                            <div className="frm_col">
                                <input
                                    {...register("password", {
                                        required: 'ต้องการรหัสผ่าน.',
                                        minLength: {
                                            value: 6,
                                            message: "รหัสผ่านควรมีอย่างน้อย 6 ตัวอักษร"
                                        }
                                    })}
                                    type={isRevealPwd ? "text" : "password"} placeholder="กรุณาตั้งรหัสผ่าน 6-16 หลัก"
                                    id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="input_text" onClick={() => setIsRevealPwd(prevState => !prevState)}>{isRevealPwd ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}</span>
                            </div>
                            {errors.password && <span className="msg_error">{errors.password?.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="btn_wrap">
                    <button type="submit" className="btn_b40">ลงทะเบียน</button>
                </div>
            </form>
        </>
    )
}

export default Register