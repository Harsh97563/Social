import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import Feed from "@/components/Feed/Feed";


export default async function Home() {

  const session = await getServerSession(authOptions);
  
  if(session && !session.user.username) {
    redirect('/profile')
  }
  
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Feed/>
    </div>
  );
}
