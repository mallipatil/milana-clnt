import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { CodeSnippet } from "../components/code-snippet";


const ProfileDetails: React.FC = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();

  return (
  <PageLayout>
    <div className="profile-details-box">
      <p>Profile Index: {profileId}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  </PageLayout>
  );
};

export default ProfileDetails;
