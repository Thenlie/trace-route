const { runPy } = require('./utils/runPy');
const { getScript, getHTML } = require('./utils/page-template');
const { writeHTML, writeJS } = require('./utils/generate-site');
const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([{
        type: 'input',
        name: 'url',
        message: 'Please enter the website you would like to Trace Route. (Required)',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter your name!')
                return false;
            }
        } 
    }])
    .then(input => {
        return(input);
    });
};

promptUser()
    .then(input => {
        return runPy(input.url);
    })
    .then(res => {
        return getScript(res.message);
    })
    .then(script => {
        return writeJS(script);
    })
    .then(writeJSRes => {
        console.log(writeJSRes)
        return getHTML();
    })
    .then(HTML => {
        return writeHTML(HTML);
    })
    .then(writeHTMLRes => {
        console.log(writeHTMLRes)
    })