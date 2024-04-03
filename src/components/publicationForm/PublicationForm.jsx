import React, { useCallback, useMemo, useRef, useState } from 'react'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import {
  AutoComplete,
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
} from 'antd'
import locale from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import debounce from 'lodash.debounce'

import './PublicationForm.scss'
import icon from '../../assets/icons/main/group.png'
import { useLazyGetSuggestCountryQuery } from '../../services/suggest/suggestCountry'

const { TextArea } = Input
const { Option } = Select

dayjs.locale('ru')

const normFile = (e) => (Array.isArray(e) ? e : e?.fileList)

const PrefixSelector = (path) => {
  const name = path?.name || 'prefixPhone'
  const fieldKey = path?.key || null
  return (
    <Form.Item name={name} key={fieldKey} noStyle>
      <Select>
        {['+996', '+997', '+998', '+999', '+7'].map((code, id) => (
          <Option key={id} value={code}>
            {code}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}

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

const PublicationForm = ({ isToggle }) => {
  const [form] = Form.useForm()
  const [trigger] = useLazyGetSuggestCountryQuery()
  const [options, setOptions] = useState([])
  const [valueIn, setValue] = useState('')

  const fetchRef = useRef(0)

  const debounceFetcher = useCallback(
    debounce((value) => {
      if (!value) {
        setValue('')
        setOptions([])
        return
      }
      const fetchId = ++fetchRef.current
      setOptions([])
      setValue(value)
      trigger(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) return
        setOptions(newOptions.data.results)
      })
    }, 800),
    [trigger],
  )

  const autoCompleteOptions = useMemo(() => {
    return options?.map((item) => ({
      value: `${item.title.text}${item.subtitle ? `, ${item.subtitle.text}` : ''}`,
      label: `${item.title.text}${item.subtitle ? `, ${item.subtitle.text}` : ''}`,
    }))
  }, [options])

  const onFinish = (values) => {
    console.log('Received values of form:', values)
  }

  const onFieldsChange = (changedFields, allFields) => {
    changedFields.forEach((field) => {
      if (field.errors.length > 0) {
        setTimeout(() => {
          form.setFields([{ name: field.name, errors: [] }])
        }, 10000)
      }
    })
  }

  return (
    <ConfigProvider locale={locale} name="time">
      <Form
        form={form}
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        className="w-11/12 flex flex-col gap-y-8"
        initialValues={{ prefixPhone: '+996', numberOfPassengers: 1 }}
      >
        <Form.Item label="Кто">
          {isToggle ? (
            <div className="flex items-center gap-x-3">
              <Form.Item name="numberOfPassengers">
                <InputNumber min={1} max={7} />
              </Form.Item>
              <p>Пассажир</p>
            </div>
          ) : (
            <p>Водитель</p>
          )}
        </Form.Item>
        <Form.Item
          label="Откуда"
          name="from"
          rules={[
            {
              required: true,
              message: 'Это поле обязательно.',
            },
          ]}
        >
          <AutoComplete
            options={autoCompleteOptions}
            style={{ width: 200 }}
            onSearch={debounceFetcher}
            placeholder={'Введите адрес'}
            value={valueIn}
            allowClear
            className="flex flex-auto"
          />
        </Form.Item>
        <Form.Item
          label="Куда"
          name="to"
          rules={[
            {
              required: true,
              message: 'Это поле обязательно.',
            },
          ]}
        >
          <AutoComplete
            options={autoCompleteOptions}
            style={{ width: 200 }}
            onSearch={debounceFetcher}
            placeholder={'Введите адрес'}
            value={valueIn}
            allowClear
            className="flex flex-auto"
          />
        </Form.Item>
        <Form.Item
          label="Когда"
          name="time"
          rules={[
            {
              required: true,
              message: 'Укажите время.',
            },
          ]}
        >
          <DatePicker
            name="time"
            showTime
            disabledDate={disabledDate}
            format={getFormattedDate}
            className="flex-auto publicationDatePicker"
          />
        </Form.Item>
        {!isToggle ? (
          <Form.Item label="Количество свободных мест">
            <div className="flex relative">
              <img
                src={icon}
                alt=""
                className="w-4 top-[0.45rem] right-11 absolute z-10"
              />
              <Form.Item name="numberOfPassengers">
                <InputNumber min={1} max={7} />
              </Form.Item>
            </div>
          </Form.Item>
        ) : (
          ''
        )}
        <Form.Item label="Контакты">
          <div className="flex flex-col gap-y-3 w-full">
            <Form.Item
              name="mainPhone"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Укажите номер телефона.',
                },
              ]}
            >
              <Input
                addonBefore={PrefixSelector()}
                className="w-full text-sm"
                placeholder="Основной номер телефона"
              />
            </Form.Item>
            <Form.List name="subPhone">
              {(subFields, { add, remove }) => (
                <>
                  {subFields.map(({ key, name }, index) => (
                    <Space key={key} className="flex mb-2">
                      <Form.Item
                        name={[name, 'phone']}
                        key={[key, 'phone']}
                        noStyle
                      >
                        <Input
                          addonBefore={PrefixSelector({
                            name: [name, 'prefix'],
                            key: [key, 'prefix'],
                          })}
                          className="w-full"
                          placeholder={`Номер телефона ${index + 1}`}
                        />
                      </Form.Item>
                      <CloseOutlined onClick={() => remove(index)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      + Добавить номер телефона
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </Form.Item>

        <Form.Item label="Комментарий" name="comment">
          <TextArea rows={4} />
        </Form.Item>
        {!isToggle && (
          <Form.Item
            name="images"
            label="Изображения"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload beforeUpload={() => false} listType="picture-card">
              <button className="border-0 bg-transparent" type="button">
                <PlusOutlined />
                <div className="mt-2">Загрузить</div>
              </button>
            </Upload>
          </Form.Item>
        )}
        <Form.Item>
          <Button htmlType="submit">Опубликовать</Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}
export default PublicationForm
