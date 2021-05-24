import React, { useState } from "react";
import styled from "styled-components";
import { urlFor } from "../lib/sanity";
import { ProjectData } from "../pages";

export const HomepageProject: React.FC<ProjectData> = ({
  images,
  title,
  date,
  location,
  roles,
}) => {
  const [index, setIndex] = useState(0);
  return (
    <HomepageProjectStyle>
      <ImagesWrapper>
        {images?.map((image, i) => {
          const url = urlFor(image).width(1440).url() || "undefined";

          return (
            <ImageWrapper
              key={url}
              visible={index === i}
              onClick={() =>
                setIndex(index === images.length - 1 ? 0 : index + 1)
              }
            >
              <img src={url} alt={title} />
            </ImageWrapper>
          );
        })}
      </ImagesWrapper>
      <InformationBar>
        <h2>{title}</h2>
        <p>{roles.join(", ")}</p>
      </InformationBar>
    </HomepageProjectStyle>
  );
};

const HomepageProjectStyle = styled.article`
  /* border: 1px solid magenta; */
`;

const ImagesWrapper = styled.div`
  position: relative;
  padding-top: ${(3 / 5) * 100}%;
`;

const InformationBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
`;

const ImageWrapper = styled.div<{ visible: boolean }>`
  opacity: ${(p) => (p.visible ? "1" : "0")};
  position: absolute;
  top: 0;
  bottom: 0;
  cursor: pointer;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
