const fs = require('fs');
const LBRegex = /\r\n|\r|\n/;
module.exports = async function(){
	let FileContents = '';
	const argv = require('yargs')
	.usage('Usage:\n  cat [OPTION]... [FILE]...')
	.option('show-ends', {
		alias:'E',
		type:'boolean',
		description: 'display $ at end of each line'
	})
	.option('number', {
		alias:'n',
		type:'boolean',
		description: 'number all output lines'
	})
	.option('show-tabs', {
		alias:'t',
		type:'boolean',
		description: 'display TAB characters as ^I'
	})
	.help('h','display this help and exit').alias('h','help')
	.argv;
	let Files = argv['_'];
	for(let fileIndex in Files){
		let File = Files[fileIndex];
		if(await fs.existsSync(File)){
			FileContents+= await fs.readFileSync(File).toString();
		}
	}
	// TODO : Clean this
	// Make ammendments
	if(argv["show-ends"]){
		let str = FileContents.split(LBRegex);
		let l = str.length;
		while(l--){
			str[l] = str[l]+'$';
		}
		FileContents = str.join('\n');
	}
	if(argv["number"]){
		let str = FileContents.split(LBRegex);
		let l = str.length;
		while(l--){
			str[l] = l + ' ' + str[l];
		}
		FileContents = str.join('\n');
	}
	if(argv["show-tabs"]){
		let str = FileContents.split(LBRegex);
		let l = str.length;
		while(l--){
			str[l] = str[l].replace(/\t/g,'^I');
		}
		FileContents = str.join('\n');
	}
	console.log(FileContents);
}