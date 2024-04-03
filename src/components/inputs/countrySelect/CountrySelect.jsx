import * as React from 'react'
import { Form, Select, ConfigProvider, Space, Spin, AutoComplete } from 'antd'
import debounce from 'lodash.debounce'

import './CountrySelect.scss'
import { useLazyGetSuggestCountryQuery } from '../../../services/suggest/suggestCountry'

export default function CountrySelect({
  label,
  onChange,
  debounceTimeout = 1000,
}) {
  const [trigger, { data, error, isLoading }] = useLazyGetSuggestCountryQuery()

  const [options, setOptions] = React.useState([])
  const [value, setValue] = React.useState('')

  const fetchRef = React.useRef(0)

  const debounceFetcher = React.useCallback(
    debounce((searchValue) => {
      if (!searchValue) {
        setValue('')
        setOptions([])
        return
      }
      setValue(searchValue)
      const fetchId = ++fetchRef.current
      trigger(searchValue).then((newOptions) => {
        if (fetchId === fetchRef.current) {
          setOptions(newOptions.data.results)
        }
      })
    }, debounceTimeout),
    [trigger, debounceTimeout],
  )

  React.useEffect(() => {
    onChange(value)
  }, [value])

  const onSelect = (value) => {
    setValue(value)
  }

  const autoCompleteOptions = React.useMemo(() => {
    return options?.map((item, index) => ({
      key: index,
      value: `${item.title.text}${item.subtitle ? `, ${item.subtitle.text}` : ''}`,
      label: `${item.title.text}${item.subtitle ? `, ${item.subtitle.text}` : ''}`,
    }))
  }, [options])

  return (
    <ConfigProvider
      className="flex flex-auto"
      theme={{
        token: {
          colorBgBase: 'rgb(55, 65, 81)',
          colorTextBase: '#fff',
          colorBorder: 'rgb(75, 85, 99)',
          colorTextPlaceholder: 'rgba(255, 255, 255, 0.497)',
        },
      }}
    >
      <Space direction="vertical" size={12} className="flex flex-auto">
        <Form className="flex flex-auto">
          <Form.Item name="gender" className="flex flex-auto">
            <AutoComplete
              options={autoCompleteOptions}
              style={{ width: 200 }}
              onSelect={onSelect}
              onSearch={debounceFetcher}
              placeholder={label}
              value={value}
              allowClear
              className="flex flex-auto"
            />
          </Form.Item>
        </Form>
      </Space>
    </ConfigProvider>
  )
}
