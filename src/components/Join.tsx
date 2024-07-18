import React, { useRef } from 'react'
// import './Join.css'
// import emailjs from "@emailjs/browser";

const Join = () => {
  const form = useRef();

    const handleJoin = (e: { preventDefault: () => void; })=> {
        e.preventDefault()
        // emailjs.sendForm(
        //     'service_extzqa9',
        //     'template_5fbt3fr',
        //     form.current,
        //     'VLwg1ltOWvnCYAiK_'
        // )
        // .then((result)=>{
        //     console.log('done')
        // },
        // (error)=>{
        //     console.log(error)
        // }
        // )
    }
  return (
    <div className=" mt-28 p-4 flex flex-col lg:flex-row gap-8 justify-around items-center" id='join-us'>

    <div className="text-white text-3xl lg:text-5xl font-bold uppercase relative">
      <hr className="absolute w-20 lg:w-40 rounded-sm bg-[#f48915] !mx-2.5" />
  
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
        <span className='font-outline-2 text-transparent'>Ready to</span>
        <span>Level up</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
        <span>your body</span>
        <span className='font-outline-2 text-transparent'>with us?</span>
      </div>
    </div>
  
    <div className="flex flex-col lg:flex-row justify-around items-center mt-4 lg:mt-0">
      <form className="flex flex-col gap-4 lg:flex-row items-center bg-[#717070] px-4 lg:px-8 py-2 lg:py-4" onSubmit={handleJoin}>
        <input className="bg-transparent rounded-none text-[#777777] w-full lg:w-auto" type="email" name='user_email' placeholder='Enter your Email Address here...' />
        <button type='submit' className="p-2 font-bold border-4 border-transparent transition-all duration-300 flex items-center justify-center w-32 bg-[#f79c3b] text-white">Join now</button>
      </form>
    </div>
  </div>
  
  )
}

export default Join