import './index.less';
import { history, Link } from 'umi';
const tagList = [
  { name: '研发信息', path: '/product' },
  { name: '公司新闻', path: '/produce' },
  { name: '设备信息', path: '/produce' },
  { name: '加入我们', path: '/join' },
];

const TagComponents: React.FC = () => {
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
  return (
    <main className="header-box">
      <section className="header-container">
        <div className="header-left">旭链科技</div>
        <div className="header-right">
          <TagComponents />
        </div>
      </section>
    </main>
  );
}
