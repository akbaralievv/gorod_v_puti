import * as React from 'react'
import { Form, Select } from 'antd'

import './CountrySelect.css'

export default function CountrySelect({ from, to }) {
  const onGenderChange = (value) => {}

  const placeholder = from ? 'Откуда' : 'Куда'

  return (
    <Form className="flex-auto">
      <Form.Item name="gender" className="flex-auto">
        <Select
          placeholder={placeholder}
          onChange={onGenderChange}
          allowClear
          className="flex-auto"
        >
          <Select.Option value="male">male</Select.Option>
          <Select.Option value="female">female</Select.Option>
          <Select.Option value="other">other</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  )
}
