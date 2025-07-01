function Popup({userMessage, onClick}) {
    return (
        <div className='overlay'>
        <div className='popup' >
          <div className='feedback'>{userMessage}</div>
          <input className='again-button' type='button' value='Play again' onClick={onClick}/>
        </div>
      </div>
    )
}

export default Popup