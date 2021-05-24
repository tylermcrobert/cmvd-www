import React from "react";

export const Title: React.FC<{
  title: string;
  location: string | null;
  date: string | null;
}> = ({ title, location, date }) => {
  return (
    <>
      {title} (
      {location && date && `${location} ${new Date(date).getFullYear()}`})
    </>
  );
};
