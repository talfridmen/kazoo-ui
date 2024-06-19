import { Tag } from 'antd';
import './AlertPanel.css';
import AlertRule from './AlertRule';
import _ from 'lodash';


function AlertPanel(props) {
  return (
    <div className="AlertPanel">
      <div className="AlertPanelSources">
        { _.toPairs(props.sources).map(
          kv => (
            <Tag key={kv[0]} color={kv[1] ? 'success' : 'error'} onClick={() => {window.open(`${kv[0]}/alerts`, "_blank", "noreferrer")}}>{kv[0]}</Tag>
          )
        )}
      </div>
      <div className="AlertPanelAlerts">
        { _.map(
            props.rules, 
            (rule, index) => (
              <AlertRule key={rule.name} 
                rule={rule} 
                addAlert={props.addAlert}
                removeAlert={props.removeAlert}
              />
            )
        ) }
      </div>
    </div>
  );
}

export default AlertPanel;
