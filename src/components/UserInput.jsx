function UserInput({userInput, onChange, animationActive, handleAnimationEnd, handleKeyDown}) {
    return (
        <input value={userInput} onChange={onChange} className={animationActive ? 'text-field animate' : 'text-field'} onAnimationEnd={handleAnimationEnd} onKeyDown={handleKeyDown} />
           )
}

export default UserInput