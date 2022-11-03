import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { AnimatePresence, motion } from 'framer-motion';

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
  background-size: cover;
  background-position: center center;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;

  position: absolute;
  //  height: 100%;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
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

const rowVariants = {
  hidden: {
    x: window.outerWidth - 100,
  },
  visible: { x: 0 },
  exit: { x: -window.outerWidth + 100 },
};

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
  const toggleLeaving = () => setLeaving((prev) => !prev);
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
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1.2 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
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
                      >
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
