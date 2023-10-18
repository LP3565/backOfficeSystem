import React from 'react'

const ControlPanel: React.FC<{ title?: string }> = ({ title }) => {
  document.title = title!
  return (<>
    面板
  </>)
}

export default ControlPanel