// this will be a script that will rename the file to the new name
const fs = require('fs');
const path = require('path');


settings = {
  // this function will adding '_<date>' to the file name
  replace_regex: (file) => {
    const { dir, name, ext } = path.parse(file);
    const newFileName = `${name}_${ new Date().toISOString().split('T')[0].replace(/-/g, '')}${ext}`;
    return newFileName;
  },

  // include will be a regex that will determine which files will be renamed; exclude will be a regex that will determine which files will not be renamed
  include: /(.*)\.(.*)/,
  exclude: /rename\.js/,

  // this will determine if the script will rename files in subfolders, and if it will not rename folders
  recursive: false,
  files: true,
  folders: false,
  // this will determine the path where the script will be run
  path: path.resolve(__dirname)
}













const { include, recursive, exclude, replace_regex } = settings;

const rename = (file) => {
  const { dir, name, ext } = path.parse(file);
  const newFileName = replace_regex(file);
  const newPath = path.join(dir, newFileName);
  fs.renameSync(file, newPath);
}

const renameFiles = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath)
    if (stats.isDirectory() && recursive) {
      renameFiles(filePath);
    } else if (stats.isFile() && include.test(file) && !exclude.test(file)) {
      rename(filePath);
    }
  })
}

renameFiles(settings.path);


    
