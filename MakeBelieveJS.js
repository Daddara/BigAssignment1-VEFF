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

    MakeBelieveJS.prototype.insertText = function(text){
        // console.log("Inside text: ", text);
        // console.log(this.elems);
        for(var i = 0; i < this.elems.length; i++){
            this.elems[i].textContent = text;
        }
        return this;
        // this.elems[0].textContent = text;
        
    }

    MakeBelieveJS.prototype.append = function(string){
        if(typeof string == "string"){
            // <></> elem inserted here
            // console.log("This is of type string: ", string);
            this.elems[0].innerHTML = this.elems[0].innerHTML + string;
        }
        else{
            // createElememt here
            // console.log("Not of type string: ", string);
            this.elems[0].appendChild(string.parentNode);
            // console.log(string.parentNode);
        }
        return this;
    }

    MakeBelieveJS.prototype.prepend = function(string){
        console.log("We are in ble: ", string);
        if(typeof string == "string"){
            // <></> elem inserted here
            this.elems[0].innerHTML = string + this.elems[0].innerHTML;
        }
        else{
            // createElememt here
            this.elems[0].insertBefore(string.parentNode, this.elems[0].childNodes[0]);
        }
        return this;
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
// console.log(my_inputs);

// __("input").parent("form").parent();
// // var hello = __(".container").parent();
// var grandParent = __("#password").grandParent(".formdiv");
__("#paragraph").insertText("Suck my dick!");

__(".the-appender").append("<p>I am an appended paragraph!</p>");
__(".the-appender").append(
    document.createElement("p")
        .appendChild(
            document.createTextNode("I am a special paragraph!")
        )
);

__(".the-prepender").prepend("<p>I am an pretended paragraph!</p>");
__(".the-prepender").prepend(
    document.createElement("p")
        .appendChild(
            document.createTextNode("I am a special pretended paragraph!")
        )
);