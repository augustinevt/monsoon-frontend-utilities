const fs = require('fs');
const uid = require('uid');
const userDataText = fs.readFileSync('../input/input.txt', "utf8");

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

const getInsertStatement = (sellerName, txnId, inviteToken) => {
  return `INSERT INTO oauth_users (seller_name, txn_id, invite_token) VALUES ('${sellerName}', ${txnId}, '${inviteToken}');\n`
}
const getManifestRow = (sellerName, txnId, inviteToken) => {
  return `|${sellerName} | ${txnId} | https:analytics.monsoontools.com/login/${inviteToken} |\n`
}

const createFileData = (data) => {
  let sqlData = '';
  let manifestData = '|Seller Name|TXN ID|Login URL|\n|----|----|----|\n';
  let updatedInput = data[0].join('\t') + '\n';

  const headerRow = data[0];
  const txnIdPosition = headerRow.indexOf('TXN Id');
  const companyNamePosition = headerRow.indexOf('Company Name');
  const inviteURLPosition = headerRow.indexOf('Invite URL');

  data.forEach((row, i) => {
    if (i !== 0 && row.length > 1) {
      const inviteToken = uid(12);
      const companyName = row[companyNamePosition]
      const safeCompanyName = companyName.replace(/'/g, '\'\'');
      const safeTxnId = parseInt(row[txnIdPosition])

      row[inviteURLPosition] = `https:analytics.monsoontools.com/login/${inviteToken}`;
      updatedInput += row.join('\t') + '\n';
      sqlData += getInsertStatement(safeCompanyName, safeTxnId, inviteToken);
      manifestData += getManifestRow(companyName, safeTxnId, inviteToken);
    }
  })

  return {sqlData, manifestData, updatedInput};
}

const {sqlData, manifestData, updatedInput} = createFileData(data);

fs.writeFileSync('../output/sqlOutput.txt', sqlData);
fs.writeFileSync('../output/manifestOutput.md', manifestData);
fs.writeFileSync('../output/updatedInput.txt', updatedInput);

// module.exports = makeSQL;
