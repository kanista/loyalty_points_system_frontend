import Sider from "antd/es/layout/Sider";
import {Menu} from "antd";
import {DashboardOutlined, UserAddOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const SideBar = () => {
    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: <Link to="/">Dashboard</Link>
        },
        {
            key: 'add-user',
            icon: <UserAddOutlined />,
            label: <Link to="/add-user">Add New User</Link>
        },
    ];

    return(
        <Sider width={200} className="sidebar">
            <Menu mode="inline" theme="dark" style={{ height: '100%', borderRight: 0 }} items={menuItems} />
        </Sider>
    );
}

export default SideBar;