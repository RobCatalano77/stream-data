import { useTable, useExpanded } from "react-table";
import React from "react";
// A simple way to support a renderRowSubComponent is to make a render prop
// This is NOT part of the React Table API, it's merely a rendering
// option we are creating for ourselves in our table renderer
function TableWithSubs({ columns: userColumns, data, renderRowSubComponent }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      visibleColumns,
      state: { expanded }
    } = useTable(
      {
        columns: userColumns,
        data
      },
      useExpanded // We can useExpanded to track the expanded state
      // for sub components too!
    );
  
    return (
      <>
      <pre>
        <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
      </pre>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              // Use a React.Fragment here so the table markup is still valid
              <React.Fragment {...row.getRowProps()}>
                <tr>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
                {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
    );
  }

export default TableWithSubs;