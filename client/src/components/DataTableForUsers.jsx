import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

const DataTableForUsers = ({ columns, Data, title, actions }) => {
  const defaultMaterialTheme = createTheme();
  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        columns={columns}
        data={Data}
        title={title}
        actions={actions}
      />
    </ThemeProvider>
  );
};

export default DataTableForUsers;
