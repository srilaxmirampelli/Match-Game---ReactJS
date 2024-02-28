import './index.css'

const MatchGameItem = props => {
  const {matchGameItemDetails, isCorrectImageClicked} = props
  const {id, thumbnailUrl} = matchGameItemDetails
  const onClickMatchGameItem = () => {
    isCorrectImageClicked(id)
  }

  return (
    <li className="match-game-item">
      <button
        type="button"
        className="match-image-btn"
        onClick={onClickMatchGameItem}
      >
        <img src={thumbnailUrl} className="match-img" alt="thumbnail" />
      </button>
    </li>
  )
}

export default MatchGameItem
