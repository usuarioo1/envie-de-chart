
import CarouselCollage from '@/components/CarouselCollage'
import Hero from '@/components/Hero'
import ScrollingItems from '@/components/ScrollingItems'

import React from 'react'

export const metadata = {
  alternates: {
    canonical: '/',
  },
}

const page = () => {
  return (
    <div>
      <Hero />
      <CarouselCollage />
      <ScrollingItems />
    

    </div>
  )
}

export default page
