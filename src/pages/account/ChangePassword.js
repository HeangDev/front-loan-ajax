import React, { useState } from 'react'
import Header from '../../components/Header'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Other_03 from '../../assets/other_03.jpg'
import http from '../../services/api';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const id_user = localStorage.getItem('auth_id')
    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [isRevealPwd, setIsRevealPwd] = useState(false)

    const npassword = watch('newPassword')
    const navigate = useNavigate()
    return (
        <>
            <Header url="/account" title="เปลี่ยนรหัสผ่าน"/>
            <div className="banner pt-[44px]">
                <img src={Other_03} alt=""/>
            </div>
            <form
                autoComplete="off"
                onSubmit={handleSubmit(() => {
                    const formData = new FormData()
                    formData.append('id_user', id_user)
                    formData.append('currentPassword', currentPassword)
                    formData.append('newPassword', newPassword)
                    formData.append('confirmPassword', confirmPassword)

                    http.post(`api/changepassword`, formData).then((data) => {
                        if (data.status === 200) {
                            localStorage.removeItem('auth_token')
                            localStorage.removeItem('auth_id')
                            navigate('/')
                        }
                    }).catch(({err}) => {
                        console.log(err)
                    })
                })}>
                <div className="frm_wrap">
                    <div className="frm_grp required">
                        <label htmlFor="">รหัสผ่านเก่า</label>
                        <div className="frm_col">
                            <input
                                {...register("currentPassword", { required: "คุณต้องระบุรหัสผ่าน" })}
                                type="password" placeholder="รหัสผ่านปัจจุบัน" name="currentPassword"
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            {errors.currentPassword && <span className="msg_error">{errors.currentPassword?.message}</span>}
                        </div>
                    </div>
                    <div className="frm_grp required">
                        <label htmlFor="">รหัสผ่านใหม่</label>
                        <div className="frm_ic_grp">
                            <div className="frm_col">
                                <input
                                    {...register("newPassword",{
                                        required: "ต้องใช้รหัสผ่านใหม่",
                                        minLength:{
                                            value:6,
                                            message:'กรุณาตั้งรหัสผ่าน 6-16 หลัก'
                                        },
                                    })}
                                    type={isRevealPwd ? "text" : "password"} placeholder="กรุณาตั้งรหัสผ่าน 6-16 หลัก" name="newPassword"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <span className="input_text" onClick={() => setIsRevealPwd(prevState => !prevState)}>{isRevealPwd ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}</span>
                            </div>
                            {errors.newPassword && <span className="msg_error">{errors.newPassword?.message}</span>}
                        </div>
                    </div>
                    <div className="frm_grp required">
                        <label htmlFor="">ยืนยันรหัสผ่าน</label>
                        <div className="frm_col">
                            <input
                                {...register("confirmPassword",{
                                    required: "ต้องยืนยันรหัสผ่าน.",
                                    validate: (value) =>
                                        value === npassword || "รหัสผ่านใหม่ของคุณไม่ตรงกัน.",
                                })}
                                type="password" placeholder="ยืนยันรหัสผ่านใหม่" name="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmPassword && <span className="msg_error">{errors.confirmPassword?.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="btn_wrap">
                    <button type="submit" className="btn_b40">บันทึก</button>
                </div>
            </form>
        </>
    )
}

export default ChangePassword
