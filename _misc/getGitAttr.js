//Get git repo attr of project.
let fs = require('fs')
let path = require('path')
let child_process = require('child_process')

let content = fs.readFileSync(__dirname + '/whiteboard.code-workspace', {
  encoding: 'utf-8'
});
let folders = JSON.parse(content).folders.map(i=>i.path);

// clean log file
if(fs.existsSync(__dirname + '/repos.log')) {
  fs.writeFileSync(__dirname + '/repos.log','');
}

folders.forEach(folder => {
  child_process.exec('cd ' + folder + ' && git remote -v', (err, stdout, stderr) => {
    let matches =  stdout.match(/origin\s*(.*)\(fetch\)/i);
    if(matches && matches.length) {
      fs.appendFileSync(__dirname + '/repos.log', matches[1] + '\n');
    }
  });
});

console.log('-----The End-----');
