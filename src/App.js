import './App.css';
import { useState, useEffect } from 'react';
import AlertPanel from './AlertPanel';
import Links from './Links';
import lodash from 'lodash';
import useSound from 'use-sound';
import help from './music/help.mp3';
import ContactList from './ContactList';
import { Button } from 'antd';
import sources from './config/Sources.json';


function App() {
  const [rules, setRules] = useState([])
  const [isPlaying, setPlaying] = useState(false);
  const [activeSources, setActiveSources] = useState({})
  const [alerts, setAlerts] = useState({})
  const [stoppedAlerts, setStoppedAlerts] = useState([])
  const [play, { stop }] = useSound(help);
  

  useEffect(() => {
    const currentAlerts = lodash.difference(Object.keys(alerts), stoppedAlerts)
    if(!isPlaying && currentAlerts.length) {
      play();
      setPlaying(true);
    }
    else if (isPlaying && !currentAlerts.length) {
      stop();
      setPlaying(false);
    }
  }, [play, stop, isPlaying, alerts, stoppedAlerts]);
	
  useEffect(() => {
    const interval = setInterval(async () => {
      const newActiveSources = {}
      const requests = lodash.map(sources, source => [source, fetch(`${source}/api/v1/rules`)])
      const newRules = []
      for (const [source, req] of requests) {
        try {
          const res = await req
          const j = await res.json()
          for (const group of j.data.groups) {
            newRules.push(...lodash.filter(group.rules, r => ! lodash.isEmpty(r.annotations) && 'kazoo' in r.annotations))
          }
          newActiveSources[source] = true
          removeAlert(source)
        } catch (error) {
          console.log("could not fetch data from source " + source)
          newActiveSources[source] = false
          addAlert(source)
        }
      }
      setRules(_ => newRules)
      setActiveSources(_ => newActiveSources)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addAlert = (alert) => {
    setAlerts((alerts) => {
      if (!(alert in alerts)) {
        alerts = {...alerts}
        alerts[alert] = true
      }
      return alerts
    })
  }

  const removeAlert = (alert) => {
    setAlerts((alerts) => {
      if(alert in alerts) {
        alerts = {...alerts}
        delete alerts[alert]
      }
      return alerts
    })
    setStoppedAlerts((stoppedAlerts) => {
      const idx = stoppedAlerts.indexOf(alert)
      if(idx != -1) {
        stoppedAlerts = [...stoppedAlerts]
        stoppedAlerts.splice(idx, 1)
      }
      return stoppedAlerts
    })
  }

  const StopCurrentAlerts = () => {
    setStoppedAlerts(() => Object.keys(alerts))
  }

  return (
    <div className="App">
      <div className="Header">
        <ContactList />
	<div className="KazooHeader">
	  Kazoo UI
	</div>
        <Button className="StopSoundButton" onClick={StopCurrentAlerts}>Stop Sound</Button>
      </div>
      <div className="Main">
        <AlertPanel rules={rules} addAlert={addAlert} removeAlert={removeAlert} sources={activeSources} />
      </div>
      <div className="Footer">
        <Links/>
      </div>
    </div>
  );
}

export default App;
