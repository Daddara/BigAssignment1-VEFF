(function(globalObj){

    function MakeBelieveJS(elems) {
        console.log(elems);
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

    function input(html) {
        var inputs = document.querySelectorAll(html);
        console.log(inputs);
        return new MakeBelieveJS(inputs);
};

globalObj.__ =  input;

})(window);

// console.log(window);

var my_inputs = __("#my-form input");
console.log(my_inputs);

__("input").parent("form").parent();
// var hello = __(".container").parent();
var grandParent = __("#password").grandParent(".formdiv");
