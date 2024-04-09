import React, { useState } from 'react'
import { Pagination } from 'antd'
import ruRU from 'antd/lib/locale/ru_RU'

const Paginate = ({ page, setCurrentPage, count, itemsPerPage }) => {
  const onChange = (page) => {
    console.log(page)
    setCurrentPage(page)
  }

  return (
    <Pagination
      total={count}
      onChange={onChange}
      current={page}
      pageSize={itemsPerPage}
      showSizeChanger={false}
      showQuickJumper
      className="flex justify-center mt-12"
      locale={ruRU.Pagination}
    />
  )
}

export default Paginate
