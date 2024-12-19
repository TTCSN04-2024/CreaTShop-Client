import { Outlet } from "react-router-dom"
import SidebarAdmin from "../components/SideBarAdmin/SidebarAdmin"

const Dashboard = () => {
  
  return (
    <div className="container-fluid">
      <div className="border border-black p-5 flex gap-10 justify-center">
        <div className="p-28 border border-red-600">
          <p>Tổng người dùng </p>
          <p>4</p>
        </div>
        <div className="p-28 border border-red-600">
          <p>Tổng sản phẩm</p>
          <p>4</p>
        </div>
        <div className="p-28 border border-red-600">
          <p>Tổng đơn đặt hàng</p>
          <p>4</p>
        </div>
      </div>
       
    </div>
  )
}

export default Dashboard