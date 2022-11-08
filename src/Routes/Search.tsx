import { useLocation } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  console.log('keyword', keyword);

  /*
  const paramsString = '?keyword=dune&region=kr';
  const searchParams = new URLSearchParams(paramsString);
   */

  return null;
}

export default Search;
