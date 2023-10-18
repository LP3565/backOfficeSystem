import React from "react";
import { GloBalTitleType } from "../../types/global";

const SortingParameter: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title
  return (
    <>
      分类参数
    </>
  )
}

export default SortingParameter