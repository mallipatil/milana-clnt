import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { getPublicResource } from "../services/message.service";
import "./PublicPage.css";
import { ProfileApiResponse } from "../models/ProfileApiResponse";
import { ProfileData } from "../models/ProfileData";
import ProfileDetails from "./ProfileDetails"; // Import the new component
import { Link } from "react-router-dom"; // Import the Link component

export const PublicPage: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      try {
        const response: ProfileApiResponse = await getPublicResource();

        if (!isMounted) {
          return;
        }

        if (response.data) {
          setProfiles(response.data);
        }
      } catch (error) {
        setError("Error fetching data");
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Public Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              <strong>Search results</strong>
            </span>
          </p>
          {error !== null ? (
            <div className="error-message">
              <p>Error fetching data:</p>
              <pre>{error}</pre>
            </div>
          ) : (
            <div className="profile-container">
              {profiles.map((profile, index) => (
                <Link
                  to={`/ProfileDetails/${index}`} // Navigate to profile details page
                  key={index}
                  className="profile-box"
                >
                  <div className="profile-image-container">
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="profile-image"
                    />
                  </div>
                  <div className="profile-details">
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Gender:</strong> {profile.gender}</p>
                    <p><strong>Marital Status:</strong> {profile.maritalStatus}</p>
                    <p><strong>Country Living In:</strong> {profile.countryLivingIn}</p>
                    {/* Other profile details can be added here */}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Remove the overlay profile details */}
        </div>
      </div>
    </PageLayout>
  );
};
