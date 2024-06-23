import './CountrySelect.scss'
import { AutoComplete, ConfigProvider, Form, Space } from 'antd'
import debounce from 'lodash.debounce'
import * as React from 'react'
import { useLazyGetSuggestCountryQuery } from '../../../services/suggest/suggestCountry'

export default function CountrySelect({
  label,
  onChange,
  debounceTimeout = 1000,
  isSearhCountry,
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
      theme={
        !isSearhCountry
          ? {
              token: {
                colorBgBase: 'rgb(55, 65, 81)',
                colorTextBase: '#fff',
                colorBorder: 'rgb(75, 85, 99)',
                colorTextPlaceholder: 'rgba(255, 255, 255, 0.497)',
              },
            }
          : false
      }
    >
      <Space
        direction="vertical"
        size={12}
        className="flex flex-auto w-full max-w-72"
      >
        <Form className="flex flex-auto">
          <Form.Item name="gender" className="flex flex-auto mb-0">
            <AutoComplete
              options={autoCompleteOptions}
              onSelect={onSelect}
              onSearch={debounceFetcher}
              placeholder={label}
              value={value}
              allowClear
              className="flex flex-auto w-full 575:w-48 min-w-28"
            />
          </Form.Item>
        </Form>
      </Space>
    </ConfigProvider>
  )
}
