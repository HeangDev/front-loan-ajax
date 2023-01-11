import React from 'react'
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from './routes/PrivateRoutes'
import PublicRoute from './routes/PublicRoute'

import Bar from './components/Bar';

import Home from './pages/Home'
import Wallet from './pages/Wallet'
import About from './pages/About'
import Account from './pages/Account'
import RepayReport from './pages/account/report/Repay'
import LoanReport from './pages/account/report/Loan'
import ChangePassword from './pages/account/ChangePassword';
import AccountInfo from './pages/info/AccountInfo'

import AddProfile from './pages/info/info/AddProfile';
import ShowProfile from './pages/info/info/ShowProfile';

import AddSignature from './pages/info/signature/AddSignature';
import ShowSignature from './pages/info/signature/ShowSignature';

import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
    return (
        <>
            <div className="wrapper">
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/repay" element={<RepayReport />} />
                        <Route path="/loan" element={<LoanReport />} />
                        <Route path="/change-password" element={<ChangePassword />} />
                        <Route path="/info" element={<AccountInfo />} />
                        <Route path="/profileinfo" element={<AddProfile />} />
                        <Route path="/showinfo" element={<ShowProfile />} />
                        <Route path="/signature" element={<AddSignature />} />
                        <Route path="/ssignature" element={<ShowSignature />} />
                    </Route>
                    
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route path="/" element={<Home />} />
                    <Route path="/help" element={<About />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
                <Bar/>
            </div>
        </>
    )
}

export default App
