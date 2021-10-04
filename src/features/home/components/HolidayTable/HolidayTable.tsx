import React from 'react';
import { DataGrid, GridCallbackDetails, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { IEvent } from 'features/home/types/homeTypes';

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    minWidth: 350,
  },
  {
    field: 'date',
    headerName: 'Date',
    minWidth: 150,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    minWidth: 150,
  },
  {
    field: 'bunting',
    headerName: 'Bunting',
    minWidth: 150,
  },
];

export default function HolidayTable({
  rows,
  onSelectionModelChange,
}: {
  rows: IEvent[];
  onSelectionModelChange: (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails,
  ) => void;
}) {
  return (
    <div style={{ height: 550, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        onSelectionModelChange={onSelectionModelChange}
      />
    </div>
  );
}
