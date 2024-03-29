import { BellIcon, CheckIcon } from "@radix-ui/react-icons"
import toast from 'react-hot-toast';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { database } from "@/firebase";
import { ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { useAuth, clerkClient } from "@clerk/nextjs";


const notifications = [
  {
    title: "Enter University Name",
    name:"uniName"
  },
  {
    title: "Enter Univeristy Full Address",
    name:"uniAddress"
  },
  {
    title: "Enter University Contact Number",
    name:"uniNumber"
  },
]

export default function AdminModal({ className, ...props }) {
  const {userId} = useAuth();
  const router = useRouter();
  const [notify,setNotify]=useState(false);
  const [form,setform] = useState({
    uniName:"",
    uniAddress:"",
    uniNumber:"",
  })
  const handleChange=(e)=>{
    const {name,value} = e.target;
   setform({...form,[name]:value})
  }
  const handleSubmit=async (e)=>{
  e.preventDefault();
  if(!notify){toast('Allow Push Notification to proceed!', {icon: '🔔',});return;}
  console.log(form,notify);
  const uniId = form.uniName.replaceAll(" ","_").toLowerCase();
  try{
  await set(ref(database, 'universities/' + uniId), {
    "UniversityName": form.uniName,
    "FullAddress": form.uniAddress,
    "ContactInformation": form.uniNumber,
    "NotificationStatus": notify,
  });
  toast.success("University Registered Successfully");
  try
  {
    await fetch('/api/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        univerId:uniId,  
  })})
  }
    catch(e){console.log(e);}  
    location.reload();
}
  catch(e){
    console.log(e);
  }
  }
  return (
    <Card className={cn("w-9/10", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-lg">University Registration</CardTitle>
        <CardDescription className="text-xs">Register Your University to Continue..</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellIcon />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Allow to Send notifications 
            </p>
          </div>
          <Switch
          checked={notify}
          onCheckedChange={()=>{setNotify(!notify)}}
          />
        </div>
        <div>
          {notifications.map(({title,name}, index) => (
            <div
            key={index}
            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-xs md:text-sm font-medium leading-none mb-2">
                  {title}
                </p>
                <input type="text" name={name} value={form.name} onChange={handleChange} required className="w-full border border-black dark:border-white p-1 text-sm text-black dark:text-white"/>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">
          <CheckIcon className="mr-2 h-4 w-4"/> Click to Continue
        </Button>
      </CardFooter>
      </form>
    </Card>
  )
}
