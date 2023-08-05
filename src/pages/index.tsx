import { Header } from '@/components';
import './index.less';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../styles/tailwind.css';

const BoxFC: React.FC<{ index: number }> = ({ index }) => {
  const divRef = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting && setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }, // 可选配置项
    );

    observer.observe(divRef.current);

    return () => {
      observer.unobserve(divRef.current);
    };
  }, []);

  return (
    <div
      className={isVisible ? 'visible cardBox' : 'cardBox'}
      ref={divRef}
      key={index}
    >
      {/* 0{index+1} */}
      <span className={isVisible ? 'visible word letter-1' : 'word letter-1'}>
        Get
      </span>
      <span className={isVisible ? 'visible word letter-2' : 'word letter-2'}>
        {' '}
        good
      </span>
      <span className={isVisible ? 'visible word letter-3' : 'word letter-3'}>
        {' '}
        at
      </span>
      <span className={isVisible ? 'visible word letter-4' : 'word letter-4'}>
        Three.js
      </span>
      <span className={isVisible ? 'visible word letter-5' : 'word letter-5'}>
        with
      </span>
      <span className={isVisible ? 'visible word letter-6' : 'word letter-6'}>
        only
      </span>
      <span className={isVisible ? 'visible word letter-7' : 'word letter-7'}>
        one
      </span>
      <span className={isVisible ? 'visible word letter-8' : 'word letter-8'}>
        course
      </span>
      {/* <img src={require('../assets/chapter-04.webp')} width='300px' height='300px' alt="" /> */}
      <div className={isVisible ? 'visible container' : 'container'}></div>
    </div>
  );
};

export default function IndexPage() {
  const CardInfoArr = new Array(6).fill('').map((res, index) => {
    return <BoxFC index={index} />;
  });

  return (
    <div>
      <Header />
      <h1 className="title">Page index</h1>
      {/* {CardInfoArr} */}
    </div>
  );
}
