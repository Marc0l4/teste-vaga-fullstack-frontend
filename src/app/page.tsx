import { SignIn } from '@/components/SignIn'
import { SignUp } from '@/components/SignUp'

const Page = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn />
      <SignUp />
    </div>
  )
}

export default Page
