import React, { useState, useEffect, useRef } from 'react';

const Dropdown = (props) => {
    const { options, selected, onSelectedChange, label } = props;
    const [open, setOpen] = useState(false);
    const ref = useRef();
    
    useEffect(() => {
        const onBodyClick = (e) => {
            // Dropdown안쪽이 클릭되면, 이 event listener가 무효할 수 있도록 작성해주기
            // 그러려면 클릭된 element가 Dropdown엘리먼트내부의 것인지 여부를 분별할 수 있어야함
            if (ref.current.contains(e.target)) {
                return null;
            }
            setOpen(false);
        }
       document.body.addEventListener('click', onBodyClick);

       return () => {
           document.body.removeEventListener('click', onBodyClick);
       }
    },[]);

    const renderOptions = options.map((option) => {
        return (
            <div 
                key={option.value} 
                className="item" 
                onClick={() => {onSelectedChange(option)}}
                style={option.value === selected.value ? { fontWeight: '700', 'backgroundColor':'#f7f8ff'} : {}}
            >{option.label}</div>
        );
    })

    return (
        <div ref={ref} className="ui form" >
            <div className="field">
                <label>{label}</label>
                <div 
                    className={`ui selection dropdown ${open ? 'visible active': '' }`}
                    onClick={() => {setOpen(!open)}}
                >
                    <input type="hidden" name="color" value={selected ? selected.label : ''} />
                    <i className="dropdown icon"></i>
                    <div className={`text ${selected ? '' : 'default'}`}>
                        {selected? selected.label : label}
                    </div>
                    <div className={`menu ${open ? 'visible transition' : '' }`}>
                        {renderOptions}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown;