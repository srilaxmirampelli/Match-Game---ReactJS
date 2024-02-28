import './index.css'

const NavBarItem = props => {
  const {score, timeLeft} = props
  return (
    <ul className="navbar-container">
      <li>
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          alt="website logo"
          className="website-logo"
        />
      </li>
      <li className="score-details-card">
        <p className="score-text">
          Score: <span className="span-text"> {score}</span>
        </p>
        <li className="timer-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
            alt="timer"
            className="timer-img"
          />
          <p className="span-text">{timeLeft} sec</p>
        </li>
      </li>
    </ul>
  )
}

export default NavBarItem
