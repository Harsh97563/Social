import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";


export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if(!session?.user) {
    redirect('/sign-in')
  }
  // @ts-ignore
  if(!session.username) {
    redirect('/profile')
  }
  
  
  return (
    <div>
      <Navbar/>
    </div>
  );
}
