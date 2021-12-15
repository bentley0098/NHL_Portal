import jsPDF from 'jspdf'
import 'jspdf-autotable'
import PDFLogo from './Logos/PDFLogo.png'
import * as XLSX from 'xlsx';

import moment from 'moment'

export const exportCSV_stock = (gridRef) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const ws = XLSX.utils.json_to_sheet(gridRef.current.data);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: fileType});

    downloadBlob(blob);
};


const downloadBlob = (blob, fileName = 'WMS_Products.xlsx') => {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.position = 'absolute';
    link.style.visibility = 'hidden';
  
    document.body.appendChild(link);
  
    link.click();
  
    document.body.removeChild(link);
};


export function  exportPDF_stock(gridData, customer) {
  //console.log(gridData.current.data)
  
  var doc = new jsPDF('landscape', 'pt');
  //var closedIndex = [];
  //var urgentIndex = [];
  //var p1Index = [];
  
  //console.log(gridData.current.data);
  var bodyData = [];
    bodyData= [[
      gridData.current.data[0].Product, 
      gridData.current.data[0].Description,
      gridData.current.data[0].Quantity
    ]];

  var rowData = [];
  for(let i=1; i<gridData.current.data.length; i++){
      rowData = [
        gridData.current.data[i].Product, 
        gridData.current.data[i].Description,
        gridData.current.data[i].Quantity
      ];
    
    bodyData.push(rowData);

  }

  let formatDate = moment(new Date()).format("Do MMMM YYYY"); 
  
  let headerText = " WMS Products    -    " + formatDate;

  let header=[];
  header= ['Product', 'Description', 'Quantity']
  
  
  doc.autoTable({
    styles: { fontSize: 8 },
    theme: 'grid',
    headStyles: {fillColor: [55, 55, 55]},
    head: [header],
    body: bodyData,
    didDrawPage: function (data) {
      // Header
      doc.setFontSize(18)
      doc.setTextColor(40)
      if (PDFLogo) {
        doc.addImage(PDFLogo, 'ico', 20, 20, 46.5, 48, PDFLogo, 'FAST', 0)
      }
      doc.text(headerText, data.settings.margin.left + 50, 50)

      doc.setFontSize(8)

     
    },
    margin: { top: 80 }
  })

  var docName = 'WMS_Products.pdf';

  //let titleDate = moment(new Date()).format("DDMMYYYY"); 

  doc.save(docName)
}


export const exportCSV_locations = (gridRef, product) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const ws = XLSX.utils.json_to_sheet(gridRef.current.data);
  const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {type: fileType});

  downloadBlob_locations(blob, product);
};


const downloadBlob_locations = (blob, product) => {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'WMS_Locations_'+ product +'.xlsx');
  link.style.position = 'absolute';
  link.style.visibility = 'hidden';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};


export function  exportPDF_locations(gridData, product) {
  //console.log(gridData.current.data)

var doc = new jsPDF('landscape', 'pt');

var bodyData = [];
  bodyData= [[
    gridData.current.data[0].Location, 
    gridData.current.data[0].BatchID,
    gridData.current.data[0].Expiry,
    gridData.current.data[0].Qty
  ]];

var rowData = [];
for(let i=1; i<gridData.current.data.length; i++){
    rowData = [
      gridData.current.data[i].Location, 
      gridData.current.data[i].BatchID,
      gridData.current.data[i].Expiry,
      gridData.current.data[i].Qty
    ];
  
  bodyData.push(rowData);

}

let formatDate = moment(new Date()).format("Do MMMM YYYY"); 

let headerText = " WMS Locations - " + product + "    -    " + formatDate;

let header=[];
header= ['Location', 'BatchID', 'Expiry', 'Quantity']


doc.autoTable({
  styles: { fontSize: 8 },
  theme: 'grid',
  headStyles: {fillColor: [55, 55, 55]},
  head: [header],
  body: bodyData,
  didDrawPage: function (data) {
    // Header
    doc.setFontSize(18)
    doc.setTextColor(40)
    if (PDFLogo) {
      doc.addImage(PDFLogo, 'ico', 20, 20, 46.5, 48, PDFLogo, 'FAST', 0)
    }
    doc.text(headerText, data.settings.margin.left + 50, 50)

    doc.setFontSize(8)

   
  },
  margin: { top: 80 }
})

var docName = 'WMS_Locations_' + product +'.pdf';

//let titleDate = moment(new Date()).format("DDMMYYYY"); 

doc.save(docName)
}