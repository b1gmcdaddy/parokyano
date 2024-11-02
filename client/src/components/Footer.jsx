import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="text-white py-5" style={{backgroundColor:"#E8E8E8", marginTop: "auto"}}>
      <div className="max-w-[1240px] mx-auto text-center text-black">
        <p>&copy; {new Date().getFullYear()} PAROKYANO. All rights reserved.</p>
        <p>Developed by Barrera, Noob, Tangpuz</p>
      </div>
    </footer>
    </>
  )
}

export default Footer