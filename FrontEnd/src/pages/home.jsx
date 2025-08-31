import React from 'react'
import Hero from '../componet/Hero'
import LatestCollection from '../componet/LatestCollection'
import Bestseller from '../componet/Bestseller'
import OurPolicy from '../componet/OurPolicy'
import NewLetterbox from '../componet/NewLetterbox'

const Home = () => {
  return (
    <div>
<Hero/>
<LatestCollection />
<Bestseller />
<OurPolicy/>
<NewLetterbox/>
    </div>
  )
}

export default Home