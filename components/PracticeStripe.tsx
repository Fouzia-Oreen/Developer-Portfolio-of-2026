import { PRACTICE_AREAS } from '@/lib/content'
import React from 'react'

export default function PracticeStripe() {
  return (
    <section className='border-y border-hairline py-9'>
      <div className="mx-auto w-full max-w-77.5 px-6 md:px-10 ">
        <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0'>
           { PRACTICE_AREAS.map((items, index) => (
            <li key={index} className='flex flex-col gap-1.5 px-0 lg:px-5 lg:not-first:border lg:not-first:border-black'>
                <span className='text-muted-ink eyebrow'>{items.k}</span>
                <span className='text-sm'>{items.v}</span>
            </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
