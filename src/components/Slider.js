import React, { useState } from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import IconMinus from '../assets/icon/ic_minus.png'
import IconPlus from '../assets/icon/ic_plus.png'

const Slider = ({ currentAmount, updateMainAmount, currentPercent }) => {

    const [amount, setAmount] = useState(5000)

    const updateAmount = updateAmount => {
        updateMainAmount(updateAmount)
        const totalInterest = currentAmount * (currentPercent / 100)
        const totalAmount = currentAmount + totalInterest
        console.log(totalAmount)
    }

    const minusAmount = () => {
        // if (currentAmount <= 5000) {
        //     console.log('คุณไม่สามารถน้อยกว่า จำนวนเงิน ที่น้อย ที่สุด')
        // } else {
            
        // }
        const amount = setAmount(currentAmount - 1000)
        console.log(amount)
    }

    const plusAmount = () => {
        const amount = currentAmount += 1000
        console.log(amount)
    }
    return (
        <>
            <div className="amount_slide">
                <span className="ic_minus" onClick={minusAmount}>
                    <img src={IconMinus} alt=""/>
                </span>
                <InputRange
                    minValue={50000}
                    maxValue={1000000}
                    step={1000}
                    value={currentAmount}
                    onChange={value => updateAmount(value)}
                />
                <span className="ic_plus" onClick={plusAmount}>
                    <img src={IconPlus} alt=""/>
                </span>
            </div>
        </>
    )
}

export default Slider