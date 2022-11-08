import React, { useEffect, useState } from 'react';

function getWindowDimensions() {
  const { innerWidth: width } = window;
  //  const width = window.innerWidth;
  return width;
}
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
}

// 이제 width는 window의 width값을 계속 추적
export default useWindowDimensions;
