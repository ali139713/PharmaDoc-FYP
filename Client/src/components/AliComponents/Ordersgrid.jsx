import React, { useState } from "react";
import "./grid.scss";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import BtnCellRenderer from "./BtnCellRenderer";

// import jsonData from '../../Backend/orders.json';

const Ordersgrid = (props) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  // const [rowData, setRowData] = useState(jsonData.data);
  const [rowData, setRowData] = useState(props.data);

  /*
 
  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }
 
  
    const httpRequest = new XMLHttpRequest();
    
/*
    httpRequest.open(
      'GET',
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
    */

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        id="myGrid"
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          autoGroupColumnDef={{
            headerName: "Group",
            minWidth: 170,
            field: "videocall",
            valueGetter: function (params) {
              if (params.node.group) {
                return params.node.key;
              } else {
                return params.data[params.colDef.field];
              }
            },
            cellRenderer: "btnCellRenderer",
            cellRendererParams: {
              clicked: function (field) {
                alert(`${field} was clicked`);
              },
            },
            minWidth: 150,
          }}
          defaultColDef={{
            editable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 100,
            showRowGroup: true,
          }}
          suppressRowClickSelection={true}
          groupSelectsChildren={true}
          debug={true}
          rowSelection={"multiple"}
          rowGroupPanelShow={"always"}
          pivotPanelShow={"always"}
          enableRangeSelection={true}
          autoGroupColumnDef={true}
          checkboxSelection={true}
          enableRangeSelection={true}
          paginationAutoPageSize={true}
          pagination={true}
          //onGridReady={onGridReady}//
          rowData={rowData}
        >
          <AgGridColumn field="customerName"></AgGridColumn>
          <AgGridColumn field="address"></AgGridColumn>
          <AgGridColumn field="city"></AgGridColumn>
          <AgGridColumn field="ItemsName"></AgGridColumn>
          <AgGridColumn field="publishDate"></AgGridColumn>
          <AgGridColumn field="orderStatus"></AgGridColumn>
          <AgGridColumn field="paymentMethod"></AgGridColumn>
          <AgGridColumn field="totalAmount"></AgGridColumn>
          {/* <AgGridColumn field ="videocall"></AgGridColumn>  */}
          <AgGridColumn
            headerName="VideoCall"
            field="videocall"
            minWidth={170}
            cellRendererFramework={BtnCellRenderer}
          />
        </AgGridReact>
      </div>
    </div>
  );
};
var cellRenderer = function (params) {
  return <button>Click</button>;
};

var checkboxSelection = function (params) {
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (params) {
  return params.columnApi.getRowGroupColumns().length === 0;
};

export default Ordersgrid;
