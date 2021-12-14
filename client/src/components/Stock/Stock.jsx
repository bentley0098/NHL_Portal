import React, {  useState, useEffect, useCallback } from 'react';
//ReactDataGrid.io used for main grid
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/index.css'
import '@inovua/reactdatagrid-community/theme/default-dark.css'

// Function to export grid to excel
import {LoadDataSource} from './LoadDataSource'

import './stock.css'

import Form from 'react-bootstrap/Form'


const LoadLocations = (selected) => {
  return fetch('/returnLocations/' + selected)
    .then(data => data.json())
} 

//Overall Tasks function that handles the 'Tasks' page
function Stock() {
  
  //----- GET CURRENT USER -----//
  //const tokenString = sessionStorage.getItem('token');
  //const userToken = JSON.parse(tokenString);
  //const Username = userToken.username;
  //const UserID = userToken.userId;

  const [dataSource, setDataSource] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [searchString, setSearchString] = useState("");
  useEffect(() =>{
    setDataSource(LoadDataSource(searchString).data);
  }, [searchString])

  const gridStyle = {
    height: '83vh', 
    margin: 10
  }

  const columns = [
    {name:'Product', header:'Product', type: 'string', defaultFlex: 0},
    {name:'Description', header:'Description', type: 'string', defaultFlex: 1},
    {name:'Quantity', header:'Total', type: 'number', defaultFlex: 0}
  ]

  const theme = 'default-dark';

  //const [selected, setSelected] = useState(null);

  const onSelectionChange = useCallback(({ selected }) => {
    //setSelected(selected);
    setLocationData(LoadLocations(selected));
  }, [])

  const locationColumns = [
    {name:'Location', header:'Location', type: 'string', defaultFlex: 1},
    {name:'BatchID', header:'Batch', type: 'string', defaultFlex: 1},
    {name:'Expiry', header:'Expiry', type: 'string', defaultFlex: 1},
    {name:'Qty', header:'Quantity', type: 'number', defaultFlex: 1}
  ]

  
  return(
    <>
      <div className="stock-container">
        <div className="filter">
          
            <Form.Control 
              className="text-input" 
              size="sm" 
              type="text" 
              placeholder="Search..." 
              value={searchString}
              onChange={e=> setSearchString(e.target.value)}
            />
          
        </div>
        <div className="grid-container">
          <div className="stock-grid">
            <ReactDataGrid
            idProperty="Product"
            columns={columns}
            dataSource={dataSource}
            style={gridStyle}
            theme={theme}
            enableSelection={true}
            onSelectionChange={onSelectionChange}
            	/>
          </div>
          <div className="location-grid">
            <ReactDataGrid
              idProperty="Location"
              columns={locationColumns}
              dataSource={locationData}
              style={gridStyle}
            />
          </div>
        </div>
      </div>
      
    </>       
    
  )
}



export default Stock;  