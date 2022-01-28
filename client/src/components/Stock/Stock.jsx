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
import { exportCSV_stock, exportPDF_stock, exportCSV_locations, exportPDF_locations, exportCSV_history, exportPDF_history } from '../excelExport.js'
import {RiFileExcel2Line} from 'react-icons/ri'
import {ImFilePdf} from 'react-icons/im'




const LoadLocations = (selected) => {
  return fetch('/returnLocations/' + selected)
    .then(data => data.json())
} 

const LoadStkHistory = (selected) => {
  return fetch('/returnStkMovements/' + selected)
    .then(data => data.json())
} 

// Stock Page function
function Stock() {
  //----- GET CURRENT USER -----//
  //const tokenString = sessionStorage.getItem('token');
  //const userToken = JSON.parse(tokenString);
  //const Username = userToken.username;
  //const UserID = userToken.userId;

  const [dataSource, setDataSource] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [stkHistory, setStkHistory] = useState([]);
  const [searchString, setSearchString] = useState("");
  
  // Sets datasource on lpoad and when searchString changes
  useEffect(() =>{
    setDataSource(LoadDataSource(searchString).data);
  }, [searchString])

  // Styles and setup for grids
  const gridStyle = {
    minHeight: '83vh', 
    margin: 10
  }
  const gridStyle2 = {
    minHeight: '35vh',
    margin: 10
  }
  const columns = [
    {name:'Product', header:'Product', type: 'string', defaultFlex: 0},
    {name:'Description', header:'Description', type: 'string', defaultFlex: 1},
    {name:'Quantity', header:'Total', type: 'number', defaultFlex: 0, textAlign: 'end'}
  ]
  const theme = 'default-dark';
  const locationColumns = [
      {name:'Location', header:'Location', type: 'string', defaultFlex: 1},
      {name:'BatchID', header:'Batch', type: 'string', defaultFlex: 1},
      {name:'Expiry', header:'Expiry', type: 'string', defaultFlex: 1},
      {name:'Qty', header:'Quantity', type: 'number', defaultFlex: 1, textAlign: 'end'}
  ]
  const stkHistoryColumns = [
    {name:'Type', header:'Movement Type', type: 'string', defaultFlex: 1},
    {name:'OrderNum', header:'Order', type: 'string', defaultFlex: 1},
    {name:'Location', header:'Location', type: 'string', defaultFlex: 1},
    {name:'Qty', header:'Quantity', type: 'number', defaultFlex: 1, textAlign: 'end'},
    {name:'Date', header:'Date', type: 'string', defaultFlex: 1}
]

  // For selecting a product on the stock grid
  const [selected, setSelected] = useState(null);
  const onSelectionChange = useCallback(({ selected }) => {
    setSelected(selected);
    setLocationData(LoadLocations(selected));
    setStkHistory(LoadStkHistory(selected));
  }, [])

  

  //Store reference to grids for exporting PDF/CSV
  const [gridRef_stock, setGridRef_stock] = useState(null);
  const [gridRef_locations, setGridRef_locations] = useState(null);
  const [gridRef_history, setGridRef_history] = useState(null);

  //Allows button to be pressed when a product is selected
  let buttonIsDisabled = true;
  if(selected===null) {
    buttonIsDisabled = true;
  } else {
    buttonIsDisabled = false;
  }
  
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
              onChange={e=> {
                setSearchString(e.target.value);
                setLocationData([]);
                setStkHistory([]);
                //setSelected(null);
              }}
            />
          </div>
            <div className="stock_exports">
                {/* Export to Excel (Stock Grid) */}
          <OverlayTrigger key='CSVEXPORT' placement='bottom'
                  overlay={
                    <Tooltip id='tooltip-excel'>
                      Products to Excel
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
                Products to PDF
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
                      Locations to Excel
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
                Locations to PDF
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
          <div className="product-view">
            <div className="location-grid">
              <ReactDataGrid
                idProperty="Location"
                columns={locationColumns}
                dataSource={locationData}
                style={gridStyle2}
                handle={setGridRef_locations}
              />
            </div>
            <div className="history_exports">
            {/* Export to Excel (History Grid) */}
            <OverlayTrigger key='CSVEXPORT_hist' placement='bottom'
                  overlay={
                    <Tooltip id='tooltip-excel-hist'>
                      Movement History to Excel
                    </Tooltip>
                  }
                >
            <Button variant="light" style={{margin:'5px', marginTop:'0px', border: '1px solid black'}}
            	onClick={ () => {
                const gridData = gridRef_history;
                exportCSV_history(gridData, selected);
              }}
              disabled={buttonIsDisabled}
            >
            <RiFileExcel2Line />
            </Button>
          </OverlayTrigger>
          {/* Export to PDF (History Grid) */}
          <OverlayTrigger key='PDFEXPORT_hist' placement='bottom'
            overlay={
              <Tooltip id='tooltip-pdf-hist'>
                Movement History to PDF
              </Tooltip>
            } 
          >
            <Button variant="light" style={{margin:'5px', marginTop:'0px', border: '1px solid black'}}
            	onClick={ () => {
                const gridData = gridRef_history;
                exportPDF_history(gridData, selected);
              }}
              disabled={buttonIsDisabled}
            >
              <ImFilePdf />
            </Button>    
          </OverlayTrigger>
          </div>
            <div className="stkHistory-grid">
              <ReactDataGrid
                idProperty="ID"
                columns={stkHistoryColumns}
                dataSource={stkHistory}
                style={gridStyle2}
                handle={setGridRef_history}
              />
            </div>
          </div>
          
        </div>
      </div>
      
    </>       
    
  )
}

export default Stock;  