import React from "react";
import { useParams } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
import styled from "styled-components";
import { Link } from "react-router-dom";

  /*
  const GET_MOVIE = gql`
    query GetMovie {
        movieDetail(id: 508943) {
            id
            title
            overview
    }
  }
`;
*/

const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"

const GET_MOVIE = gql`
  query GetMovie($id: Int!) {
    movieDetail(id: $id) {
        id
        title
        overview
        poster_path
        release_date
        vote_average
        runtime
    }
    similarMovies(id: $id) {
        id
        poster_path
    }
  }
`;

const Container = styled.div`
  height: 120vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
  margin-top: 25px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 100%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

const SimilarMovies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  margin-top: 25px;
`;

const Poster_Container = styled.div`
  height: 35vh;
  max-width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  border-radius: 7px;
`;

const Poster_mini = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

const Gap = styled.div`
  margin-bottom: 50px;
  margin-top: 50px;
`;
/*
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px; 
*/

class SimilarMovie {
    constructor(id, posterURLs) {
      this.id = id;
      this.posterURLs = posterURLs;
    }
}

  export default () => {
    const { id } = useParams();
    const intId = parseInt(id)
    //console.log(id,  typeof id, intId ,typeof intId);
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { id: intId },
      });

    console.log(loading, error, data);
    let IMAGE_URL = "";
    let RUNTIME = "";
    let RATING = "";
    let similarMoviesList = new Array()

    if (!loading && data){
        IMAGE_URL = `${IMAGE_BASE_URL}${data.movieDetail.poster_path}`;
        RUNTIME = `${data.movieDetail.runtime}분`;
        RATING = `${data.movieDetail.vote_average}/10`;

        data.similarMovies.forEach( m => 
            similarMoviesList.push(new SimilarMovie(parseInt(m.id),`${IMAGE_BASE_URL}${m.poster_path}` ) 
            ));
        similarMoviesList.length = 4;

        console.log(similarMoviesList);
    }

    return (
        <Container>
          <Column>
            <Title>{loading ? "Loading..." : data.movieDetail.title}</Title>
            {!loading && data.movieDetail && (
              <>
                <Subtitle>
                  {RUNTIME} · {RATING}
                </Subtitle>
                <Description>{data.movieDetail.overview}</Description>
                
                <Gap></Gap>
                <Subtitle>
                  {"Similar Movies"}
                </Subtitle>

            
                {!loading && data.similarMovies && (
                    <SimilarMovies>
                    {similarMoviesList.map(m => (
                        <Link to={`/${m.id}`}>
                            <Poster_Container key={m.id}><Poster_mini key={m.id} id={m.id} bg={m.posterURLs}></Poster_mini></Poster_Container>
                        </Link>
                     ))}
                    </SimilarMovies>
                )}
              </>
            )}

          </Column>
          <Poster
            bg={data && data.movieDetail ? IMAGE_URL : ""}
          ></Poster>
        </Container>
      );
    };
