
import ProfileInfoCard from "../components/profile/ProfileInfoCard";
import { SendFeedback } from "../components/profile/SendFeedback";

export const ProfilePage=()=>{

   
  

    return (
    <div className="py-10">
      <ProfileInfoCard  />
      <SendFeedback/>
    </div>
  );
}