var fs=require('fs')
var _=require('lodash')
var tabLength=0
var output=[]
var finalString=''
var stack=[]
fs.readFile(process.argv[2], 'utf8',(err, data) => {
  if (err) throw err;
  	var res = data.split("\n");
  	tabLength=0
  	for(var i in res){
  		handleSentence(res[i],i)
  	}
  	fs.writeFile(process.argv[2]+"-beutify.js", finalString, 'utf8',(err) => {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});
  	// console.log('<<<<<<<--output String-->>>>>>>>')
});

function handleSentence(string,i){

		var concatenated=false

		var isHtml=validHTML(string)
		//console.log(isHtml,string)
		//console.log(string,)

		if(isHtml!=0)
		{
			if(isHtml==-1)
			{
				tabLength=tabLength-4	
			}
			output[i]=_.padStart(string,string.length+tabLength,' ')
			finalString+=output[i]+'\n';
			if(isHtml==1)
			{
				tabLength=tabLength+4
			}
		}
		else{
			if(string.indexOf('{')!=-1&&string.indexOf('}')!=-1)
			{
				output[i]=_.padStart(string,string.length+tabLength,' ')
				finalString+=output[i]+'\n';
			}
			else{
				if(string.indexOf('}')!=-1)
				{
					tabLength=tabLength-4
				}
				output[i]=_.padStart(string,string.length+tabLength,' ')
				finalString+=output[i]+'\n';
				if(string.indexOf('{')!=-1)
				{
					tabLength=tabLength+4
				}

			}
			
		}
}

function validHTML(html) {
  var openingTags, closingTags;

  html        = html.replace(/<[^>]*\/\s?>/g, '');      // Remove all self closing tags
  html        = html.replace(/<(br|hr|img).*?>/g, '');  // Remove all <br>, <hr>, and <img> tags
  openingTags = html.match(/<[^\/].*?>/g) || [];        // Get remaining opening tags
  closingTags = html.match(/<\/.+?>/g) || [];           // Get remaining closing tags
  if(openingTags.length === closingTags.length)
  {
  	return 0
  }
  else if(openingTags.length > closingTags.length)
  {
  	return 1
  }
  else{
  	return -1
  }
  //return openingTags.length === closingTags.length ? true : false;
}
