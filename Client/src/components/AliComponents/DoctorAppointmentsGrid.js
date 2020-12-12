import React, { useState } from "react";
import "./grid.scss";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Button } from "reactstrap";
// import jsonData from '../../Backend/orders.json';

const DoctorAppointmentsGrid = (props) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState(props.rowData);
  console.log("rowData", rowData);

  const data = [
    {
      patientName: props.patientName,
    },
    console.log("PatientName", props.rowData[0].patientName),
  ];
  const columnDfs = [{ headerName: "Patient Name", field: "patientName" }];
  console.log("columnDfs:", columnDfs);
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
  const DoctorName = "";
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
          }}
          suppressRowClickSelection={true}
          groupSelectsChildren={true}
          debug={true}
          rowSelection={"multiple"}
          rowGroupPanelShow={"always"}
          pivotPanelShow={"always"}
          enableRangeSelection={true}
          paginationAutoPageSize={true}
          pagination={true}
          //onGridReady={onGridReady}//
          rowData={data}
          columnDefs={columnDfs}
        >
          {/* <AgGridColumn field="patientName"></AgGridColumn>
          <AgGridColumn field="appointmentDate"></AgGridColumn>
          <AgGridColumn field="appointmentTime"></AgGridColumn>
          <AgGridColumn field="patientCellNumber"></AgGridColumn> */}
          {/* <AgGridColumn
            headerName="Action"
            cellRendererFramework={
              <div>
                {" "}
                <Button>Add </Button>
              </div>
            }
          ></AgGridColumn> */}
        </AgGridReact>
      </div>
    </div>
  );
};

var checkboxSelection = function (params) {
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (params) {
  return params.columnApi.getRowGroupColumns().length === 0;
};

export default DoctorAppointmentsGrid;
