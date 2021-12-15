import React, {  useState, useEffect, useCallback } from 'react';
//ReactDataGrid.io used for main grid
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/index.css'
import '@inovua/reactdatagrid-community/theme/default-dark.css'
import {LoadDataSource} from './LoadDataSource'
import './stock.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
// Function to export grid to excel
import { exportCSV_stock, exportPDF_stock, exportCSV_locations, exportPDF_locations } from '../excelExport.js'
import {RiFileExcel2Line} from 'react-icons/ri'
import {ImFilePdf} from 'react-icons/im'




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
    {name:'Quantity', header:'Total', type: 'number', defaultFlex: 0, textAlign: 'end'}
  ]

  const theme = 'default-dark';

  const [selected, setSelected] = useState(null);

  const onSelectionChange = useCallback(({ selected }) => {
    setSelected(selected);
    setLocationData(LoadLocations(selected));
  }, [])

  const locationColumns = [
    {name:'Location', header:'Location', type: 'string', defaultFlex: 1},
    {name:'BatchID', header:'Batch', type: 'string', defaultFlex: 1},
    {name:'Expiry', header:'Expiry', type: 'string', defaultFlex: 1},
    {name:'Qty', header:'Quantity', type: 'number', defaultFlex: 1, textAlign: 'end'}
  ]

  //Store reference to grid for exporting PDF/CSV
  const [gridRef_stock, setGridRef_stock] = useState(null);
  const [gridRef_locations, setGridRef_locations] = useState(null);

  //Allows button to be pressed when some tasks are selected
  let buttonIsDisabled = true;
  if(selected===null) {
    //console.log(selected);
    buttonIsDisabled = true;
  } else {
    buttonIsDisabled = false;
  }
  //----------//
  
  return(
    <>
      <div className="stock-container">
        <div className="filter">
          <Form.Label className="search-label">Search: &nbsp;</Form.Label>
          <div className="text-input">
            
            <Form.Control 
              size="sm" 
              type="text" 
              placeholder="Search..." 
              value={searchString}
              onChange={e=> setSearchString(e.target.value)}
            />
          </div>
            <div className="stock_exports">
                {/* Export to Excel (Stock Grid) */}
          <OverlayTrigger key='CSVEXPORT' placement='bottom'
                  overlay={
                    <Tooltip id='tooltip-excel'>
                      Export to Excel
                    </Tooltip>
                  }
                >
            <Button variant="secondary"  style={{margin:'5px', marginTop:'0px', border: '1px solid black'}}
            	onClick={ () => {
                const gridData = gridRef_stock;
                exportCSV_stock(gridData);
              }}

            >
            <RiFileExcel2Line />
            </Button>
          </OverlayTrigger>
          {/* Export to PDF (Stock Grid) */}
          <OverlayTrigger key='PDFEXPORT' placement='bottom'
            overlay={
              <Tooltip id='tooltip-pdf'>
                Export to PDF
              </Tooltip>
            } 
          >
               <Button variant="secondary" style={{margin:'5px', marginTop:'0px', border: '1px solid black'}}
            	onClick={ () => {
                const gridData = gridRef_stock;
                exportPDF_stock(gridData);
              }}
            
            >
              <ImFilePdf />
            </Button>    
          </OverlayTrigger>
            </div>
          
            
          <div className="locations_exports">
            {/* Export to Excel (Locations Grid) */}
            <OverlayTrigger key='CSVEXPORT' placement='bottom'
                  overlay={
                    <Tooltip id='tooltip-excel'>
                      Export to Excel
                    </Tooltip>
                  }
                >
            <Button variant="light"  style={{margin:'5px', marginTop:'0px', border: '1px solid black'}}
            	onClick={ () => {
                const gridData = gridRef_locations;
                exportCSV_locations(gridData, selected);
                
              }}
              disabled={buttonIsDisabled}
            >
            <RiFileExcel2Line />
            </Button>
          </OverlayTrigger>
          {/* Export to PDF (Locations Grid) */}
          <OverlayTrigger key='PDFEXPORT' placement='bottom'
            overlay={
              <Tooltip id='tooltip-pdf'>
                Export to PDF
              </Tooltip>
            } 
          >
               <Button variant="light" style={{margin:'5px', marginTop:'0px', border: '1px solid black'}}
            	onClick={ () => {
                const gridData = gridRef_locations;
                exportPDF_locations(gridData, selected);
              }}
              disabled={buttonIsDisabled}
            >
              <ImFilePdf />
            </Button>    
          </OverlayTrigger>
          </div>
          
          
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
            handle={setGridRef_stock}
            	/>
          </div>
          <div className="location-grid">
            <ReactDataGrid
              idProperty="Location"
              columns={locationColumns}
              dataSource={locationData}
              style={gridStyle}
              handle={setGridRef_locations}
            />
          </div>
        </div>
      </div>
      
    </>       
    
  )
}



export default Stock;  