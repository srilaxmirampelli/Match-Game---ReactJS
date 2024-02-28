import {Component} from 'react'
import './index.css'
import NavBarItem from '../NavBarItem'
import TabItem from '../TabItem'
import MatchGameItem from '../MatchGameItem'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = this.props
    this.state = {
      activeTabId: tabsList[0].tabId,
      activeThumbnailId: imagesList[0].id,
      score: 0,
      timer: 60,
      isGameOver: false,
    }
  }

  componentDidMount = () => {
    this.intervalId = setInterval(this.tick, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalId)
  }

  tick = () => {
    const {timer} = this.state
    if (timer === 0) {
      clearInterval(this.intervalId)
      this.setState({isGameOver: true})
    } else {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
      }))
    }
  }

  onClickTabButton = tabId => {
    this.setState({activeTabId: tabId})
  }

  getFilteredImages = () => {
    const {imagesList} = this.props
    const {activeTabId} = this.state
    const filteredImages = imagesList.filter(
      eachImg => eachImg.category === activeTabId,
    )
    return filteredImages
  }

  generateRandomThumbnail = () => {
    const {imagesList} = this.props
    const randomIndex = Math.floor(Math.random() * imagesList.length)
    this.setState({activeThumbnailId: imagesList[randomIndex].id})
  }

  isCorrectImageClicked = id => {
    const {activeThumbnailId} = this.state
    if (id === activeThumbnailId) {
      this.setState(prevState => ({
        score: prevState.score + 1,
      }))
      this.generateRandomThumbnail()
    } else {
      this.setState({isGameOver: true})
      clearInterval(this.intervalId)
    }
  }

  displayRandomThumbnailImage = () => {
    const {imagesList} = this.props
    const {activeThumbnailId} = this.state

    return (
      <img
        src={
          imagesList.find(eachImg => eachImg.id === activeThumbnailId)?.imageUrl
        }
        alt="match"
        className="thumbnail-img"
      />
    )
  }

  onClickPlayAgain = () => {
    const {tabsList, imagesList} = this.props
    this.setState(
      {
        activeTabId: tabsList[0].tabId,
        activeThumbnailId: imagesList[0].id,
        score: 0,
        timer: 60,
        isGameOver: false,
      },
      () => {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.tick, 1000)
        this.displayRandomThumbnailImage()
      },
    )
  }

  displayGameOverCard = () => {
    const {score} = this.state
    return (
      <div className="game-over-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="trophy-img"
        />
        <p className="game-over-score-text">YOUR SCORE</p>
        <h1 className="game-over-score">{score}</h1>
        <button
          className="play-again-btn"
          type="button"
          onClick={this.onClickPlayAgain}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
            className="reset-img"
          />{' '}
          PLAY AGAIN
        </button>
      </div>
    )
  }

  render() {
    const {activeTabId, score, timer, isGameOver} = this.state
    const {tabsList} = this.props
    const filteredImages = this.getFilteredImages()
    return (
      <div className="app-container">
        <NavBarItem score={score} timeLeft={timer} />
        <div className="match-game-container">
          {isGameOver ? (
            this.displayGameOverCard()
          ) : (
            <>
              {this.displayRandomThumbnailImage()}
              <ul className="tab-item-list">
                {tabsList.map(eachTabItem => (
                  <TabItem
                    key={eachTabItem.tabId}
                    tabItem={eachTabItem}
                    onClickTabButton={this.onClickTabButton}
                    isActive={activeTabId === eachTabItem.tabId}
                  />
                ))}
              </ul>
              <ul className="match-game-item-list">
                {filteredImages.map(eachImg => (
                  <MatchGameItem
                    key={eachImg.id}
                    matchGameItemDetails={eachImg}
                    isCorrectImageClicked={this.isCorrectImageClicked}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
