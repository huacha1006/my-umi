import {Button} from "antd";
import DataJson from "@/./assets/dataSource/data.json"


async function handleDown(){
  const res = await fetch('/api/upload/stream').then(res=>res.blob())
  const blob = new Blob([res]);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a')
  a.href = url;
  a.download = 'xiaoyu.zip'
  a.click();
  console.log(DataJson)


}


function handleOpen(){
  window.open('http://localhost:3000/upload/export')
}

function Product() {
  return (
    <main>
      <h1 className="text-sky-500 text-3xl font-bold">你好，我是product页面</h1>
      <div className="space-y-4">
        <div className="bg-blue-200 h-20 w-100"></div>
        <div className="bg-blue-300 h-20 w-100"></div>
        <div className="bg-blue-400 h-20 w-100"></div>
        <div className="bg-blue-500 h-20 w-100"></div>
        <div className="bg-blue-600 h-20 w-100"></div>
        <Button type='primary' onClick={()=>handleDown()}>点击下载好康的</Button>
        <Button type='primary' onClick={()=>handleOpen()}>通过open的方式</Button>
        <Button type='primary' onClick={()=>console.log(DataJson)}>打印</Button>

      </div>
    </main>
  );
}

export default Product;
