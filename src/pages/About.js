import React, { useState } from 'react'
import Header from '../components/Header'
import { helps } from '../data/help'

const About = () => {
    const [selected, setSelected] = useState(null)

    const toggle = (i) => {
        if (selected == i) {
            return setSelected(null)
        }

        setSelected(i)
    }
    return (
        <>
            <Header url="/" title="บริการลูกค้า"/>
            <div className="content">
                <div className="container">
                    <div className="toggle_list">
                        {helps.map((item, i) => {
                            return(
                                <dl className="toggle_item" key={i}>
                                    <dt className="toggle_title" onClick={() => toggle(i)}>{item.question}</dt>
                                    <dd className={selected == i ? 'toggle_content show' : 'toggle_content'}>
                                        <p>{item.answer}</p>
                                    </dd>
                                </dl>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
