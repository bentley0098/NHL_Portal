import React, {  useState, useEffect, useCallback } from 'react';
//ReactDataGrid.io used for main grid
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/index.css'
import '@inovua/reactdatagrid-community/theme/default-dark.css'

//Bootstrap Used for buttons, modals and styling
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

//React-DatePicker used for date inputs
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

// Function to export grid to excel
import {LoadDataSource} from './LoadDataSource'




//Overall Tasks function that handles the 'Tasks' page
function Stock() {
  
  //----- GET CURRENT USER -----//
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  //const Username = userToken.username;
  const UserID = userToken.userId;

  const [dataSource, setDataSource] = useState([]);
  useEffect(() =>{
    setDataSource(LoadDataSource().data);

  }, [])

  const gridStyle = {
    height: '80vh', 
    margin: 10
    //border: '1px solid black',
    //boxShadow:  '0 0 8px 2px rgba(0, 0, 0)'
  }

  const columns = [
    {name:'Product', header:'Product', type: 'string', defaultFlex: 0},
    {name:'Description', header:'Description', type: 'string', defaultFlex: 1},
    {name:'Quantity', header:'Total', type: 'number', defaultFlex: 0}
  ]

  const theme = 'default-dark';

  
  return(
    <>
      <div className="filter">
        test
      </div>
      <ReactDataGrid
        idProperty="Task"
        columns={columns}
        dataSource={dataSource}
        style={gridStyle}
        theme={theme}
      />
      <div className="location-grid">
        test
      </div>
    </>       
    
  )
}



export default Stock;  