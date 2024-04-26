'use client'

import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Pen,
    Plus,
    PlusCircle,
    Settings, 
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  import Link from "next/link"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { setLogout } from "@/lib/store"
  
export   default function AvatarMenu() {
    const {user} = useSelector((state:{user: {
        displayName: string,
           photoURL: string,
           email:string,
           uid: string
     
         
     }}) => state); 
    const dispatch = useDispatch()

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
      <AvatarImage src={user.photoURL} alt="@shadcn" />
      <AvatarFallback>{user.displayName?.slice(0, 2)}</AvatarFallback>
    </Avatar></DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
           <Link href={'/property/new'}>
           <DropdownMenuItem>
           <Pen className="mr-2 h-4 w-4"/>
              <span>New Property</span>
            </DropdownMenuItem></Link>
            {/* <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>
                <Link href={'/billing'}>Billing</Link>
              </span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuItem onClick={()=>dispatch(setLogout())}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  