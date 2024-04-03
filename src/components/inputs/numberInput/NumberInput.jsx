import React from 'react'
import { InputNumber, ConfigProvider, Space } from 'antd'

import icon from '../../../assets/icons/main/group.png'

const NumberInput = ({ onChange }) => {
  return (
    <div className="flex relative">
      <img
        src={icon}
        alt=""
        className="w-4 top-[0.45rem] right-11 absolute z-10"
      />
      <ConfigProvider
        className="flex-auto"
        theme={{
          token: {
            colorBgBase: 'rgb(55, 65, 81)',
            colorTextBase: '#fff',
            colorBorder: 'rgb(75, 85, 99)',
            colorTextPlaceholder: 'rgba(255, 255, 255, 0.497)',
            colorIcon: '#fff',
          },
        }}
      >
        <Space direction="vertical" size={12} className="flex-auto">
          <InputNumber
            min={1}
            max={7}
            defaultValue={1}
            onChange={onChange}
            className="flex-auto"
          />
        </Space>
      </ConfigProvider>
    </div>
  )
}
export default NumberInput
