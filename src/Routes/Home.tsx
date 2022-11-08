import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { PathMatch, useMatch, useNavigate } from 'react-router-dom';
import useWindowDimensions from '../useWidowDimensions';

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;

  height: 200vh;
`;
const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  //  white-space: nowrap;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 30px;
  width: 50%;
  height: 180px;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  &:hover {
    overflow: visible;
    -webkit-line-clamp: initial;
  }
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;

  position: absolute;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 100px;
  background-image: url(${(props) => props.bgphoto});
  background-size: 16vw 100px;
  background-position: center center;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)<{ posterpath: string }>`
  opacity: 0;

  position: absolute;
  width: 100%;

  bottom: 0;
  div {
    height: 100px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
      url(${(props) => props.posterpath});
    background-size: 16vw 105px;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    > h4 {
      font-size: 14px;
      padding: 5px;

      width: 14vw;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    > p {
      font-size: 5px;
      width: 14vw;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 5px;
      padding-bottom: 5px;
    }
  }
`;
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: 'tween',
    },
  },
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

/*
 const rowVariants = {
  hidden: {
    x: window.innerWidth - 50,
  },
  visible: { x: 0 },
  exit: { x: -window.innerWidth + 50 },
};
 */

// 슬라이드 박스 개수
const offset = 6;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.5,
    y: -30,
    transition: {
      delay: 0.3,
      type: 'tween',
    },
  },
};

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1; // 메인에서 쓴 1개영화는 빼기
      //      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const navigate = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch('/movies/:movieId');

  const onBoxClicked = (movieId: number) => {
    console.log('bigMovieMatch', bigMovieMatch);
    navigate(`/movies/${movieId}`);
  };

  const onOverlayClick = () => {
    navigate('/');
  };

  const { scrollY } = useScroll();

  // 슬라이더 넓이 겹침 에러 수정
  const width = useWindowDimensions();

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgphoto={makeImagePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                //                variants={rowVariants}
                initial={{ x: width + 10 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 10 }}
                transition={{ type: 'tween', duration: 1.2 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ''}
                      onClick={() => onBoxClicked(movie.id)}
                      key={movie.id}
                      className="Box"
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: 'tween' }}
                      bgphoto={makeImagePath(movie.backdrop_path, 'w200')}
                    >
                      <Info
                        className="Info"
                        variants={infoVariants}
                        whileHover="hover"
                        posterpath={makeImagePath(movie.poster_path, 'w200')}
                      >
                        <div>
                          <h4>{movie.title}</h4>
                          <p>{movie.overview}</p>
                        </div>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch && (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  layoutId={bigMovieMatch.params.movieId + ''}
                  style={{
                    position: 'absolute',
                    width: '40vw',
                    height: '80vh',
                    backgroundColor: 'red',
                    top: scrollY,
                    left: 0,
                    right: 0,
                    margin: '0 auto',
                  }}
                >
                  {bigMovieMatch.params.movieId}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
