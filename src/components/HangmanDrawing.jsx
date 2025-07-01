function HangmanDrawing({mistakesNumber}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 185.36 260.68">
            <line x1="0" y1="260.18" x2="117.37" y2="260.18" fill="#fff" stroke="#000" strokeMiterlimit="10"/>
            <line x1="58.68" y1="260.18" x2="58.68" y2=".5" fill="#fff" stroke="#000" strokeMiterlimit="10"/>
            <line x1="149.65" y1=".5" x2="58.68" y2=".5" fill="#fff" stroke="#000" strokeMiterlimit="10"/>
            <line x1="149.65" y1="39.57" x2="149.65" y2=".5" fill="#fff" stroke="#000" strokeMiterlimit="10"/>
            {mistakesNumber > 0 && <ellipse className='path' cx="149.65" cy="62.93" rx="19" ry="23" fill="none" stroke="#000" strokeMiterlimit="10"/>}
            {mistakesNumber > 1 && <line className='path' x1="149.65" y1="85.68" x2="149.65" y2="156.94" fill="#fff" stroke="#000" strokeMiterlimit="10"/>}
            {mistakesNumber > 2 && <line className='path' x1="149.65" y1="113.51" x2="184.99" y2="78.17" fill="#fff" stroke="#000" strokeMiterlimit="10"/>}
            {mistakesNumber > 3 && <line className='path' x2="116.33" y2="78.17" x1="149.65" y1="113.51" fill="#fff" stroke="#000" strokeMiterlimit="10"/>}
            {mistakesNumber > 4 && <line className='path' x1="149.65" y1="156.44" x2="184.99" y2="196.53" fill="#fff" stroke="#000" strokeMiterlimit="10"/>}
            {mistakesNumber > 5 && <line className='path' x1="149.65" y1="156.44" x2="116.33" y2="196.53" fill="#fff" stroke="#000" strokeMiterlimit="10"/>}
        </svg>
    )
}

export default HangmanDrawing