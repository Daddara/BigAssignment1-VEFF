(function(globalObj){

    function MakeBelieveJS(elems) {
        // console.log(elems);
        this.elems = elems;
    };

    Array.prototype.pushToList = function (elem){
        if(!this.includes(elem)){
            this.push(elem);
        }
    }

    MakeBelieveJS.prototype.parent = function(string) {
        let parentList = [];
        console.log("STUPID SHIT HERE: ",this.elems);
        for(var i = 0; i < this.elems.length; i++){
            if(!string){
                parentList.pushToList(this.elems[i].parentNode);
            }
            else{
                if(this.elems[i].parentNode.matches(string)){
                    parentList.pushToList(this.elems[i].parentNode);
                }
            }
        }
        console.log(parentList);
        console.log(this.elems);
        // var parent = this.elems[0].parentNode;
        console.log("Inside Parent");
        return new MakeBelieveJS(parentList);
    };

    MakeBelieveJS.prototype.grandParent = function(string){
        console.log("GRANDPAPA!!!!");
        for(var i = 0; i < this.elems.length; i++){
            if(!string){
                var parentOfElem = this.elems[i].parentNode;
                var grandParentElem = parentOfElem.parentNode;
                console.log("GOT GRANPA HERE: ", grandParentElem);
                return new MakeBelieveJS(grandParentElem);
            }
            else{
                if(this.elems[i].parentNode.parentNode.matches(string)){
                    var parentOfElem = this.elems[i].parentNode;
                    var grandParentElem = parentOfElem.parentNode;
                    console.log("GOT GRANPA HERE: ", grandParentElem);
                    return new MakeBelieveJS(grandParentElem);
                }
        }
        return {};
    }
}
//6
    MakeBelieveJS.prototype.ancestor = function(string){
        var query = document.querySelector(string)
        var parent
        var ancestor
        for (let element of this.elems) {
            parent = element.parentNode

            while (parent !== null) {
                if (parent == query) {
                    ancestor = parent
                }
                if (parent.parentNode === null) {
                    parent = null;
                }
                else {
                    parent = parent.parentNode
                }
            }
        }
        var list = []
        list.pushToList(ancestor)
        // console.log(list)
        return new MakeBelieveJS(list);
    };
//11
MakeBelieveJS.prototype.delete = function(){
    var deleteElement = this.elems[0];
    if (deleteElement){
        deleteElement.parentNode.removeChild(deleteElement)
    }
    return this;
};
//15
MakeBelieveJS.prototype.onSubmit = function (evt){
    this.elems[0].addEventListener("submit", evt)
};
//16
MakeBelieveJS.prototype.onInput = function (evt){
    var i;
    for(i=0;i < this.elems.length; i++){
        this.elems[i].addEventListener("input",evt)
    }
    
}
    function input(html) {
        var inputs = document.querySelectorAll(html);
        return new MakeBelieveJS(inputs);
};

globalObj.__ =  input;

})(window);

// console.log(window);

// var my_inputs = __("#my-form input");
// console.log(my_inputs);

// __("input").parent("form").parent();
// // var hello = __(".container").parent();
// var grandParent = __("#password").grandParent(".formdiv");

// var ancestor = __("#child").ancestor("#ancestor");
// console.log(ancestor);

// var ancestor = __("#child").grandParent("#ancestor");
// console.log(ancestor.elems);

// __("#child").grandParent().delete();
__("#child").ancestor("#ancestor").delete();
console.log(__("#child").ancestor("#ancestor"));
console.log(__("#child").ancestor("#ancestor"));

// __("#myform").onSubmit(function(evt){
//     alert("jaja");
// });
// __("#myform").onInput(function(evt){
//      console.log(event.data);
//  });
