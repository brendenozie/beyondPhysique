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
    <div className="mt-28 p-6 sm:p-8 flex flex-col lg:flex-row gap-12 justify-around items-center" id="join-us">
      {/* Text Section */}
      <div className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold uppercase relative text-center lg:text-left">
        {/* Decorative Line */}
        <hr className="absolute w-24 sm:w-28 lg:w-40 rounded-sm bg-[#f48915] top-0 left-0 lg:left-auto lg:right-0 mx-auto" />
        
        {/* Main Text */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mt-6">
          <span className="font-outline-2 text-transparent">Ready to</span>
          <span>Level Up</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
          <span>Your Body</span>
          <span className="font-outline-2 text-transparent">With Us?</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col lg:flex-row justify-around items-center mt-8 lg:mt-0">
        <form
          className="flex flex-col lg:flex-row items-center gap-4 bg-[#717070] p-4 lg:p-6 rounded-md shadow-lg"
          onSubmit={handleJoin}
        >
          <input
            className="bg-transparent border-b-2 border-[#777777] text-white placeholder-[#cccccc] w-full lg:w-auto px-2 py-1 focus:outline-none focus:border-[#f79c3b] transition-all"
            type="email"
            name="user_email"
            placeholder="Enter your Email Address here..."
            required
          />
          <button
            type="submit"
            className="p-3 font-bold border-4 border-transparent transition-all duration-300 bg-[#f79c3b] text-white w-36 lg:w-40 hover:bg-[#f48915] hover:scale-105 rounded-md"
          >
            Join Now
          </button>
        </form>
      </div>
    </div>  
  )
}

export default Join