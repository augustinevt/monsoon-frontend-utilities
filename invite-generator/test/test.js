const generator = require('./node_script');

const data = [['seller_name', 'txn_id'],['bubbies', 1734],['Gretchen', 3212]];

// const expected = "INSERT INTO oauth_users (txn_id, seller_name, invite_token) VALUES (1734, 'Bubbies', '12345')\nINSERT INTO oauth_users (txn_id, seller_name, invite_token) VALUES (3212, 'Gretchen', '12345')\n"

const actual = generator(data);

// if (actual === expected) {
//   console.log("PASSED!")
// } else {
//   console.log("\n\nFAILED!!\n\n")
//   console.log("EXPECTED\n", expected, "\n")
//   console.log("RECEIVED\n", actual, "\n")
// }
