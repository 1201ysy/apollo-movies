import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"


const Container = styled.div`
  height: 380px;
  max-width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  border-radius: 7px;
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;


export default function({ id, bg }){
  const IMAGE_URL = `${IMAGE_BASE_URL}${bg}`
  return (<Container>
    <Link to={`/${id}`}>
      <Poster bg={IMAGE_URL} />
    </Link>
  </Container>);
};