import './index.css'

const TabItem = props => {
  const {tabItem, onClickTabButton, isActive} = props
  const {tabId, displayText} = tabItem

  const displayTabItems = () => {
    onClickTabButton(tabId)
  }

  return (
    <li className="tabitem-card">
      <button
        className={`default-tab-btn ${isActive ? 'active-tab-btn' : ''}`}
        type="button"
        onClick={displayTabItems}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
