let {PythonShell} = require('python-shell')

const runPy = URL => {
    return new Promise((resolve, reject) => {
        let options = {
            args: [URL] // <-- the website that trace route is run on
        }
    
        PythonShell.run('./utils/IPextractor.py', options, function(err, res) {
            if (err) {
                reject (err)
                return;
            } else {
                resolve({
                    ok: true,
                    message: res
                })
            }
        });
    })
};

module.exports = { runPy }