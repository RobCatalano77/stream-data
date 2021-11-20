import { useTable } from 'react-table'
import { useEffect, useState } from 'react';
import React from 'react';
import { decodeArrayStream } from '@msgpack/msgpack';
import { asyncIterableFromStream } from '@msgpack/msgpack/dist/utils/stream';
import axios from 'axios';
 
 function App() {

  const [loadedData, setLoadedData] = useState(null);

   const data = React.useMemo(
     () => [
       {
         col1: 'Hello',
         col2: 'World',
       },
       {
         col1: 'react-table',
         col2: 'rocks',
       },
       {
         col1: 'whatever',
         col2: 'you want',
       },
     ],
     []
   );
 
   const columns = React.useMemo(
     () => [
       {
         Header: 'Column 1',
         accessor: 'col1', // accessor is the "key" in the data
       },
       {
         Header: 'Column 2',
         accessor: 'col2',
       },
     ],
     []
   );
 
   // I would think that I would need to set data to 
   // the loadedData state variable, but it breaks
   // if I do that.
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data });

   async function fetchDataJSON() {
    const res = await fetch('http://localhost:4567/hello2');
    console.log(res.headers.get("Content-Length"))
    const streamReader = res.body;
    const resLength = 0;
    //streamReader.forEach(i => {resLength++});
    //console.log(resLength);
    return streamReader;
  }

  async function iterThroughResponse(reader) {
    const streamIterator = asyncIterableFromStream(reader);
    for await(const event of decodeArrayStream(streamIterator)) {
      // Here we have decoded event that we can start processing, inserting into Redux and updating UI.  
      console.log(String.fromCharCode(event));
    }
  }

  useEffect(() => {
    fetchDataJSON().then(reader => {return iterThroughResponse(reader)});
  }, []);

  

   /*fetch("http://localhost:4567/hello3")
   .then(res => {
     console.log(res);
      const streamReader = res.body.getReader();
      const streamIterator = asyncIterableFromStream(streamReader);
      //console.log(streamIterator);
      (async function() {
        for await(const event of decodeArrayStream(streamIterator)) {
          // Here we have decoded event that we can start processing, inserting into Redux and updating UI.  
          console.log(event);
        }
      })();
      
   })
   */

/*
   (async function() {
    const response = await fetch("https://appspector.com/huge_session.msgpack");
  const streamReader = response.body.getReader();

  const streamIterator = asyncIterableFromStream(streamReader);

  
  })();
  */


/*
   async function* makeTextFileLineIterator(fileURL) {
    const utf8Decoder = new TextDecoder("utf-8");
    let response = await fetch(fileURL);
    let reader = response.body.getReader();
    let {value: chunk, done: readerDone} = await reader.read();
    chunk = chunk ? utf8Decoder.decode(chunk, {stream: true}) : "";
  
    let re = /\r\n|\n|\r/gm;
    let startIndex = 0;
  
    for (;;) {
      let result = re.exec(chunk);
      if (!result) {
        if (readerDone) {
          break;
        }
        let remainder = chunk.substr(startIndex);
        ({value: chunk, done: readerDone} = await reader.read());
        chunk = remainder + (chunk ? utf8Decoder.decode(chunk, {stream: true}) : "");
        startIndex = re.lastIndex = 0;
        continue;
      }
      yield chunk.substring(startIndex, result.index);
      startIndex = re.lastIndex;
    }
    if (startIndex < chunk.length) {
      // last line didn't end in a newline char
      yield chunk.substr(startIndex);
    }
  }

  
  (async function() {
    let count = 1;
    for await (let info of makeTextFileLineIterator("http://localhost:4567/hello2")) {
      data.push({col1: count.toString(), col2: info});
      console.log(data);
      setLoadedData(data);
      count++;
    }
  })();
  */
  
   return (
     <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
   )
 }

 export default App;