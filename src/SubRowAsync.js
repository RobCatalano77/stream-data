import React from "react";
import SubRows from "./SubRows";

function SubRowAsync({ row, rowProps, visibleColumns }) {

    const [loading, setLoading] = React.useState(true);
    const [subRowData, setSubRowData] = React.useState([]);
    //const subRowDataRef= useRef({});
    //subRowDataRef.current = subRowData;

    React.useEffect(() => {
        const timer = setTimeout(() => {
            console.log(row);
        setSubRowData([{col1: row.original.sub, }]); //TODO FIX HERE
        setLoading(false);
        }, 500);
        return () => {
        clearTimeout(timer);
        };
    }, []);

    return (
        <SubRows
        row={row}
        rowProps={rowProps}
        visibleColumns={visibleColumns}
        data={subRowData}
        loading={loading}
        />
    );
}

export default SubRowAsync;
