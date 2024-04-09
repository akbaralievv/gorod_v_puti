import React from 'react'
import { ConfigProvider, DatePicker, Space } from 'antd'
import locale from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import './DatePickerSelect.scss'

dayjs.locale('ru')

const DatePickerSelect = ({ onChange }) => {
  const { RangePicker } = DatePicker

  const disabledDate = (current) => {
    return current && current.isBefore(dayjs().startOf('day'))
  }

  const getFormattedDate = (value) => {
    if (!value) return ''

    const format = (time) => {
      if (dayjs().isSame(time, 'day')) {
        return `Сегодня в ${time.format('HH:mm')}`
      } else if (dayjs().add(1, 'day').isSame(time, 'day')) {
        return `Завтра в ${time.format('HH:mm')}`
      } else if (dayjs().isSame(time, 'year')) {
        return time.format('D MMMM в HH:mm')
      } else {
        return time.format('D MMMM YYYY г. в HH:mm')
      }
    }

    return format(dayjs(value))
  }

  const onChangeDate = (value, dateString) => {
    onChange(value, dateString)
  }
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorBgBase: 'rgb(55, 65, 81)',
          colorTextBase: '#fff',
          colorBorder: 'rgb(75, 85, 99)',
          colorTextPlaceholder: 'rgba(255, 255, 255, 0.497)',
          colorButton: '#000',
        },
      }}
    >
      <Space direction="vertical" size={12} className="flex flex-auto">
        <DatePicker
          showTime
          onChange={onChangeDate}
          disabledDate={disabledDate}
          format={getFormattedDate}
          className="flex flex-auto"
        />
      </Space>
    </ConfigProvider>
  )
}

export default DatePickerSelect
