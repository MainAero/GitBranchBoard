var express = require('express');
var router = express.Router();
var jenkinsJobsDirFirstPart = '/home/jenkins/';
var jenkinsCurrentBranchFilename = '/currentBranch';
var jenkinsJobsDirGlobPattern = jenkinsJobsDirFirstPart + '**' + jenkinsCurrentBranchFilename;
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    // Have to be require on request, otherwise will return result of previous request
    var glob = require('glob-fs')({gitignore: true});
    var files = glob.readdirSync(jenkinsJobsDirGlobPattern);
    var filesForView = [];
    var fileContent;
    var server;
    files.forEach(function (file) {
        fileContent = fs.readFileSync(file, 'utf8');
        server = file.replace(jenkinsJobsDirFirstPart, '');
        server = server.replace(jenkinsCurrentBranchFilename, '');
        filesForView.push(
            {
                server: server,
                branch: fileContent
            }
        );
    });
    res.render('index', {title: 'GitBranchBoard', serverBranchList: filesForView});
});

module.exports = router;
