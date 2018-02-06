const fs = require('fs');
const uid = require('uid');
const userDataText = fs.readFileSync('./test_user_data.txt', "utf8");

// console.log(userDataText.split('\n'))

const parseFile = (utf8Data) => {
  const exportArray = [];
  utf8Data.split('\n').forEach((value, i) => {
    exportArray.push(value.split('\t'));
  })

// console.log(exportArray);
  return exportArray;
}

const data = parseFile(userDataText);

const makeSQL = (data) => {
  let sqlString = '';
  data.forEach((row, i) => {
    if (i !== 0 && row.length > 1) {
      sqlString += `INSERT INTO oauth_users (seller_name, txn_id, invite_token) VALUES ('${row[0]}', ${row[1]}, ${uid(12)});\n`
    }
  })

  return sqlString;
}

const sql = makeSQL(data);

console.log(sql);

fs.writeFileSync('./output.txt', sql);

// module.exports = makeSQL;
