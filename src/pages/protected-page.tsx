
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { postProtectedResource } from "../services/message.service";
import { InputData } from "./inputDataTypes";
import "./protected-page.css";
import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper';
import { FixedCropper, ImageRestriction } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'


export const ProtectedPage: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [screenIndex, setScreenIndex] = useState(0);
  const [formData, setFormData] = useState<InputData>({
    name: "",
    gender: "",
    dateOfBirth: "",
    maritalStatus: "",
    countryLivingIn: "",
    cityLivingIn: "",
    education: "",
    occupation: "",
    height: "",
    motherTongue: "",
    nationality: "",
    photo: "",
  });

  const [croppedPhoto, setCroppedPhoto] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const ImageCropperonChange = (cropper: CropperRef) => {
    console.log(cropper.getCoordinates(), cropper.getCanvas());
    const croppedCanvas = cropper.getCanvas();
    
    if (croppedCanvas) {
      const croppedData = croppedCanvas.toDataURL("image/jpeg"); // Convert canvas to data URL
      setCroppedPhoto(croppedData);
    }
 
};

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      console.log("Selected file name:", selectedFile);
      reader.onload = () => {
          console.log("Selected file contents:", reader.result);
          try {
            const photoData = reader.result as string | null; // Convert to string or null
            if (photoData !== null) {
              console.error("File.")
              setFormData((prevData) => ({
                ...prevData,
                photo: photoData,
              }));
            } else {
              console.error("File data is null.");
            }
          } catch (error) {
            console.error("Error reading file:", error);
          }
      }
    }
  }

  const handlePostResource = async () => {
    const accessToken = await getAccessTokenSilently();

    console.log("Form Data:", formData);

    if (croppedPhoto) {
      formData.photo = croppedPhoto; // Add cropped image data to form data
    }
    const { error } = await postProtectedResource(accessToken, formData);
    
    if (error) {
      console.error("Error submitting data:", error);
    } else {
      setSuccessMessage("User record created successfully.");
    }
  };

  const handleNextScreen = () => {
    setScreenIndex(1);
  };

  const handlePrevScreen = () => {
    setScreenIndex(0);
  };

  const handleInputChange = (field: keyof InputData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const renderScreen = () => {
    if (screenIndex === 0) {
      return (
        <div className="input-container">
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        {/* Gender Dropdown */}
          <label>Gender:</label>
          <select
          value={formData.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
          >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          </select>
          <label>Date of Birth:</label>
          <input
            type="text"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          />
           <label>Marital Status:</label>
          <select
          value={formData.maritalStatus}
          onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
          >
          <option value="unmarried">Unmarried</option>
          <option value="widow/widower">Widow/Widower</option>
          <option value="Divorced">Divorced</option>
          <option value="Separated">Separated</option>
          </select>

          <label>Country Living In:</label>
          <input
            type="text"
            value={formData.countryLivingIn}
            onChange={(e) => handleInputChange("countryLivingIn", e.target.value)}
          />
          <button onClick={handleNextScreen}>Next</button>
        </div>
      );
    } else if (screenIndex === 1) {
      return (
        <div className="input-container">
          <label>Education:</label>
          <input
            type="text"
            value={formData.education}
            onChange={(e) => handleInputChange("education", e.target.value)}
          />
          <label>Occupation:</label>
          <input
            type="text"
            value={formData.occupation}
            onChange={(e) => handleInputChange("occupation", e.target.value)}
          />
          <label>Height:</label>
          <input
            type="text"
            value={formData.height}
            onChange={(e) => handleInputChange("height", e.target.value)}
          />
          <label>Mother Tongue:</label>
          <input
            type="text"
            value={formData.motherTongue}
            onChange={(e) => handleInputChange("motherTongue", e.target.value)}
          />
          <label>Nationality:</label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => handleInputChange("nationality", e.target.value)}
          />
          <label>Profile Photo:</label>
          <input
          type="file"
          accept="image/*"
         onChange={handleFileInputChange}
          />

 
         <div className="selected-image-container">
          <FixedCropper
            src={formData.photo}
            onChange={ImageCropperonChange}
            stencilProps={{
              handlers: false,
              lines: false,
              movable: false,
              resizable: false,
          }}
          stencilSize={{
              width: 300,
              height: 300
          }}
          imageRestriction={ImageRestriction.stencil}
          />
          </div>

          <button onClick={handlePrevScreen}>Previous</button>
          <button onClick={handlePostResource}>Submit</button>
        </div>
      );
    }

    // Default return statement
    return null;
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Protected Page
        </h1>
        <div className="content__body">
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage || errorMessage ? (
            <Link to="/profile">Return to Profile page</Link>
          ) : (
            renderScreen()
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ProtectedPage;
