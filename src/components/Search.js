import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('cat');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    // 아래는 term을 지켜보다가 setTimeout발사 시, 그때의 term을 쥐고 debouncedTerm를 업데이트함 
    useEffect(() => {
        const timeId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);

        return () => {
            clearTimeout(timeId);
        }
    }, [term]);

    // debouncedTerm에 업데이트가 생기면 dataSearch가 일어남 (단, debouncedTerm이 있을 때)
    useEffect(() => {
        const search = async () => {
            const response = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm
                }
            })
            setResults(response.data.query.search);
        }
        
        if(debouncedTerm) {
            search();
        }
    }, [debouncedTerm]);

    // useEffect(() => {
    //     const search = async () => {
    //         const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
    //             params: {
    //                 action: 'query',
    //                 list: 'search',
    //                 origin: '*',
    //                 format: 'json',
    //                 srsearch: term
    //             }
    //         });

    //         setResults(data.query.search);
    //     }

    //     // 아래에서 A 또는 B 둘 중 하나가 execute됨.
    //     if (term && !results.length) {
    //         // A 발사
    //         search()
    //     } else {
    //         // B 발사
    //         const timeSlot = setTimeout(() => {
    //             search();
    //         }, 1000); // setTimeout은 바로 excute, resolve됨.

    //         // B 발사 후 '끝 발사'대기 
    //         return () => { // term을 지켜보고있다가 변화가 감지되면 바로 발사 됨.
    //             clearTimeout(timeSlot);
    //         }
    //     }

    // }, [term, results.length]); // 얘네를 dependency라고 부름

    const renderResults = results.map(({title, snippet, pageid}) => {
        return (
            <div className="item" key={pageid}>
                <div className="right floated content">
                    <a 
                    className="ui button"
                    href={`https://en.wikipedia.org?curid=${pageid}`}
                    >GO</a>
                </div>
                <div className="content">
                    <div className="header">{title}</div>
                    <span dangerouslySetInnerHTML={{ __html: snippet }}></span>
                </div>
            </div>
        );
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Type anything</label>
                    <input 
                        type="text" 
                        placeholder="Ask me anything.."
                        value={term}
                        onChange={(e) => {setTerm(e.target.value)}}
                    />
                </div>
            </div>
            <div className="ui divided items">{renderResults}</div>
        </div>
    );
}

export default Search;