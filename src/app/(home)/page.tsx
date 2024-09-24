import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Feed from "@/components/Feed/Feed";


export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if(session && !session.username) {
    redirect('/profile')
  }
  
  
  return (
    <div className="flex items-center justify-center w-screen h-full">
      <Feed/>
    </div>
  );
}
