(function(globalObj){

function MakeBelieveJS(elems) {
    console.log(elems);
    this.elems = elems;
    // return hehe;l
};

MakeBelieveJS.prototype.parent = function() {
    console.log(this.elems);
    var hello = this.elems[0].parentNode;
    console.log("Inside Parent");
    console.log(hello);
};

function input(html) {
    var inputs = document.querySelectorAll(html);
    console.log(inputs);
    return new MakeBelieveJS(inputs);
};

globalObj.__ =  input;

})(window);

console.log(window);


var tv = __(".container div");
console.log(tv);

var hello = __(".container").parent();
