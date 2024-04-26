
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux";
import  AvatarMenu  from "./avatar-menu";

export default function NavigationBase() {
  const {user} = useSelector((state:{user: {
    displayName: string,
       photoURL: string,
       email:string,
       uid: string
 
     
 }}) => state); 



  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" href="/">
            
            <span >Studenthub</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" href="/property/new">
              New Property
            </Link>
           
          </nav>
         { user.uid === null ? <div className="flex items-center gap-4">
            <Button size="sm" variant="outline">
            <Link href={`/auth/sign-in`}>

              Sign in
              </Link>
            </Button>
            <Button size="sm">Sign up</Button>
          </div> :<AvatarMenu/>}
        </div> 
      </div>
    </nav>
  )
}

