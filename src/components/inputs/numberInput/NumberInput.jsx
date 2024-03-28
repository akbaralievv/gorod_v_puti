import React from 'react'
import { InputNumber } from 'antd'

import './NumberInput.css'

const onChange = (value) => {
  console.log('changed', value)
}
const NumberInput = () => (
  <InputNumber
    min={1}
    max={7}
    defaultValue={1}
    onChange={onChange}
    className="flex-auto"
  />
)
export default NumberInput
