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
                <div>
                  {header.column.columnDef.header}
                  {
                    header.column.getCanSort() && 
                    <div onClick={ header.column.getToggleSortingHandler()}>
                      <svg class="sort-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path class="arrow-up" d="M12 4l-6 6h12z" />
                        <path class="arrow-down" d="M12 20l6-6H6z" />
                      </svg>
                    </div>
                  }
              </div>
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