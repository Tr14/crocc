const { google } = require('googleapis');

const express = require('express')
const app = express()
const port = 1337

var cors = require('cors');

app.use(express.json())

app.use(express.static(__dirname + '/public'));

app.use(cors())

const path = require('path');

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email:
      "teambuilding2024@clever-tap-5e29f.iam.gserviceaccount.com", //Placeholder client_email value
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDW+j0me16NyI1e\n+ZA0qRK7XLvLcN6bXyDIHREg23Ry/akylqU5q/8Mk7XbVlyAS9gLohrEraEzIsu0\ntx2V4+IYHvBSJ5uCiwLuNGZVSCNhDfTZxAHXM0igpeoRU+MnS6Xamv2799CJzX7B\nALsAnZ3Hvgqe+8wkGp+yu4yrVaP+QcGC+c7YGwIfQVB0E7x+69XHP3oe48iM7ej6\nayZugHCWepjTkwjsyvUSPCS7zBtrwKry0Ln6dNW9yeMejzhQbYxBgxSdS9+l3YRM\n3cCl07UrzUXdKmx787O7AC7crrvnwLnAZZbT2y8nS/odfTcsZvYf1/wF/taz91Uq\nYYC91tshAgMBAAECggEAHXucP1bUFOXYXZokaNR3OTLynmgQX4agXFGAM91lDxAy\n0DlQ16P7CqKHYllpvj6olo/Y0/hsDzNKdLJYYGIsc9pqYxoDfdfKwxh0oGWQVJMx\nbVwwVG84GrAmddHnaVA6osx21/yYoQ2JwLZ07xSuuuIZWsx1ps3v8Pc/x4+rOgdS\nRcHn0OExLGd8h0A/EYtjqpHYPVF7oxOFoBJ9RsjhVa6yDGoIEEqYaLN91m0S1Dx+\nn/ZNZj1YYHilxzfReYMD5c0NLQxOvs0+y4byUIRyVULRlMzh7VtBu5lA7BzpAw6A\ntCSWWiKaspUBJQYThSeTQZz92VfkZyE59zjUmVU7QQKBgQDrdak/WoJ/iYywFf/l\nXH84bnD+oqZpGgAleEC7gK1bQwJ4o6gEw7xhaVzZEwTp3LGEvT4UPR6fGP0hdvc8\nuGqOPZp0oid2LohAAJctKmou+bMHwfaTwI5714PAPPuYZBANSEguu7/kLT1dPHR+\n/Rf1jcPBB3LRNTPbI/Op5HfAJQKBgQDpuyqTvZhznVHvz/ww3CxwD57kx7ne65qw\nYTybp5UaJuv/+G6XZ8GngOLBS0XY/4br+mq7tmw9xQNDxCUCDMaRwkIWv/hw5Z4F\nuoKQiQFPsE3FlFqBSL+XKptn+huUiJpZrk8CRwS2CXIx9InJS9EZJUTkzAbJtb7G\nOzZ5eqTQTQKBgQDhUElxt3GzC3PWOGcUGyweWwjDke8+GcRUFruS8XJyJzBhMvIg\nBRHqAUH480s7YpV4mQKjqUz5H5dyg33Y2/wTOv3naBfs7mAxJp+Dd9f+NbFM1h3X\ni2aNOVD5DyIO1InLvARevAjHF0dmReiQcC6SKmNM/oyvh4Kky8VqKJczBQKBgQCN\nYCnjzWWeYQVDsiFQCI1Uhw5MQcba4NXjZB195ULZ27saTFHQgPDw+ZOu6XHpTL52\nlDTlL/WO81EDN2xPLh0Z40+IZTvIRgtsWaFJ/aTuZ6zTGuYXl0JUFHCF1xHBqVL7\ndeTSctSVq2cIcmq5eIOU2yct4X8lmSo4y24q0pVIbQKBgQC1tGzJrGpWb2n5QdUL\nxinLVNdVtk91iMZyGzwoGQQuU0n0+hZLa5ZtYX5HEW8tpW6/pgrKDVcDkUDTEM4t\nlq3azTMPOQDglsytyNMyw8juLko31Jkwn5SPqdNIZGpaPvXT0ssmZKc+4AAq/Sqr\nlo95rBV7mQo0t5UluHJp4361tA==\n-----END PRIVATE KEY-----\n", //Placeholder private_key value
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const sheets = google.sheets({ auth, version: "v4" }); // This is from your showing script.

const spreadsheetId = "1GPLirSLi1oH6Zcu2fOjiSHsxNdCrMz_-jPXiSAmQ3gk"; // Please set your Spreadsheet ID.
const range = "user!A2:H"; // Please set your sheet name.

app.post('/checkdevice', async (req, res) => {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "serverlog",
    valueInputOption: "USER_ENTERED",
    requestBody: { majorDimension: "ROWS", values: [[req.body.ip_address, req.body.deviceInfo.type, req.body.deviceInfo.model, req.body.deviceInfo.osVersion, req.body.message_log]] },
  });
})

app.post('/checksheet', async (req, res) => {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });
    const rows = response.data.values;

    for (let i = 0; i < req.body.data.length; i++) {
        let user_id = req.body.data[i].ID
        let scanner_mobile = req.body.data[i].SCANNER_MOBILE

        ////// Same mobile
        // add object name for each data
        const updatedRows_same = rows.map(row => ({
            user_id: row[0],
            owner_mobile: row[1],
            username: row[2],
            role: row[3],
            status: row[4]
        }));

        // filter data
        let filteredArray_same = updatedRows_same.filter(obj => obj.user_id === user_id && obj.owner_mobile === scanner_mobile)
        
        // add object name for each data
        const updatedRows = rows.map(row => ({
            user_id: row[0],
            owner_mobile: row[1],
            username: row[2],
            role: row[3],
            status: row[4],
            scanner_mobile: scanner_mobile
        }));

        // filter data
      let filteredArray_dif = updatedRows.filter(obj => obj.user_id === user_id && obj.owner_mobile != scanner_mobile)
        if (filteredArray_dif.length > 0) {
            if (rows.length) {
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i][1] === scanner_mobile) {
                        let scanner_id = rows[i][0]
                        let scanner_role = rows[i][3]
                        let scanner_status = rows[i][4]
                        filteredArray_dif = filteredArray_dif.map(obj => {
                          return {
                              ...obj,
                              scanner_id,
                              scanner_role,
                              scanner_status
                          };
                        });
                  

                      if (filteredArray_dif[0].status != "Đã dẹo") {
                        if (filteredArray_dif[0].scanner_status != "Đã dẹo")
                          if (filteredArray_dif[0].scanner_role === "Sấu Ham Ăn" || filteredArray_dif[0].scanner_role === "Võ Tòng Lòng Vòng Bắt Sấu") {
                            if (filteredArray_dif[0].role != "Dân Lương Thiện") {
                              if (filteredArray_dif[0].role != filteredArray_dif[0].scanner_role) {
                                const inputValues = [user_id, scanner_mobile];

                                const { data: { values } } = await sheets.spreadsheets.values.get({ spreadsheetId, range });
                                await sheets.spreadsheets.values.update({
                                  spreadsheetId,
                                  range,
                                  resource: { values: values.map((r) => inputValues.includes(r[0]) ? [r[0], r[1], r[2], r[3], r[4], scanner_mobile] : r) },
                                  valueInputOption: "USER_ENTERED",
                                });
                              }
                            }
                          }
                        }

                        res.status(201).json({
                            message: 'OK',
                            list: "filteredArray_dif",
                            received: filteredArray_dif
                        });
                      }
                }
            }
        } else {
            res.status(201).json({
                message: 'OK',
                list: "filteredArray_same",
                received: filteredArray_same
            });
        }
    }
})

app.post('/updatestatus', async (req, res) => { 
  for (let i = 0; i < req.body.data.length; i++) {
    let user_id = req.body.data[i].ID
    let user_status = req.body.data[i].STATUS
    let scanner_mobile = req.body.data[i].SCANNER_MOBILE
    let coop_mobile = req.body.data[i].COOP_MOBILE
    let user_desc = req.body.data[i].DESC

    const inputValues = [user_id, user_status, user_desc];

    const { data: { values } } = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      resource: { values: values.map((r) => inputValues.includes(r[0]) ? [r[0], r[1], r[2], r[3], user_status, scanner_mobile, coop_mobile, user_desc] : r) },
      valueInputOption: "USER_ENTERED",
    });
  }
  res.status(201).json({
    message: 'OK',
    received: []
  });
})

app.get('/getuser', async (req, res) => {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });
    const rows = response.data.values;

    const updatedRows = rows.map(row => ({
      user_id: row[0],
      owner_mobile: row[1],
      username: row[2],
      role: row[3],
      status: row[4]
    }));

    res.status(201).json({
        message: 'OK',
        received: updatedRows
    });
})

app.get('/getcrocc', async (req, res) => {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });
    const rows = response.data.values;

    const updatedRows = rows.map(row => ({
        user_id: row[0],
        owner_mobile: row[1],
        username: row[2],
        role: row[3],
        status: row[4]
    }));
  
    let filteredArray = updatedRows.filter(obj => obj.role === "Sấu Ham Ăn")

    res.status(201).json({
        message: 'OK',
        received: filteredArray
    });
})

app.get('/gethunter', async (req, res) => {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });
    const rows = response.data.values;

    const updatedRows = rows.map(row => ({
        user_id: row[0],
        owner_mobile: row[1],
        username: row[2],
        role: row[3],
        status: row[4]
    }));
  
    let filteredArray = updatedRows.filter(obj => obj.role === "Võ Tòng Lòng Vòng Bắt Sấu")

    res.status(201).json({
        message: 'OK',
        received: filteredArray
    });
})

app.post('/send', async (req, res) => {
  console.log(req.body)
  console.log(req.body.events[0].data)
  res.send(req.body)
})

app.post('/webhook_test', async (req, res) => {
  console.log(req)
  res.send("OK")
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/index.html'));
});

app.get('/detail', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/detail.html'));
});

app.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/play.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})