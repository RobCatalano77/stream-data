import React from "react";

function SubRowAsync({ row, rowProps, visibleColumns }) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const timer = setTimeout(() => {
        setData([]); //TODO FIX HERE
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
        data={data}
        loading={loading}
        />
    );
}

export default SubRowAsync;
