import styled from 'styled-components';
import { motion, useMotionValue, useAnimation, useScroll } from 'framer-motion';
import { Link, useMatch, PathMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 70px;
  top: 0;

  font-size: 14px;
  padding: 20px 60px;
  padding-left: 10px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled(motion.svg)`
  margin-right: 70px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 4px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;

  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const RedCircle = styled(motion.span)`
  position: absolute;
  bottom: -5px;
  top: 23px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.red};
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  hover: {
    fillOpacity: [0, 1, 0],
    transition: { repeat: Infinity },
  },
};

const Search = styled.span`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
    //    padding-right: 25px;
  }
`;

const SearchInput = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const navVariants = {
  top: { backgroundColor: 'rgba(0,0,0,0)' },
  scroll: { backgroundColor: 'rgba(0,0,0,1)' },
};

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMarch = useMatch('/');
  const tvMarch = useMatch('/tv');
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();

  const { scrollY } = useScroll();

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        //  navAnimation.start({
        //   backgroundColor: 'rgba(0,0,0,1)',
        //  });
        navAnimation.start('scroll');
      } else {
        //        navAnimation.start({
        //          backgroundColor: 'rgba(0,0,0,0)',
        //        });
        navAnimation.start('top');
      }
    });
  }, [scrollY]);

  const toggleSearch = () => {
    if (searchOpen) {
      // 애니메이션 닫기
      inputAnimation.start({ scaleX: 0 });
    } else {
      // 애니메이션 열기
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  return (
    <Nav
      variants={navVariants}
      className="Nav"
      initial="top"
      animate={navAnimation}
    >
      <Col className="Col">
        <Logo
          variants={logoVariants}
          whileHover="hover"
          initial="normal"
          className="Logo"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 474.000000 193.000000"
        >
          <g
            transform="translate(0.000000,193.000000) scale(0.100000,-0.100000)"
            stroke="none"
            fill="#d81f26"
          >
            <motion.path
              d="M1227 1304 c-3 -4 -73 -8 -154 -10 -339 -8 -516 -21 -575 -42 -31
 -11 -89 -24 -128 -28 -70 -7 -91 -19 -75 -44 4 -7 11 -8 18 -2 7 6 36 13 65
 17 29 4 80 16 115 28 65 21 245 34 584 41 147 3 193 12 177 37 -6 10 -18 12
 -27 3z"
              //    d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
              fill="#d81f26"
            />
            <motion.path
              d="M1130 1850 c-19 -5 -73 -16 -120 -24 -47 -9 -128 -28 -180 -42 -52
              -13 -138 -34 -190 -45 -114 -24 -237 -62 -288 -89 -20 -10 -70 -50 -110 -87
              l-73 -68 53 -95 c63 -113 52 -109 282 -109 l148 -1 -5 -22 c-3 -13 -9 -45 -12
              -73 -11 -77 -32 -142 -76 -235 -63 -130 -76 -162 -88 -206 -10 -39 -50 -83
              -120 -134 -15 -11 -19 -22 -14 -42 3 -15 9 -25 14 -22 5 3 9 -2 9 -10 0 -8 9
              -18 20 -21 20 -6 20 -7 -5 -27 -14 -10 -25 -26 -25 -34 0 -16 18 -51 38 -72 6
              -7 12 -20 12 -27 0 -8 9 -16 19 -20 12 -4 18 -12 14 -21 -3 -9 1 -14 12 -14 9
              0 14 -4 10 -9 -8 -13 16 -61 30 -61 28 0 112 57 167 113 93 96 131 181 187
              412 17 72 38 155 47 185 9 30 15 84 15 120 -1 81 -29 190 -48 190 -32 0 -6 34
              37 48 25 7 81 29 126 48 45 19 90 34 101 34 11 0 37 14 58 30 24 19 49 30 70
              30 31 0 61 20 49 33 -3 3 -21 3 -40 0 -42 -7 -43 2 -1 50 l32 37 80 0 81 0 -4
              -42 c-2 -24 -7 -52 -12 -63 -4 -11 -13 -36 -20 -55 -7 -19 -16 -44 -21 -55 -5
              -11 -13 -40 -18 -65 -5 -25 -23 -98 -40 -163 -17 -65 -31 -128 -31 -141 0 -12
              -4 -26 -9 -31 -9 -10 -20 -56 -42 -180 -5 -33 -14 -68 -20 -77 -5 -10 -9 -28
              -9 -40 0 -27 -39 -196 -51 -223 -5 -11 -11 -60 -12 -110 l-2 -90 27 -3 c39 -5
              55 35 78 198 8 54 29 123 43 136 4 4 7 20 7 36 0 16 22 71 50 122 27 52 48 95
              47 98 -1 2 18 -16 42 -40 l44 -44 41 41 42 41 16 -33 c9 -17 19 -52 23 -77 8
              -54 7 -294 -1 -366 -7 -58 -6 -59 82 -63 l51 -2 7 67 c4 37 4 115 0 174 -6 99
              -5 107 12 114 18 7 18 8 1 21 -13 9 -19 31 -22 74 -5 70 -13 88 -61 141 -30
              32 -32 39 -19 50 24 20 18 32 -35 85 -46 45 -51 48 -67 33 -12 -11 -23 -14
              -34 -8 -12 7 -23 1 -44 -20 -16 -17 -33 -30 -38 -30 -6 0 -7 32 -3 83 7 89 20
              142 57 235 5 13 9 33 9 45 0 13 4 27 8 33 5 5 14 36 21 69 12 58 40 157 64
              220 6 17 11 55 11 85 1 55 1 55 -29 55 -23 0 -31 -5 -33 -21 -2 -16 -12 -23
              -33 -26 -16 -3 -29 -1 -29 3 0 4 -8 10 -17 12 -16 4 -16 5 1 6 15 1 16 4 6 16
              -11 13 -10 18 6 30 16 13 17 16 4 25 -18 12 -309 11 -360 0z"
            />
            <motion.path
              d="M3507 1628 c-6 -131 -34 -299 -77 -463 -11 -44 -24 -82 -28 -85 -10
              -9 -143 -39 -163 -38 -22 2 -44 68 -23 68 11 0 14 16 14 69 0 84 5 100 31 94
              26 -7 24 0 -18 71 -102 171 -166 217 -324 233 -84 9 -165 -53 -218 -167 -22
              -47 -26 -72 -29 -180 -2 -69 1 -172 6 -230 5 -58 8 -107 6 -109 -2 -2 -23 -7
              -46 -11 l-43 -6 0 125 c0 143 -5 158 -105 294 -71 96 -96 110 -190 104 -63 -4
              -79 -2 -98 14 -30 24 -81 33 -136 25 -63 -10 -111 -62 -201 -219 -22 -39 -26
              -54 -20 -90 19 -124 17 -177 -10 -274 -24 -82 -27 -108 -23 -191 5 -107 32
              -198 70 -240 13 -13 42 -33 66 -43 23 -10 42 -23 42 -29 0 -18 71 -42 109 -37
              140 19 283 123 351 257 16 32 28 40 85 58 36 12 70 22 75 22 5 0 14 -18 21
              -39 l12 -39 37 13 c21 7 40 11 43 8 3 -2 15 0 26 7 21 10 21 9 23 -87 0 -54 0
              -124 -1 -156 l-3 -57 81 0 81 0 0 90 c0 67 3 89 13 87 14 -2 11 122 -4 138 -5
              5 -9 28 -9 51 0 38 3 43 38 60 20 9 88 30 151 46 62 15 138 41 167 57 30 16
              54 26 54 22 0 -3 -9 -39 -20 -79 -26 -95 -26 -101 14 -117 l34 -14 -14 -68
              c-8 -37 -17 -87 -21 -110 l-6 -43 75 0 74 0 14 50 c15 55 25 61 95 57 l40 -2
              3 84 c2 64 -1 89 -14 109 -27 41 -15 216 26 372 17 69 35 157 39 195 l6 70 24
              -64 c28 -77 59 -111 101 -111 16 0 30 5 30 10 0 6 5 10 10 10 6 0 10 -14 10
              -30 0 -18 -5 -29 -12 -28 -21 5 -22 -41 -1 -49 10 -3 22 -12 26 -20 18 -29 27
              -9 27 61 l0 74 30 7 c55 12 112 151 88 214 -15 41 -58 80 -96 87 -18 4 -42 15
              -52 26 -25 27 -93 35 -124 15 -23 -16 -24 -15 -30 23 -5 32 -9 37 -26 33 -19
              -5 -20 0 -20 71 l0 76 -79 0 -78 0 -6 -132z m-630 -204 c-14 -14 -27 -35 -29
              -46 -2 -12 -9 -23 -16 -26 -10 -3 -10 3 3 27 16 33 50 71 61 71 4 0 -5 -12
              -19 -26z m262 -75 c9 -15 8 -19 -4 -19 -8 0 -22 14 -30 30 -15 30 -15 30 3 19
              11 -7 24 -20 31 -30z m-318 -66 c-4 -28 -6 -32 -9 -15 -3 22 3 52 11 52 1 0 1
              -17 -2 -37z m-734 -11 c-15 -14 -27 -21 -27 -15 0 15 41 55 49 48 3 -3 -7 -18
              -22 -33z m925 -59 c18 -32 38 -77 44 -100 11 -42 11 -42 -20 -49 -17 -4 -49
              -20 -70 -37 l-39 -31 6 76 c3 41 12 89 21 106 9 17 16 45 16 62 0 16 2 30 5
              30 3 0 19 -26 37 -57z m-702 -197 c16 -38 26 -75 23 -83 -3 -7 0 -13 6 -13 18
              0 13 -76 -6 -96 -21 -20 -70 -42 -138 -60 -90 -25 -85 -31 -85 115 0 157 8
              184 58 198 20 6 55 10 76 9 38 -1 39 -2 66 -70z m-110 -481 c-14 -16 -50 -21
              -50 -6 0 11 18 19 44 20 15 1 16 -2 6 -14z"
            />
            <motion.path
              d="M4103 1538 c-80 -34 -77 -25 -35 -118 11 -25 23 -55 26 -67 3 -13 9
              -32 12 -43 4 -15 2 -18 -10 -14 -19 7 -20 -11 -7 -65 26 -101 32 -142 25 -163
              l-8 -23 -5 23 c-8 31 -27 24 -23 -8 9 -73 4 -91 -77 -251 -47 -93 -80 -149
              -76 -129 4 19 9 104 12 188 l5 152 -34 2 c-18 1 -51 2 -73 2 l-40 -1 -3 -46
              c-2 -38 -7 -47 -21 -47 -20 0 -31 -19 -31 -51 0 -12 -7 -19 -19 -19 -16 0 -19
              -11 -24 -87 -3 -49 -10 -99 -15 -113 -5 -14 -12 -46 -16 -72 -7 -44 -6 -48 13
              -48 12 0 21 -7 21 -15 0 -9 9 -15 21 -15 12 0 23 -8 26 -19 4 -15 15 -21 49
              -23 l44 -3 -33 -50 c-36 -53 -71 -178 -65 -228 3 -25 12 -33 69 -57 l67 -28
              24 26 c14 15 40 50 58 77 19 28 59 82 90 120 32 39 85 112 119 162 35 51 67
              93 72 93 4 0 13 -19 19 -42 10 -42 29 -110 66 -235 l19 -63 74 0 74 0 -7 123
              c-3 67 -11 142 -16 167 -5 25 -9 85 -10 134 0 50 -5 126 -12 170 l-11 81 46
              82 c26 45 47 87 47 92 0 5 10 22 23 38 13 16 23 41 22 59 0 31 -27 68 -40 56
              -4 -4 -5 14 -2 40 6 41 3 50 -24 85 -17 21 -37 46 -44 57 -21 28 -59 13 -115
              -45 -43 -45 -49 -48 -55 -31 -3 11 -26 50 -50 87 -24 37 -47 80 -50 96 -4 16
              -10 31 -13 33 -4 2 -39 -9 -79 -26z m7 -870 c0 -7 -9 -24 -21 -38 l-20 -25 18
              38 c18 39 23 45 23 25z"
            />
          </g>
        </Logo>
        <Items className="Items">
          <Item className="Item">
            <Link to="/">
              Home
              {homeMarch && <RedCircle layoutId="RedCircle" />}
            </Link>
          </Item>
          <Item className="Item">
            <Link to="/tv">
              Tv Shows
              {tvMarch && <RedCircle layoutId="RedCircle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col className="Col">
        <Search className="Search">
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -215 : 0 }}
            transition={{ type: 'linear' }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>

          {searchOpen && (
            <SearchInput
              animate={inputAnimation}
              className="SearchInput"
              transition={{ type: 'linear' }}
              //            animate={{ scaleX: searchOpen ? 1 : 0 }}
              placeholder="검색"
            />
          )}
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
