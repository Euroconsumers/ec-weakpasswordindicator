const path = require('path')

// Main project directory
const 
    rootDir = path.resolve(__dirname, '..'),
    srcDir = path.join(rootDir, 'src'),
    dstDir = path.join(rootDir, '_dist')
    localDir = path.join(rootDir, '_site')

// Structure ready to scale it to bigger files structure, i.e. styles/ js/ directories.
module.exports = {
    pkgname: 'ec-passwordvalidator',
    paths: {
        srcDir,
        dstDir,
        localDir,
        js: {
            entry: path.join(srcDir, 'ec-passwordvalidator.js'),
            src: path.join(srcDir, '*.js'),
            dst: dstDir,
            local: localDir
        },
        styles: {
            entry: path.join(srcDir, '*.scss'),
            src: path.join(srcDir, '*.scss'),
            dst: dstDir,
            local: localDir
        },
        html: {
            src: path.join(srcDir, '*.html'),
            dst: dstDir,
            local: localDir
        },
        vendor: {
            src: path.join(rootDir, 'vendor', '**', '*.js'),
            dst: path.join(localDir, 'vendor')
        },
        examples: {
            src: path.join(rootDir, 'examples', '**', '*.*'),
            dst: path.join(localDir, 'examples')
        },
        libs: {
            src: path.join(rootDir, 'libs', '**', '*.js'),
            dst: path.join(dstDir, 'libs'),
            local: path.join(localDir, 'libs')
        }
    }
}