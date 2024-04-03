import React, { useState } from 'react'

import image from '../../../assets/images/main/publicationSection.jpg'
import PublicationForm from '../../../components/publicationForm/PublicationForm'

function PublicationSection() {
  const [isToggle, setIsToggle] = useState(false)

  const handleToggle = (e, isTrue) => {
    e.preventDefault()
    setIsToggle(isTrue)
  }

  return (
    <section className="publication py-16 mx-auto max-w-7xl px-6 lg:px-8">
      <h2 className="text-4xl font-bold">Заполните форму и опубликуйте</h2>
      <p className="my-4 text-lg text-gray-500">
        Данный раздел поможет вам подать необходимую информацию для выполнения
        вашего запроса. Пожалуйста, внимательно заполните все поля формы, так
        как точность и полнота предоставленных данных напрямую влияют на
        качество и скорость нашего сервиса.
      </p>
      <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
        Как только заинтересованные водители или пассажиры увидят вашу
        публикацию, они смогут связаться с вами, используя указанные вами
        контактные данные.
      </p>

      <div className="flex justify-between items-center flex-auto">
        <img src={image} alt="" className="w-2/5" />
        <ul className="w-7/12 hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex flex-col dark:divide-gray-700 dark:text-gray-400">
          <li className="sm:flex w-full">
            <div className="w-full focus-within:z-10">
              <a
                onClick={(e) => handleToggle(e, false)}
                className={`cursor-pointer inline-block w-full p-4 text-gray-900 bg-gray-100 border-gray-200 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:hover:text-white  ${!isToggle ? 'dark:bg-gray-700 dark:text-white' : 'dark:bg-gray-800 dark:text-gray-500'}`}
                aria-current="page"
              >
                Для водителей
              </a>
            </div>
            <div className="w-full focus-within:z-10">
              <a
                onClick={(e) => handleToggle(e, true)}
                className={`cursor-pointer inline-block w-full p-4 bg-white border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white ${isToggle ? 'dark:bg-gray-700 dark:text-white' : 'dark:bg-gray-800 dark:text-gray-500'}`}
              >
                Для пассажиров
              </a>
            </div>
          </li>
          <li className="flex justify-center pt-8 pb-8">
            <PublicationForm isToggle={isToggle} />
          </li>
        </ul>
      </div>
    </section>
  )
}

export default PublicationSection
