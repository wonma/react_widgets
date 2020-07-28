import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';

const options = [
    {
        label: 'Spanish',
        value: 'es'
    },
    {
        label: 'Korean',
        value: 'ko'
    },
    {
        label: 'German',
        value: 'de'
    }
];

const Translate = () => {

    const [language, setLanguage] = useState(options[0]);
    const [input, setInput] = useState('');
    const [debouncedInput, setDebouncedInput] = useState(input);
    const [result, setResult] = useState('');

    useEffect(() => {
        const timeId = setTimeout(()=>{
            setDebouncedInput(input);
        }, 1000)

        return () => {
            clearTimeout(timeId);
        }
    }, [input])

    useEffect(() => {
        const doTranslation = async () => {
            const response = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debouncedInput,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                }
            })
            setResult(response.data.data.translations[0].translatedText);
        }
        doTranslation();
        
    }, [language, debouncedInput]);


    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Type anything...</label>
                    <input onChange={(e) => setInput(e.target.value)} value={input} />
                </div>
            </div>
            <Dropdown 
                options={options} 
                label="Select a Language" 
                selected={language} 
                onSelectedChange={setLanguage}  
            />
            <div>
                <div>Translated as...</div>
                <div>{result ? result : input}</div>
            </div>
        </div>
    );
}

export default Translate;