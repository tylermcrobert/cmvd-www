import React from "react";
import styled from "styled-components";

export const HomepageLayout: React.FC = ({ children }) => {
  return <HomepageLayoutStyle>{children}</HomepageLayoutStyle>;
};

const HomepageLayoutStyle = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;
