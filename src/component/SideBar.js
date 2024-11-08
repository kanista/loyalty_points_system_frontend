import Sider from "antd/es/layout/Sider";
import {Menu} from "antd";
import {DashboardOutlined, UserAddOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const SideBar = () => (
    <Sider width={200} className="sidebar">
        <Menu mode="inline" theme="dark" style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item icon={<DashboardOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<UserAddOutlined />}>
                <Link to="/add-user">Add New User</Link>
            </Menu.Item>
        </Menu>
    </Sider>
);

export default SideBar;