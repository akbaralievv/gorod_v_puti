import React, { useEffect } from 'react'

import HomeSection from '../../layouts/sections/homeSection/HomeSection'
import PublicationSection from '../../layouts/sections/publicationSection/PublicationSection'

function Main() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex-1 dark">
      <HomeSection />
      <PublicationSection />
    </div>
  )
}

export default Main
