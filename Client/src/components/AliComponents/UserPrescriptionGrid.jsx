import React, { useState, useEffect } from "react";
import "./grid.scss";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import jsonData from '../../Backend/orders.json';
import DeletePrescriptionBtn from "./DeletePrescriptionBtn";
const UserPrescriptionGrid = (props) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState();

  useEffect(() => {
    setRowData(props.rowData);
  });

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
          rowData={rowData}
        >
          <AgGridColumn field="doctorName"></AgGridColumn>
          <AgGridColumn field="medName"></AgGridColumn>
          <AgGridColumn field="medDosage"></AgGridColumn>
          <AgGridColumn field="medDescription"></AgGridColumn>
          <AgGridColumn
            headerName="Delete"
            field="addPrescription"
            minWidth={170}
            cellRendererFramework={DeletePrescriptionBtn}
          />
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

export default UserPrescriptionGrid;
