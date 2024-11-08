import {Avatar, Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {UserOutlined} from "@ant-design/icons";
import SideBar from "../component/SideBar";
import './Home.scss'

const Home=({ children })=>{
    return(
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="top-bar">
                <h5>ABC Company</h5>
                <Avatar icon={<UserOutlined />} className="avatar" />
            </Header>

            <Layout>
                <SideBar />
                <Content className="content">
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default Home;