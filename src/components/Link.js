import React from 'react';

const Link = ({href, className, children}) => {
    const onClick = (event) => {
        event.preventDefault(); // 아무일도 안하게 바꿈.
        // 1. 주소창의 url은 바뀌게 하자
        window.history.pushState({},'', href);
        // 2. 주소창의 변화 감지하는 탐지기만들기 'popstate'이벤트 생성하기
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
        // [NEXT] Route컴포넌트 window eventlistener에 감지기를 심기
    }
    return (
        <a onClick={onClick} href={href} className={className}>
            {children}
        </a>
    );
}

export default Link;