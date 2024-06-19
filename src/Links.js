import './AlertPanel.css';
import { FloatButton } from 'antd';
import { LinkOutlined, DashboardOutlined } from '@ant-design/icons';
import _ from 'lodash';

const links = [
    {
        icon: <DashboardOutlined />,
        link: "https://grafana/"
    }
]

function Links() {
  return (
    <div className="Links">
        <FloatButton.Group trigger='hover' style={{right: 24}} icon={<LinkOutlined />}>
            {_.map(links, (link) => <FloatButton icon={link.icon} href={link.link} />)}
        </FloatButton.Group>   
    </div>
  );
}

export default Links;
