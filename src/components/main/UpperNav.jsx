import { ModeToggle } from "../sub/modeToggler";
import { UserButton } from "@clerk/nextjs";


const UpperNav = () => {
  return (
    <div className='z-[1] px-4 py-5 md:px-12 w-screen h-20 hidden md:flex gap-5 md:gap-7 absolute justify-end'>
       <ModeToggle/>
       <UserButton/>
    </div>
  )
}

export default UpperNav