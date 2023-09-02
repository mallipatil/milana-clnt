import React from "react";

export const HeroBanner: React.FC = () => {
  const logo = "https://res.cloudinary.com/doh8qnrx5/image/upload/v1690286170/milana-Images/Brisbane_Chapter_rgpkq2.png";

  return (
    <div className="hero-banner hero-banner--pink-yellow">
      <div className="hero-banner__logo">
        <img className="hero-banner__image" src={logo} alt="React logo" />
      </div>
      <h1 className="hero-banner__headline">Milana, Connecting People!</h1>
      <p className="hero-banner__description">
      This is platform to connect and exchange information for matrimonaial alliances.
      </p>
    </div>
  );
};
