import React from "react";
import { GloBalTitleType } from "../../types/global";

const UserControl: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title
  return (
    <>
      用户管理
    </>
  )
}

export default UserControl