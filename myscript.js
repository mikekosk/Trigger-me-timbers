/*function trigger() {
	//pull word from chrome local storage
	chrome.storage.local.get('word', function(data)) {
		//find word within page 
		var word = data.word;
		matches = document.body.innerText.match(word);
		//create a pop-up if word is on the page
		if (matches) {
  			alert("Word is on page"); 
  		};
	});
}

setTimeout(trigger, 0);
*/

var matchedWords = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);    
  if (request.msg === "text" && request.data.disableApp=="true") {
        findText(request.data);
  }
});


function findText(dataObj){
    var docText = document.body.innerText.toLowerCase();
    var dataArr = dataObj.dataArr;
    for(var i=0,len=dataArr.length;i<len;i++){
        var newRegexp = new  RegExp('(^|\\s)'+dataArr[i]+'(\\s|$)','gi');
        //if(docText.match(dataArr[i])){
        if(newRegexp.exec(docText)){
            matchedWords.push(dataArr[i]);
        }
    }
    if(matchedWords.length){
        var child = document.createElement('div');
        child.style.position = "fixed";
        child.style.bottom = "0px";
        child.style.right = "0px";
        child.style.width = "250px";
        child.style.height = "150px";
        child.style.background = "black";
        child.style.color = "white";
        child.style.fontFamily = "monospace";
        child.style.zIndex = "101";
        child.id = "chrome_addon_popup";
        document.body.appendChild(child);
        var str = '<h3 style="float:left;padding: 6px;margin:0px">Words found</h3><span id="close" style="float:right;cursor:pointer;padding: 2px 8px;">X</span>';
        if(dataObj.showWord=="yes"){
        str+='<div style="clear: left;padding: 0px 0px 0px 8px;">'+matchedWords.join('<br/>')+'</div>';
        }
        child.innerHTML = str;
        
        document.getElementById('close').onclick = function(){
            return (elem=document.getElementById('chrome_addon_popup')).parentNode.removeChild(elem);
        }
    }
    
}

window.onload = function(){
    chrome.runtime.sendMessage({msg: "sendText"}, function(response) {});
}
