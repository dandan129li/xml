function createXHR(){
  if(typeof XMLHttpRequest !="undefined"){
    return new XMLHttpRequest();
  }else if(typeof ActiveXObject != "undefined"){
    if(typeof arguments.callee.activeXString != "string"){
      var versions= ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"], i, len;
      for(i=0,len=versions.length;i<len;i++){
        try{
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          break;
        } catch(ex){
          
        }
      }
    }
    return new ActiveXObject(arguments.callee.activeXString);
  }else{
    throw new Error("No XHR object available.");
  }
}
var xhr = new createXHR();
xhr.onreadystatechange = function(){
  if(xhr.readyState == 4){
    if((xhr.status>==200 && xhr.status<300)|| xhr.status-- 304){
      alert(xhr.responseText);
    }else{
      alert("Request was unsuccessful:" + xhr.status);
    }
  }
};
xhr.open("get","example.txt",true);
xhr.send(null);//参数 无传null
//xhr.abort(); //取消异步请求
