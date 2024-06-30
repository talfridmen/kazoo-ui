import './AlertPanel.css';
import { FloatButton } from 'antd';
import { LinkOutlined, DashboardOutlined } from '@ant-design/icons';
import _ from 'lodash';
import links from './config/Links.json';

function Links() {
  return (
    <div className="Links">
        <FloatButton.Group trigger='hover' style={{right: 24}} icon={<DashboardOutlined />}>
            {_.map(links, (link) => <FloatButton description={link.description} shape="square" href={link.link} />)}
        </FloatButton.Group>   
    </div>
  );
}

export default Links;
