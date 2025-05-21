import { useState } from 'react'
import { Layout, Menu, theme, Typography } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ClusterOutlined,
  AppstoreOutlined,
  LineChartOutlined,
  NodeIndexOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  UploadOutlined,
  ScheduleOutlined,
  ApartmentOutlined,
  DashboardOutlined,
  AreaChartOutlined,
} from '@ant-design/icons'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'
import ComponentList from './pages/components/ComponentList'
import ComponentDetail from './pages/components/ComponentDetail'
import UploadComponent from './pages/components/UploadComponent'
import ClusterList from './pages/clusters/ClusterList'
import CreateCluster from './pages/clusters/CreateCluster'
import TaskList from './pages/tasks/TaskList'
import TaskDetail from './pages/tasks/TaskDetail'
import TopologyPage from './pages/observability/Topology'
import NodeResourcesPage from './pages/observability/NodeResources'
import ProgramDetailPage from './pages/observability/ProgramDetail'
import NodeMetricsPage from './pages/observability/NodeMetrics'
import PageBreadcrumb from './components/PageBreadcrumb'
import Logo from './components/Logo'

const { Header, Sider, Content } = Layout
const { Title } = Typography

function App() {
  const [collapsed, setCollapsed] = useState(true)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Logo collapsed={collapsed} />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={[]}
            items={[
              {
                key: 'clusters',
                icon: <ClusterOutlined />,
                label: '集群管理',
                children: [
                  {
                    key: 'clusters-list',
                    icon: <UnorderedListOutlined />,
                    label: <Link to="/clusters/list">集群列表</Link>,
                  },
                  {
                    key: 'clusters-create',
                    icon: <PlusOutlined />,
                    label: <Link to="/clusters/create">新建集群</Link>,
                  },
                ],
              },
              {
                key: 'components',
                icon: <AppstoreOutlined />,
                label: '组件管理',
                children: [
                  {
                    key: '2-1',
                    icon: <UnorderedListOutlined />,
                    label: <Link to="/components/list">组件列表</Link>,
                  },
                  {
                    key: '2-3',
                    icon: <UploadOutlined />,
                    label: <Link to="/components/upload">上传组件</Link>,
                  },
                ],
              },
              {
                key: 'tasks',
                icon: <ScheduleOutlined />,
                label: '任务管理',
                children: [
                  {
                    key: 'tasks-list',
                    icon: <UnorderedListOutlined />,
                    label: <Link to="/tasks/list">任务列表</Link>,
                  },
                ],
              },
              {
                key: 'observability',
                icon: <LineChartOutlined />,
                label: '可观测',
                children: [
                  {
                    key: 'observability-node-resources',
                    icon: <NodeIndexOutlined />,
                    label: <Link to="/observability/node-resources">节点资源</Link>,
                  },
                  {
                    key: 'observability-node-metrics',
                    icon: <AreaChartOutlined />,
                    label: <Link to="/observability/node-metrics">节点指标</Link>,
                  },
                  {
                    key: 'observability-topo',
                    icon: <ApartmentOutlined />,
                    label: <Link to="/observability/topo">拓扑关系</Link>,
                  },
                ],
              },
              {
                key: '4',
                icon: <NodeIndexOutlined />,
                label: <Link to="/workflow">工作流</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div
              style={{
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {collapsed ? (
                  <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
                ) : (
                  <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
                )}
                <Title level={4} style={{ margin: '0 0 0 16px' }}>
                  BeePF 管理平台
                </Title>
              </div>
            </div>
          </Header>
          <div style={{ padding: '16px 24px 0', background: colorBgContainer }}>
            <PageBreadcrumb />
          </div>
          <Content
            style={{
              margin: '0 16px 16px',
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/components/list" replace />} />
              <Route path="/clusters/list" element={<ClusterList />} />
              <Route path="/clusters/create" element={<CreateCluster />} />
              <Route path="/clusters/edit/:id" element={<CreateCluster />} />
              <Route path="/components/list" element={<ComponentList />} />
              <Route path="/components/create" element={<Navigate to="/components/upload" replace />} />
              <Route path="/components/upload" element={<UploadComponent />} />
              <Route path="/component/:id" element={<ComponentDetail />} />
              <Route path="/tasks/list" element={<TaskList />} />
              <Route path="/task/:taskId" element={<TaskDetail />} />
              <Route path="/observability" element={<Navigate to="/observability/node-resources" replace />} />
              <Route path="/observability/node-resources" element={<NodeResourcesPage />} />
              <Route path="/observability/node-metrics" element={<NodeMetricsPage />} />
              <Route path="/observability/program-detail/:progId" element={<ProgramDetailPage />} />
              <Route path="/observability/topo" element={<TopologyPage />} />
              <Route path="/workflow" element={<div>工作流</div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}

export default App
