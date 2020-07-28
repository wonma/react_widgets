import React, { useState } from 'react';
import Accordion from './Accordion';
import Search from './Search';
import Dropdown from './Dropdown';
import Translate from './Translate';
import Route from './Route';
import Header from './Header';

const options = [
    {
        label: 'I am Red',
        value: 'red'
    },
    {
        label: 'I am Yellow',
        value: 'yellow'
    },
    {
        label: 'I am Blue',
        value: 'blue'
    }
]

//Data For Accordion App
const items = [
    {
        question: 'What is JTS?',
        answer: 'It is Jungto Society, Buddhism organization.'
    },
    {
        question: 'What is special about JTS?',
        answer: 'We contribute to World Peace, love, environment.'
    },
    {
        question: 'What programs can I join?',
        answer: 'You can join medication programs, Q&A seminar, and mindful practice gatherings.'
    }
]

const App = () => {

    const [selected, setSelected] = useState('');
    const [showDropdown, setShowDropdown] = useState(true);

    // return (
    //     <div>
    //         <Accordion items={items} />
    //     </div>
    // )

    // return (
    //     <div className="ui container">
    //         <Search />
    //     </div>
    // )

    // return(
    //     <div>
    //         <button onClick={() => setShowDropdown(!showDropdown)}>Toggle</button>
    //         {
    //             showDropdown ? 
    //                 <Dropdown selected={selected} label="Select Color" onSelectedChange={setSelected} options={options} />
    //                 :
    //                 null
    //         }
    //     </div>
    // )

    // return(
    //     <div>
    //         <Translate />
    //     </div>
    // );
    return (
        <div className="ui container">
            <Header />
            <Route path="/">
                <Accordion items={items} />
            </Route>
            <Route path="/dropdown">
                <Dropdown selected={selected} label="Select Color" onSelectedChange={setSelected} options={options} />
            </Route>
            <Route path="/translate">
                <Translate />
            </Route>
            <Route path="/search">
                <Search />
            </Route>
        </div>
    )
}

export default App;