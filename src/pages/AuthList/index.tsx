import React from "react"
import { GloBalTitleType } from "../../types/global"

const AuthList: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title
  return (
    <>
      权限列表
    </>
  )
}

export default AuthList