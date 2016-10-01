/*
代码说明异步调用思想
*/
function Person(){
    this.think = function(callback) {
        setTimeout(function(){ console.log('thinking~~~!'); callback()}, 5000);
    }
    this.answer = function(){
        console.log("I'm answering other question");
    }
}

var person = new Person();
person.think(function(){
    console.log('thinking 5 second ,get the right ');
});
person.answer();
