console.log("Hello from search");

var index = elasticlunr(function () {
    this.addField('id')
    this.addField('body')
});

//解析单条的广播
var item_parser  = function(item){
	var doc 		= {};
	//解析出广播的id部分并赋予doc
	var id			= item[0].getAttribute("data-sid");
		doc.id      = id;
	//解析出文字部分并赋予doc
	var saying 		= item.find(".status-saying");
	var text   		= undefined;
	if(saying[0]){
		var innerText = saying.find("p");
		if (innerText[0]) {
			text = innerText[0].innerText;
		}else{
			text = "";
		}
	}else{
		text = "";
	}
		doc.body   	= text;
	return doc;
};//END of item_parser

$.get("https://www.douban.com/people/104099602/statuses?p=1", function(result){
    //console.log(result);
    //获取每一条广播流
    var items = $(result).find(".status-item");
    //遍历每一条广播
    items.each(function(){
    	var item = $(this);
    	var doc  = item_parser(item);
    	if (doc.body!="") {
    		index.addDoc(doc);
    		console.log(doc);
    	}
    });
    //END of 遍历每一条广播 
    var result = index.search("redis");
	console.log(result);   
});



