import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAnswer, getLanguages } from '../app/translateState'
import Select from 'react-select'

const MainPage = () => {
    const [prompt, setPrompt] = useState("")

    const [sourceLang, setSourceLang] = useState({
        value: "tr",
        label: "Turkish"
    })
    const [targetLang, setTargetLang] = useState({
        value: "en",
        label: "English"
    })

    const dispatch = useDispatch()

    const state = useSelector(state => state)

    useEffect(() => {
        dispatch(getLanguages())
    }, [])

    const handleClick = () => {
        dispatch(getAnswer({ prompt, sourceLang, targetLang }))
    }



    return (
        <>
            
            <div className='container'>

                <div className="left">
                    <Select value={sourceLang} onChange={(e) => setSourceLang(e)} className='select' options={state.languages} />
                    <textarea onChange={(e) => setPrompt(e.target.value)} type="text" />
                </div>

                <div className="right">
                    <Select value={targetLang} onChange={(e) => setTargetLang(e)} className='select' options={state.languages} />
                    <textarea
                        className={`disabled-text ${state.isLoading && 'loading'}`}
                        value={state.answer}
                        disabled
                        type="text" />
                </div>

            </div>
            <button onClick={handleClick}>Çevir</button>
        </>
    )
}

export default MainPage