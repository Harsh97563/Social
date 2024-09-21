import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerSession(authOptions);

  if(!session?.user) {
    redirect('/sign-in')
  }
  // @ts-ignore
  if(!session.user.username) {
    redirect('/profile')
  }
  
  
  return (
    <div>
      {JSON.stringify(session)}
    </div>
  );
}
