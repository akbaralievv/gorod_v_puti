import React from 'react'
import { ConfigProvider, DatePicker, Space } from 'antd'
import ruRU from 'antd/es/locale/ru_RU'
import moment from 'moment'
import 'moment/locale/ru'

import './DatePickerSelect.css'

moment.locale('ru')

const { RangePicker } = DatePicker
const onChange = (value, dateString) => {
  console.log('Selected Time: ', value)
  console.log('Formatted Selected Time: ', dateString)
}
const onOk = (value) => {
  console.log('onOk: ', value)
}

const disabledDate = (current) => {
  return current && current < moment().startOf('day')
}

const DatePickerSelect = () => (
  <ConfigProvider locale={ruRU} className="flex-auto">
    <Space direction="vertical" size={12} className="flex-auto">
      <DatePicker
        showTime
        onChange={onChange}
        onOk={onOk}
        disabledDate={disabledDate}
        className="flex-auto"
      />
    </Space>
  </ConfigProvider>
)
export default DatePickerSelect
