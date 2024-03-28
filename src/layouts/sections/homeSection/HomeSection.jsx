import React from 'react'

import SearchForm from '../../../components/searchForm/SearchForm'

function HomeSection() {
  return (
    <section className="_B0njguYr9DDnIG2M8iY _6AI6SY1lyVfKpv37xl0 POA0xdG25nlhxqWJyl1U pcWvkQQ8p_VQZFs_K2QA lxr73ToDk8rdp_lBYfnv w2FVb1hpekxixpXpZt_l">
      <div className="flex flex-col items-center QYPW4nl6nHaIbrtaXf4h OmM4wtdsNjVR2r7OSzsm veFXkDzfJN473U3ycrV8 RV8RoaI_SlEMC5CEQ3ms HV01LldvyEqRHHy0hljF wP9HMsqy6b96l2HBRbgb jj0BrgkBpq72EXwWuBh5 Xjxpb8u_H96dZt4r1eF6 z-1">
        <div className="SGCI_v4dZasZ65DtKHsW _chPjFVKOPRcMolL9C9r QTzX2Cr9jhY6WXuEsiB_">
          <h1 className="mb-4 text-2xl text-center font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Если вы ищете идеальный{' '}
            <span class="text-blue-600 dark:text-blue-500">
              способ добраться из одного города в другой
            </span>
            , наш сервис предлагает вам лучшее решение.
          </h1>
          <p className="mb-4 text-center text-base font-normal text-gray-500 lg:text-lg sm:px-16 xl:px-48 dark:text-gray-400">
            Здесь вы можете{' '}
            <span class="underline underline-offset-3 decoration-1 decoration-blue-400 dark:decoration-blue-600">
              найти или опубликовать информацию о попутном междугороднем
              транспорте
            </span>
            , объединяя пассажиров и водителей для взаимовыгодных поездок.
          </p>
        </div>
        <SearchForm />
      </div>
    </section>
  )
}

export default HomeSection
