import './ContactList.css';
import { Table } from 'antd';
import contacts from './config/contactList.json';

function ContactList() {
  return (
    <div className="ContactList">
      <Table className='ContactListTable' dataSource={contacts} showHeader={false} size='small' pagination={false} columns={[{key:"name", dataIndex:"name"}, {key:"phone", dataIndex:"phone"}]}/>
    </div>
  );
}

export default ContactList;
