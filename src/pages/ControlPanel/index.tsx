import React from 'react'
import { GloBalTitleType } from '../../types/global'

const ControlPanel: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title
  return (<>
    面板
  </>)
}

export default ControlPanel