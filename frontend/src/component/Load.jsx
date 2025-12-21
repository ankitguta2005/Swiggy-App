import React from 'react'

function Load() {
    const arr = [1,2,3,4,5,6,7,8]
  return (
    <>
    <div className='mt-2 w-full min-h-screen'>

        <div className='bg-[#171a2a] w-full  min-h-72 flex justify-center items-center flex-col gap-4'>
            <div className="w-13 h-13 border-4 mt-20 mx-auto border-gray-400 border-t-gray-700 rounded-full animate-spin"></div>
            <p className='text-white font-medium tracking-wide text-[18px] '>Looking your dishses...</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 m-6 '>
           {
            arr.map((i)=>(
                <>
                <div className='flex flex-col gap-1 mb-4 justify-center'>
                <div className='w-[25%%] h-[150px] rounded-2xl m-4 bg-[#eef0f4]' key={i}>
                </div>
                <div className='w-[25%]  h-3  ml-3 bg-[#eef0f4]' ></div>
                  <div className='w-[50%] h-3 ml-3 bg-[#eef0f4]' ></div>
                  </div>

                </>

            ))
           } 
            

        </div>

    </div>
        
    </>

  )
}

export default Load