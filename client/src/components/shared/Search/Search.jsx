import React from 'react'

const Search = () => {
  return (
    <div>
          <input className='bg-secBackColor w-56 py-1 pl-4 border-none outline-none rounded-lg text-textColor' type='text' placeholder='search...' />
          <label className='px-2 py-2'>
            <img className=' cursor-pointer inline' width={20} height={20} src={'/img/inputSearch.png'} alt='search' />
          </label>
    </div>
  )
}

export default Search