/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ (() => {

eval("let transactions = [];\r\nlet myChart;\r\n\r\nfetch(\"/api/transaction\")\r\n  .then(response => {\r\n    return response.json();\r\n  })\r\n  .then(data => {\r\n    // save db data on global variable\r\n    transactions = data;\r\n\r\n    populateTotal();\r\n    populateTable();\r\n    populateChart();\r\n  });\r\n\r\nfunction populateTotal() {\r\n  // reduce transaction amounts to a single total value\r\n  let total = transactions.reduce((total, t) => {\r\n    return total + parseInt(t.value);\r\n  }, 0);\r\n\r\n  let totalEl = document.querySelector(\"#total\");\r\n  totalEl.textContent = total;\r\n}\r\n\r\nfunction populateTable() {\r\n  let tbody = document.querySelector(\"#tbody\");\r\n  tbody.innerHTML = \"\";\r\n\r\n  transactions.forEach(transaction => {\r\n    // create and populate a table row\r\n    let tr = document.createElement(\"tr\");\r\n    tr.innerHTML = `\r\n      <td>${transaction.name}</td>\r\n      <td>${transaction.value}</td>\r\n    `;\r\n\r\n    tbody.appendChild(tr);\r\n  });\r\n}\r\n\r\nfunction populateChart() {\r\n  // copy array and reverse it\r\n  let reversed = transactions.slice().reverse();\r\n  let sum = 0;\r\n\r\n  // create date labels for chart\r\n  let labels = reversed.map(t => {\r\n    let date = new Date(t.date);\r\n    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;\r\n  });\r\n\r\n  // create incremental values for chart\r\n  let data = reversed.map(t => {\r\n    sum += parseInt(t.value);\r\n    return sum;\r\n  });\r\n\r\n  // remove old chart if it exists\r\n  if (myChart) {\r\n    myChart.destroy();\r\n  }\r\n\r\n  let ctx = document.getElementById(\"myChart\").getContext(\"2d\");\r\n\r\n  myChart = new Chart(ctx, {\r\n    type: 'line',\r\n      data: {\r\n        labels,\r\n        datasets: [{\r\n            label: \"Total Over Time\",\r\n            fill: true,\r\n            backgroundColor: \"#6666ff\",\r\n            data\r\n        }]\r\n    }\r\n  });\r\n}\r\n\r\nfunction sendTransaction(isAdding) {\r\n  let nameEl = document.querySelector(\"#t-name\");\r\n  let amountEl = document.querySelector(\"#t-amount\");\r\n  let errorEl = document.querySelector(\".form .error\");\r\n\r\n  // validate form\r\n  if (nameEl.value === \"\" || amountEl.value === \"\") {\r\n    errorEl.textContent = \"Missing Information\";\r\n    return;\r\n  }\r\n  else {\r\n    errorEl.textContent = \"\";\r\n  }\r\n\r\n  // create record\r\n  let transaction = {\r\n    name: nameEl.value,\r\n    value: amountEl.value,\r\n    date: new Date().toISOString()\r\n  };\r\n\r\n  // if subtracting funds, convert amount to negative number\r\n  if (!isAdding) {\r\n    transaction.value *= -1;\r\n  }\r\n\r\n  // add to beginning of current array of data\r\n  transactions.unshift(transaction);\r\n\r\n  // re-run logic to populate ui with new record\r\n  populateChart();\r\n  populateTable();\r\n  populateTotal();\r\n  \r\n  // also send to server\r\n  fetch(\"/api/transaction\", {\r\n    method: \"POST\",\r\n    body: JSON.stringify(transaction),\r\n    headers: {\r\n      Accept: \"application/json, text/plain, */*\",\r\n      \"Content-Type\": \"application/json\"\r\n    }\r\n  })\r\n  .then(response => {    \r\n    return response.json();\r\n  })\r\n  .then(data => {\r\n    if (data.errors) {\r\n      errorEl.textContent = \"Missing Information\";\r\n    }\r\n    else {\r\n      // clear form\r\n      nameEl.value = \"\";\r\n      amountEl.value = \"\";\r\n    }\r\n  })\r\n  .catch(err => {\r\n    // fetch failed, so save in indexed db\r\n    saveRecord(transaction);\r\n\r\n    // clear form\r\n    nameEl.value = \"\";\r\n    amountEl.value = \"\";\r\n  });\r\n}\r\n\r\ndocument.querySelector(\"#add-btn\").onclick = function() {\r\n  sendTransaction(true);\r\n};\r\n\r\ndocument.querySelector(\"#sub-btn\").onclick = function() {\r\n  sendTransaction(false);\r\n};\r\n\n\n//# sourceURL=webpack://budget-app/./public/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/index.js"]();
/******/ 	
/******/ })()
;