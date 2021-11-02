const fs = require('fs');

const writeHTML = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'HTML File Created!'
            });
        });
    });
};

const writeJS = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/script.js', fileContent, err => {
            if (err) {
                reject(err)
                return;
            }
            resolve({
                ok: true,
                message: 'JS File Created!'
            })
        })
    })
}

module.exports = { writeHTML, writeJS };