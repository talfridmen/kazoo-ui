import './AlertRule.css';
import { Card, Tag, Tooltip } from 'antd'
import { CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { useState } from 'react';
import { useEffect } from 'react';
import _ from 'lodash';


function AlertRule(props) {
  const [ignore, setIgnore] = useState(false);
  const toggleAlertIgnore = () => {
    setIgnore((ignore) => !ignore);
  }

  useEffect(() => {
    if (!ignore && props.rule.state === 'firing') {
      props.addAlert(props.rule.name)
    }
    else {
      props.removeAlert(props.rule.name)
    }
  }, [ignore, props])

  const AlertIcon = ignore ? CiVolumeMute : CiVolumeHigh

  return (
    <div className="AlertRule">
      <Tooltip title={props.rule.annotations.summary}>
        <Card className={`${props.rule.state}`} 
              title={props.rule.name} 
              extra={<AlertIcon onClick={toggleAlertIgnore} className={"AlertIcon"}/>}>
                {_.map(props.rule.alerts, (alert) => <Tag color="error">{alert.labels[alert.annotations.kazoo]}</Tag>)}
        </Card>
      </Tooltip>
    </div>
  );
}

export default AlertRule;
