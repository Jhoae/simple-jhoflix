import styled from 'styled-components';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { PathMatch, useMatch, useNavigate } from 'react-router-dom';
import { IGetMoviesResult, makeBigMovieModalPath } from '../api';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { makeImagePath } from '../utils';

const BigMovie = styled(motion.div)`
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 30px;

  position: fixed;
  width: 700px;
  height: 620px;
  top: 0;
  left: 0;
  right: 0;
  margin: 50px auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;

  background-position: center center;
  background-size: 620px 400px;
  border-radius: 12px;
`;

const BigTitle = styled.div`
  color: ${(props) => props.theme.white.lighter};
  margin-top: 20px;
  margin-bottom: 20px;

  position: relative;
  top: -70px;
  padding: 10px;

  font-size: 20px;
  font-weight: bold;
  font-style: italic;
`;
const BigOverView = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};

  position: relative;
  top: -70px;
`;

function BigMovieModal({ clickedMovie }: any) {
  const bigMovieMatch: PathMatch<string> | null = useMatch('/movies/:movieId');
  //  let movieId = bigMovieMatch?.params.movieId;
  console.log('clickedMovie', clickedMovie);

  const [ShowOverView, setShowOverView] = useState(false);

  return (
    <>
      <BigMovie className="BigMovie">
        {clickedMovie && (
          <>
            <BigCover
              className="BigCover"
              style={{
                backgroundImage: `
                
                linear-gradient(to top,black,transparent),
                url(${makeImagePath(clickedMovie.poster_path, 'w500')})`,
              }}
            />
            <BigTitle>
              {clickedMovie.title} ({clickedMovie.release_date})
            </BigTitle>

            {ShowOverView ? (
              <BigOverView
                className="BigOverView"
                onClick={() => setShowOverView((prev) => !prev)}
              >
                {clickedMovie.overview}
              </BigOverView>
            ) : (
              <span
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  top: '-50px',
                }}
                onClick={() => setShowOverView((prev) => !prev)}
              >
                내용 보기...
              </span>
            )}
          </>
        )}
      </BigMovie>
    </>
  );
}

export default BigMovieModal;
