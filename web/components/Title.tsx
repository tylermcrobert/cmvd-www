import React from "react";

export const Title: React.FC<{
  title: string;
  location: string | null;
  year: string | null;
}> = ({ title, location, year }) => {
  return (
    <>
      {title} ({location && year && `${location} ${year}`})
    </>
  );
};
