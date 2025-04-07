import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { ContainerOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]
const { Sider } = Layout

import { useNavigate } from 'react-router'
import AppRoutes from './routes/routes.tsx'

const App = () => {
    const [siderItem, setSiderItem] = useState('todo')

    const navigate = useNavigate()

    const itemsSider: MenuItem[] = [
        { key: 'todo', icon: <ContainerOutlined />, label: 'Todo-List', onClick: () => navigate('/todo') },
        { key: 'profile', icon: <UserOutlined />, label: 'Профиль', onClick: () => navigate('/profile') },
    ]

    return (
        <Layout hasSider style={{ height: '100vh' }}>
            <Sider theme="light">
                <Menu
                    items={itemsSider}
                    mode="inline"
                    defaultSelectedKeys={[`${siderItem}`]}
                    onSelect={key => {
                        setSiderItem(key.key)
                    }}></Menu>
            </Sider>
            <AppRoutes />
        </Layout>
    )
}

export default App
