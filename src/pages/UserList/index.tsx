import React from 'react'
import { GloBalTitleType } from '../../types/global'

const UserList: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title
  return (
    <>
      角色列表
    </>
  )
}

export default UserList