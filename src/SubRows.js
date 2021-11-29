function SubRows({ row, rowProps, visibleColumns, data, loading }) {
    if (loading) {
      return (
        <tr>
          <td/>
          <td colSpan={visibleColumns.length - 1}>
            Loading...
          </td>
        </tr>
      );
    }

    return (
        <>
          {data.map((x, i) => {
            return (
              <tr
                {...rowProps}
                key={`${rowProps.key}-expanded-${i}`}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                    >
                      {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                        value:
                          cell.column.accessor &&
                          cell.column.accessor(x, i),
                        row: { ...row, original: x }
                      })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </>
      );
}

export default SubRows;