var dataObj = [],
    tabId = null;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.msg == "sendText"){
        tabId = sender.tab.id;
        chrome.storage.local.get("word",function(result){
            dataObj = result.word;
            sendQuery(dataObj);
        })
    }
  });


function sendQuery(dataObj){
    if(tabId!=null){
        chrome.tabs.sendMessage(tabId, {msg:"text",data:dataObj}, function(response) {});
    }
}


/*
function sendQuery(){
    console.log('inside timeout function');
    if(tabId!=null){
        chrome.tabs.sendMessage(tabId, {text:"trigger"}, function(response) {});
    }
}
*/
