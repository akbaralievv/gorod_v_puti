import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  Spin,
  Upload,
} from 'antd'
import locale from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import debounce from 'lodash.debounce'
import { ID } from 'appwrite'

import './PublicationForm.scss'
import icon from '../../../assets/icons/main/group.png'
import { useLazyGetSuggestCountryQuery } from '../../../services/suggest/suggestCountry'
import {
  useCreateDriverCollectionMutation,
  useUpdateDriverCollectionMutation,
} from '../../../services/databases/driverCollection'
import {
  useCreatePassengerCollectionMutation,
  useUpdatePassengersCollectionMutation,
} from '../../../services/databases/passengerCollection'
import { createFileRequest, getImageRequest } from '../../../utils/api'
import useImageChecker from '../../../hooks/useImageChecker'
import {
  clearSave,
  setError,
  setLoading,
  setSaveData,
} from '../../../redux/slices/files/saveStateFile'

const { TextArea } = Input
const { Option } = Select

dayjs.locale('ru')

const normFile = (e) => (Array.isArray(e) ? e : e?.fileList)

const disabledDate = (current) => {
  return current && current.isBefore(dayjs().startOf('day'))
}
const PrefixSelector = (path) => {
  const name = path?.name || 'prefixPhone'
  const fieldKey = path?.key || null
  return (
    <Form.Item name={name} key={fieldKey} noStyle>
      <Select>
        {['+996', '+997', '+998', '+999'].map((code, id) => (
          <Option key={id} value={code}>
            {code}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
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

const PublicationForm = ({
  isToggle,
  initialData,
  closeFormModal,
  passengersRefetch,
  driverRefetch,
}) => {
  const [
    createDriverDatabases,
    { data: driverData, isLoading: driverLoading, error: driverError },
  ] = useCreateDriverCollectionMutation()
  const [
    createPassengerDatabases,
    { data: passengerData, isLoading: passengerLoading, error: passengerError },
  ] = useCreatePassengerCollectionMutation()
  const { userData, loading: getUserLoad } = useSelector(
    (state) => state.getUser,
  )
  const [
    updatePassengerDatabases,
    {
      data: passengerUpdateData,
      isLoading: passengerUpdateLoading,
      error: passengerUpdateError,
    },
  ] = useUpdatePassengersCollectionMutation()
  const [
    updateDriverDatabases,
    {
      data: driverUpdateData,
      isLoading: driverUpdateLoading,
      error: driverUpdateError,
    },
  ] = useUpdateDriverCollectionMutation()
  const [trigger] = useLazyGetSuggestCountryQuery()

  const {
    createFileData,
    loading: createFileLoad,
    error: createFileError,
  } = useSelector((state) => state.createFile)
  const { getImageData, loading: getImageLoad } = useSelector(
    (state) => state.getImage,
  )
  const { isValid, isLoading } = useImageChecker(getImageData)

  const [form] = Form.useForm()
  const [options, setOptions] = useState([])
  const [valueIn, setValue] = useState('')
  const [dateString, setDateString] = useState('')
  const [isFileUploading, setIsFileUploading] = useState(false)
  const [isDataChanged, setIsDataChanged] = useState(false)

  const fetchRef = useRef(0)
  const id_unique = ID.unique()
  const dispatch = useDispatch()

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
    return options?.map((item, index) => ({
      key: index,
      value: `${item.title.text}${item.subtitle ? `, ${item.subtitle.text}` : ''}`,
      label: `${item.title.text}${item.subtitle ? `, ${item.subtitle.text}` : ''}`,
    }))
  }, [options])

  const onChangeDate = (_, dateString) => setDateString(dateString)

  const preparingFormData = (data) => {
    const newFormatMainPhone = `${data.prefixPhone?.slice(1)}${data.mainPhone?.replace(/^0+/, '')}`
    const newFormatSubPhones = data.subPhone?.map(
      (item) =>
        `${item.prefix ? item.prefix?.slice(1) : ''}${item.phone?.replace(/^0+/, '')}`,
    )
    if (isToggle) {
      return {
        username: data?.username,
        who: 'Пассажир',
        to: data.to,
        from: data.from,
        numberOfPassengers: data.numberOfPassengers,
        datetime: data.time,
        formattedDateTime: initialData
          ? initialData.formattedDateTime
          : dateString,
        mainPhone: newFormatMainPhone,
        subPhones: JSON.stringify(newFormatSubPhones),
        comment: data?.comment,
        user_id: userData.$id,
      }
    } else {
      return {
        username: data.username ?? '',
        who: 'Водитель',
        to: data.to,
        from: data.from,
        auto: data.auto,
        numberOfPassengers: data.numberOfPassengers,
        datetime: data.time,
        formattedDateTime: initialData
          ? initialData.formattedDateTime
          : dateString,
        mainPhone: newFormatMainPhone,
        subPhones: JSON.stringify(newFormatSubPhones),
        comment: data.comment ?? '',
        user_id: userData.$id,
      }
    }
  }

  const onFinish = (values) => {
    const data = preparingFormData(values)
    if (isToggle) {
      if (initialData) {
        if (isDataChanged) {
          return updatePassengerDatabases({
            id_unique: initialData.$id,
            dataForm: data,
          })
            .unwrap()
            .then((payload) => passengersRefetch())
        }
      } else {
        return createPassengerDatabases({ id_unique, dataForm: data })
      }
    } else if (values.images && values.images.length > 0) {
      setIsFileUploading(true)
      return dispatch(
        createFileRequest({
          image: values.images[0].originFileObj,
          userId: id_unique,
        }),
      )
    } else {
      if (initialData) {
        if (isDataChanged) {
          return updateDriverDatabases({
            id_unique: initialData.$id,
            dataForm: data,
          })
            .unwrap()
            .then((payload) => driverRefetch())
        }
      } else {
        return createDriverDatabases({ id_unique, dataForm: data })
      }
    }
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

  useEffect(() => {
    if (isFileUploading && !createFileLoad && createFileData) {
      dispatch(getImageRequest(createFileData))
    }
  }, [createFileLoad, createFileData, isFileUploading])

  useEffect(() => {
    if (
      isFileUploading &&
      isValid &&
      getImageData &&
      !getImageLoad &&
      !isLoading
    ) {
      const values = form.getFieldsValue()
      let formData = preparingFormData(values)
      formData.image = getImageData
      if (isToggle) {
        if (initialData) {
          if (isDataChanged) {
            updatePassengerDatabases({
              id_unique: initialData.$id,
              dataForm: formData,
            })
              .unwrap()
              .then((payload) => passengersRefetch())
          }
        } else {
          createPassengerDatabases({ id_unique, dataForm: formData })
        }
      } else {
        if (initialData) {
          if (isDataChanged) {
            updateDriverDatabases({
              id_unique: initialData.$id,
              dataForm: formData,
            })
              .unwrap()
              .then((payload) => driverRefetch())
          }
        } else {
          createDriverDatabases({ id_unique, dataForm: formData })
        }
      }
      setIsFileUploading(false)
    }
  }, [
    form,
    isToggle,
    isLoading,
    isValid,
    getImageData,
    getImageLoad,
    isFileUploading,
  ])

  useEffect(() => {
    if (
      !driverLoading &&
      !passengerLoading &&
      !driverUpdateLoading &&
      !passengerUpdateLoading
    ) {
      form.resetFields()
      if (closeFormModal) {
        if (
          !passengerUpdateError &&
          !driverUpdateError &&
          (driverUpdateData || passengerUpdateData)
        ) {
          closeFormModal()
        }
      }
      setIsDataChanged(false)
    }
    if (driverData) {
      dispatch(setSaveData(driverData))
    } else if (passengerData) {
      dispatch(setSaveData(passengerData))
    } else if (passengerLoading || driverLoading) {
      dispatch(setLoading())
    } else if (driverError || passengerError) {
      dispatch(setError())
    } else if (passengerUpdateData) {
      dispatch(setSaveData(passengerUpdateData))
    } else if (driverUpdateData) {
      dispatch(setSaveData(driverUpdateData))
    } else if (passengerUpdateLoading || driverUpdateLoading) {
      dispatch(setLoading())
    } else if (driverUpdateError || passengerUpdateError) {
      dispatch(setError())
    }
  }, [
    driverData,
    driverLoading,
    passengerLoading,
    passengerData,
    driverError,
    passengerError,
    driverUpdateLoading,
    passengerUpdateLoading,
  ])

  useEffect(() => {
    if (initialData) {
      if (isToggle) {
        form.setFieldsValue({
          username: initialData.username ?? '',
          time: initialData.datetime ? dayjs(initialData.datetime) : null,
          to: initialData.to,
          from: initialData.from,
          numberOfPassengers: initialData.numberOfPassengers,
          mainPhone: initialData.mainPhone?.replace(
            /^\+?(996|997|998|999)/,
            '',
          ),
          comment: initialData.comment ?? '',
        })
      } else {
        form.setFieldsValue({
          username: initialData.username ?? '',
          time: initialData.datetime ? dayjs(initialData.datetime) : null,
          to: initialData.to,
          from: initialData.from,
          numberOfPassengers: initialData.numberOfPassengers,
          mainPhone: initialData.mainPhone?.replace(
            /^\+?(996|997|998|999)/,
            '',
          ),
          comment: initialData.comment ?? '',
          auto: initialData.auto,
        })
      }
    }
  }, [initialData, form])

  useEffect(() => {
    return () => {
      dispatch(clearSave())
      setIsDataChanged(false)
    }
  }, [])

  return (
    <ConfigProvider locale={locale} name="time">
      <Form
        form={form}
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
        onValuesChange={() => setIsDataChanged(true)}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        className="w-11/12 flex flex-col gap-y-8"
        initialValues={{
          prefixPhone: '+996',
          numberOfPassengers: 1,
          prefix: '+996',
        }}
      >
        <Form.Item label="Ваше Имя" name="username">
          <Input placeholder="Введите имя" className="!rounded-md" />
        </Form.Item>
        <Form.Item label="Кто">
          {isToggle ? (
            <div className="flex items-center gap-x-3">
              <Form.Item name="numberOfPassengers">
                <InputNumber min={1} max={11} />
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
            onChange={onChangeDate}
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
                <InputNumber min={1} max={11} />
              </Form.Item>
            </div>
          </Form.Item>
        ) : (
          ''
        )}
        {!isToggle && (
          <Form.Item
            label="Марка машины"
            name="auto"
            rules={[
              {
                required: true,
                message: 'Укажите марку машины.',
              },
            ]}
          >
            <TextArea
              placeholder="Введите марку машины"
              autoSize
              className="!rounded-md"
            />
          </Form.Item>
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
                  {subFields?.map(({ key, name }, index) => (
                    <Space key={key} className="flex">
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

        <Form.Item label="Комментарий" name="comment" className="flex flex-col">
          <TextArea rows={4} className="!rounded-md flex flex-auto" />
        </Form.Item>
        {!isToggle && (
          <Form.Item
            name="images"
            label="Изображения"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              beforeUpload={() => false}
              listType="picture-card"
              maxCount={1}
            >
              <button className="border-0 bg-transparent" type="button">
                <PlusOutlined />
                <div className="mt-2">Загрузить</div>
              </button>
            </Upload>
          </Form.Item>
        )}
        <Form.Item>
          <Button
            htmlType="submit"
            className="flex items-center justify-center min-w-32 min-h-8"
            disabled={
              !createFileError &&
              (passengerLoading ||
                driverLoading ||
                createFileLoad ||
                isFileUploading ||
                getImageLoad ||
                driverUpdateLoading ||
                passengerLoading ||
                isLoading)
            }
          >
            {!createFileError &&
            (passengerLoading ||
              driverLoading ||
              createFileLoad ||
              getImageLoad ||
              isLoading ||
              driverUpdateLoading ||
              passengerLoading ||
              isFileUploading) ? (
              <Spin />
            ) : (
              'Опубликовать'
            )}
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}

export default PublicationForm
