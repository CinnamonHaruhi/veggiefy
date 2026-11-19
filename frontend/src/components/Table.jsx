import React from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'


const Table = ({data, columns, globalFilter, setGlobalFilter}) => {
  const table = useReactTable({
    data,
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <div className="main-table-wrap" id="tableWrap">
      <table className="main-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => <tr key={headerGroup.id}>
            {headerGroup.headers.map(
              header => <th key={header.id}>
                {header.column.columnDef.header}
                {
                  header.column.getCanSort() && <p
                    onClick={
                      header.column.getToggleSortingHandler()
                    }
                  >sort</p>
                }
              </th>
            )}
          </tr>)}
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map(row => <tr key={row.id}>
              {row.getVisibleCells().map(cell => <td key={cell.id}>
                {
                  flexRender(
                    cell.column.columnDef.cell, 
                    cell.getContext()
                  )  
                }
              </td>)}
            </tr>)
          }
        </tbody>
      </table>
      <p>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </p>
      <div>
        <button 
          onClick={ 
            ()=> table.previousPage()
          }
          disabled={
            !table.getCanPreviousPage()
          }
          >{"<"}</button>
        <button onClick={
          () => table.nextPage()
          }
          disabled={
            !table.getCanNextPage()
          }
        >{">"}</button>
      </div>
    </div>
  )
}

export default Table