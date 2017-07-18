var dataObj = {};
//dataObj.dataArr = [];
function saveWord() {
    //get word from text insertion box
    console.log(dataObj);
    var word = document.getElementById("word").value.toLowerCase();
    var ele = document.getElementById('content'); 
    ele.innerHTML = ele.innerHTML + '<div>'+word+'<span id="'+dataObj.dataArr.length+'" class="close">x</span><br/></div>';
    dataObj.dataArr.push(word);
	//put word in chrome storage
	chrome.storage.local.set({
		'word': dataObj
	});
}

function viewData(){
    var ele = document.getElementById('content');
    var str = '';
    for(var i=0,len = dataObj.dataArr.length;i<len;i++){
        str+='<div>'+dataObj.dataArr[i]+'<span id="'+i+'" class="close">x</span><br/></div>';
    }
    ele.innerHTML=str;
    console.log("input[value='"+dataObj.disableApp+"']");
    console.log(document.querySelector("input[value='"+dataObj.disableApp+"']"));
    document.querySelector("input[value='"+dataObj.disableApp+"']").checked = true;
    document.querySelector("input[value='"+dataObj.showWord+"']").checked = true;
}


function deleteEle(){
    // return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}

window.onload = function(){
    chrome.storage.local.get("word",function(result){
        if(Object.keys(result).length){
            dataObj = result.word;
            viewData(result.word);
        }else{
            dataObj.dataArr = [];
            document.querySelector("input[value='true']").checked = true;
            document.querySelector("input[value='yes']").checked = true;
            dataObj.disableApp = "true";
            dataObj.showWord = "yes";
            chrome.storage.local.set({'word':dataObj})
        }
    });
    document.getElementById('submit').onclick = function(){saveWord(dataObj)};
    document.querySelector('body').addEventListener('click', function(event) {
      if (event.target.tagName.toLowerCase() === 'span') {
            var id = event.target.id;
            dataObj.dataArr.splice(parseInt(id),1);
            chrome.storage.local.set({
                'word': dataObj
            });
            viewData(dataObj);
      } else if(event.target.tagName.toLowerCase() === 'input') {
            if(event.target.id!="word"){
                var name = event.target.name;
                var val = event.target.value;
                if(name=="disableApp"){
                    dataObj.disableApp = val;
                }else if(name == "showWord"){
                    dataObj.showWord = val;
                }
                chrome.storage.local.set({
                    'word': dataObj
                });
            }
      }
    });

}


/*chrome.runtime.onMessage.addListener(function(req,sender,sendResponse){
    if(req.msg=='sendText'){
        console.log(dataArr);
        sendResponse({data:dataArr});
    }
})*/