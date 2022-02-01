(function(globalObj){

function MakeBelieveJS(elems) {
    console.log(elems);
    this.elems = elems;
    // return hehe;l
};

MakeBelieveJS.prototype.parent = function(string) {
    let parentList = [];
    for(let i = 0; i < this.elems.length; i++){
        if(string === "" || string === null){
            parentList.push(this.elems[i].parentNode);
        }
        else{
            if(this.elems[i].parentNode.matches(string)){
                parentList.push(this.elems[i].parentNode);
            }
        }
    }
    console.log(parentList);
    console.log(this.elems);
    // var parent = this.elems[0].parentNode;
    console.log("Inside Parent");
    return parentList;
};

function input(html) {
    var inputs = document.querySelectorAll(html);
    console.log(inputs);
    return new MakeBelieveJS(inputs);
};

globalObj.__ =  input;

})(window);

// console.log(window);

// var my_inputs = __("#my-form input");
// console.log(my_inputs);

__("input").parent("form");
// var hello = __(".container").parent();
