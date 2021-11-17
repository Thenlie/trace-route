const { runPy } = require('./utils/runPy');
const { getScript, getHTML } = require('./utils/page-template');
const { writeHTML, writeJS } = require('./utils/generate-site');
const inquirer = require('inquirer');

let route = [];
let url = ''

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
        url = input.url;
        return(input);
    });
};

promptUser()
    .then(input => {
        return runPy(input.url);
    })
    .then(res => {
        route = res.message;
        return getScript(route);
    })
    .then(script => {
        return writeJS(script);
    })
    .then(writeJSRes => {
        console.log(writeJSRes)
        return getHTML(route, url);
    })
    .then(HTML => {
        return writeHTML(HTML);
    })
    .then(writeHTMLRes => {
        console.log(writeHTMLRes)
    })