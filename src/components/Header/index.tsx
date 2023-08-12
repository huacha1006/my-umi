import './index.less';
import { history, Link } from 'umi';
import {ElementRef, useEffect, useRef, useState} from "react";
import { throttle } from 'lodash'
const tagList = [
  { name: '研发信息', path: '/product' },
  { name: '公司新闻', path: '/produce' },
  { name: '设备信息', path: '/produce' },
  { name: '加入我们', path: '/join' },
];

function TagComponents(){
  return (
    <>
      {tagList.map((item, index) => {
        return (
          <div key={index}>
            <Link to={item.path}>{item.name}</Link>
          </div>
        );
      })}
    </>
  );
};

export default function Header() {
  const [down,setDown] = useState<boolean>(false);
  const divRef = useRef<any>(null)


  useEffect(()=>{
    window.addEventListener("scroll", srollFun, true);
    return window.removeEventListener("scroll", srollFun)

  },[])

  const srollFun = ()=>{
    let scroll = document.documentElement.scrollTop;

    if(scroll > 40){
        setDown(true)
    }else{
      setDown(false)
    }
  }


  return (
    <main className={ down ? "header-box slide_down shadow-xl" : "header-box"} ref={divRef}>
      <section className="header-container">
        <div className="header-left">金哲羽的小站</div>
        <div className="header-right">
          <TagComponents />
        </div>
      </section>
    </main>
  );
}
