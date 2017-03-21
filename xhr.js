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

//load 替代readystatechange事件
xhr.onload = function(){
  if((xhr.status>=200 && xhr.status<300) || xhr.status==304){
    alert(xhr.responseText);
  }else{
    alert("Request was unsuccessful:" + xhr.status);
  }
}

//xhr.open("get","example.txt",true);
//xhr.setRequestHeader("MyHeader","MyValue");//设置自定义的请求头部信息：字段名称 字段值
//xhr.send(null);//参数 无传null
//xhr.abort(); //取消异步请求


function addURLParam(url,name,value){
  url += (url.indexOf("?") == -1 ? "?" : "&");
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url;
}

vat url="example.php";
url = addURLParam(url, "name" , "Nicho");
xhr.open("get", url , false);
xhr.timeout = 1000;
xhr.ontimeout = function(){
  alert("Request did not return in a second.");
}
xhr.send(null);

xhr.open("post" , "postexample.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
var form = document.getElementById('user-info');
xhr.send(serialize(form));                                  
//xhr.send(new FormData(from));//不用设置请求头部 

function createStreamingClient(url, progress, finished){
  var xhr = new XMLHttpRequest(),
      received = 0;
  xhr.open("get", url, true);
  xhr.onreadystatechange = function(){
    var result;
    if(xhr.readyState==3){
      //只取得最新数据并调整计数器
      result = xhr.responseText.substring(received);
      received += result.length;
      progress(result);//调用progress回调函数
    }else if(xhr.readyState == 4){
      finished(xhr.responseText);
    }
  };
  xhr.send(null);
  return xhr;
}
// var client = createStreamingClient("streaming.php", function(data){alert("Received:"+data;)}, function(data){alert("Done!");});
