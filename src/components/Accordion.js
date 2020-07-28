import React, { useState } from 'react';

const Accordion = ({ items }) => {
    const [openedItems, setOpenedItems] = useState([]);

    const onItemClick = (index) => {
        if(openedItems.includes(index)) {
            setOpenedItems(openedItems.filter(item => item !== index));
        } else {
            setOpenedItems([...openedItems, index]);
        }
    }

    const renderItems = items.map((item, index) => {
        const isActive = openedItems.includes(index);
        const active = isActive ? 'active' : '';
        const visible = isActive ? 'visible' : 'hidden';

        return <React.Fragment key={item.title}>
            <div className={`title ${active}`} onClick={() => onItemClick(index)}>
                <i className="dropdown icon"></i>
                {item.question}
            </div>
            <div className={`content ${active}`}>
                <p className={`transition ${visible}`}>{item.answer}</p>
            </div>
        </React.Fragment>
    });
    return (
        <div className="ui styled accordion">
            {renderItems}
        </div>
    );
}

export default Accordion;