import { SignIn } from '@clerk/nextjs'

const page = () => {
  return (
    <div className='flex items-center justify-center glassmorphism-auth h-screen w-full'>
        <SignIn></SignIn>
    </div>
  )
}

export default page