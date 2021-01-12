import React, { useState } from "react";
import "./grid.scss";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Button } from "reactstrap";
import AddPrescriptionBtn from "./AddPrescriptionBtn";
import AddDiagnosisBtn from "./AddDiagnosisBtn";
// import jsonData from '../../Backend/orders.json';

const CompletedDoctorAppointmentGrid = (props) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState(props.rowData);
  console.log("rowData", rowData);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const httpRequest = new XMLHttpRequest();

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
          rowData={rowData}
        >
          <AgGridColumn field="patientName"></AgGridColumn>
          <AgGridColumn field="appointmentDate"></AgGridColumn>
          <AgGridColumn field="appointmentTime"></AgGridColumn>
          <AgGridColumn field="patientCellNumber"></AgGridColumn>
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

export default CompletedDoctorAppointmentGrid;
