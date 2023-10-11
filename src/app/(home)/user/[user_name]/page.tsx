import { AiOutlineUserAdd } from "react-icons/ai";
import ProfileHeader from "./components/ProfileHeader";
import ProfileBody from "./components/ProfileBody";

type UserProfileProps = { params: { user_name: string } };

function UserPage({ params }: UserProfileProps) {


  return (
    <div className="mx-8">
      <ProfileHeader />

      <ProfileBody />
    </div>
  )
}

export default UserPage;
