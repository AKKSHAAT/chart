const { createMarkdownArrayTable } = await import("parse-markdown-table");

function extractMarkdownTables(markdownContent) {
  const tables = [];
  let inTable = false;
  let currentTable = [];

  // Split the content into lines
  const lines = markdownContent.split("\n");

  lines.forEach((line) => {
    // Detect table start (table header line or divider line "---")
    if (line.trim().startsWith("|") || line.trim().startsWith("| ---")) {
      inTable = true;
      currentTable.push(line);
    } else {
      // End of a table if no longer a table line
      if (inTable) {
        tables.push(currentTable.join("\n"));
        currentTable = [];
        inTable = false;
      }
    }
  });

  return tables;
}


const getData = async () => {
  const response = await fetch("../data.md");
  const md = await response.text();
  const tableArr = extractMarkdownTables(md);

  const table = await createMarkdownArrayTable(tableArr[0]);
//   const rows = table.rows.slice(1);

  let data = [];
  console.info("headers", table.headers[1]);
  let skipFirst = true;
  for await (const row of table.rows) {
    if (skipFirst) {
        skipFirst = false; // Skip the first element
        continue;
      }
      let obj = {
        [table.headers[0]]: row[0],  // Directly use the value, no need for wrapping in array
        [table.headers[1]]: row[1]
      };      
    data.push(obj);
  }

  return data
};
console.log(getData())
export default getData;
