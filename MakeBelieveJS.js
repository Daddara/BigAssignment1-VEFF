(function(globalObj){

    function MakeBelieveJS(elems) {
        this.elems = elems;
    };

    Array.prototype.pushToList = function (elem){
        if(!this.includes(elem)){
            this.push(elem);
        }
    }

    // 4
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
        console.log("Inside Parent");
        return new MakeBelieveJS(parentList);
    };

    // 5
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
        var query = document.querySelector(string);
        var parent;
        var ancestor;
        for (let element of this.elems) {
            parent = element.parentNode;

            while (parent !== null) {
                if (parent == query) {
                    ancestor = parent;
                }
                if (parent.parentNode === null) {
                    parent = null;
                }
                else {
                    parent = parent.parentNode;
                }
            }
        }
        var list = [];
        list.pushToList(ancestor);
        console.log("THE ANCESTOR LIST: ", list);
        return new MakeBelieveJS(list);
    };

      //7
    MakeBelieveJS.prototype.onClick = function(evt){
        console.log("check: ", this.elems);
        for (var i = 0; i < this.elems.length; i++) {
            this.elems[i].addEventListener("click", evt); 
        
        }
    }

    // 8
    MakeBelieveJS.prototype.insertText = function(text){
        for(var i = 0; i < this.elems.length; i++){
            this.elems[i].textContent = text;
        }
        return this;
        
    }

    // 9
    MakeBelieveJS.prototype.append = function(string){
        if(typeof string == "string"){
            // <></> elem inserted here
            this.elems[0].innerHTML = this.elems[0].innerHTML + string;
        }
        else{
            // createElememt here
            this.elems[0].appendChild(string.parentNode);
        }
        return this;
    }

    // 10
    MakeBelieveJS.prototype.prepend = function(string){
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

    // 11
    MakeBelieveJS.prototype.delete = function(){
        var deleteElement = this.elems[0];
        if (deleteElement){
            deleteElement.parentNode.removeChild(deleteElement)
        }
        return this;
    };

    //Helper function for attaching the  syntax the the MakeBelieve object
    var attachMakeBelieve = function (query) {
        return new MakeBelieveJS(document.querySelectorAll(query));
    };

    // 12
    attachMakeBelieve.ajax = function(arg){
        if(!arg.method){
            arg.method = "GET";
        }
        if(!arg.timeout){
            arg.timeout = 0;
        }
        if(!arg.data){
            arg.data = {}
        }
        if(!arg.headers){
            arg.headers = {}
        }
        if(!arg.success){
            arg.success = null;
        }
        if(!arg.fail){
            arg.fail = null;
        }
        if(!arg.beforeSend){
            arg.beforeSend = null;
        }
        console.log(arg);

        var HTTPrequest = new XMLHttpRequest();
        HTTPrequest.open(arg.method, arg.url);
        if ( JSON.stringify(arg.headers) != '{}' ) { 
            console.log("HEADERS!!!! ", arg.headers);
            for (var i = 0; i < arg.headers.length; i++) {
                for (const [key, value] of Object.entries(arg.headers[i])) {
                    HTTPrequest.setRequestHeader( key, value);
                    }
                }
        }
        console.log(HTTPrequest.headers);

        if(arg.timeout !== 0){
            console.log("TIMEOUT!");
            HTTPrequest.timeout = arg.timeout * 1000;
        }
        
        HTTPrequest.onreadystatechange = function(){
            if ( HTTPrequest.status == 200 && arg.success && HTTPrequest.readyState == HTTPrequest.DONE ) {
                console.log("Status = 200");
                console.log(HTTPrequest.response);
                arg.success( HTTPrequest.response );
            }
            else if ( HTTPrequest.status == 201 && arg.success && HTTPrequest.readyState == HTTPrequest.DONE ) {
                console.log("Status = 201");
                arg.success( HTTPrequest.response );
            }
            else if ( HTTPrequest.status == 202 && arg.success && HTTPrequest.readyState == HTTPrequest.DONE ) {
                console.log("Status = 202");
                arg.success( HTTPrequest.response );
            }
            else if ( HTTPrequest.status == 204 && arg.success && HTTPrequest.readyState == HTTPrequest.DONE ) {
                console.log("Status = 204");
                arg.success( HTTPrequest.response );
            }

            else if ( HTTPrequest.readyState == HTTPrequest.DONE && arg.fail ) {
                console.log(HTTPrequest.status);
                console.log("Status = Fail");
                arg.fail( HTTPrequest.response );
            }

            else if( HTTPrequest.readyState == HTTPrequest.HEADERS_RECEIVED && arg.beforeSend ) {
                console.log("Status = Before hehe");
                arg.beforeSend( HTTPrequest.response );
            }
        }

        HTTPrequest.send(arg.data);
        return this;
        }
    
    //13
    MakeBelieveJS.prototype.css = function(element, value) {
        for (var i = 0; i < this.elems.length; i++) {
            this.elems[i].style[element] = value;
            return new MakeBelieveJS(this);
        }
    }

     //14
     MakeBelieveJS.prototype.toggleClass = function(target) {
        var hello = this.elems[0].childNodes;
        for(var i = 0; i < hello.length; i++){
            if(hello[i].className == target){
                var classElems = document.getElementsByClassName(target);
                if(classElems[0].style.visibility ){
                    if(classElems[0].style.visibility == "hidden"){
                        for(var i = 0; i < classElems.length; i++){
                            classElems[i].style.visibility = "visible";
                        }
                }
                else{
                    for(var i = 0; i < classElems.length; i++){
                        classElems[i].style.visibility = "hidden";
                    }
                }
                }
                else{
                    for(var i = 0; i < classElems.length; i++){
                        classElems[i].style.visibility = "hidden";
                    }
                }
            }
        }
        return this.elems[0];
    }


    //15
    MakeBelieveJS.prototype.onSubmit = function (evt){
        this.elems[0].addEventListener("submit", evt);
    };

    //16
    MakeBelieveJS.prototype.onInput = function (evt){
        var i;
        for(i=0;i < this.elems.length; i++){
            this.elems[i].addEventListener("input", evt);
        }
    
    }
globalObj.__ =  attachMakeBelieve;

})(window);

// console.log(window);

var my_inputs = __("#my-form input");
// console.log(my_inputs);

__("input").parent("form").parent();
// var hello = __(".container").parent();
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


__.ajax({
    url: 'https://serene-island-81305.herokuapp.com/api/200',
    method: 'GET',
    timeout: 10,
    data: {},
    // headers: [
    //     {'Authorization': 'my-secret-key'}
    // ],
    success: function (resp){
        // Triggered when there is a successful response from the server
        console.log("SUCCESS");
        console.log(resp);
    },
    fail: function (error){
        // Triggered when an error occured when connecting to the server
        console.log("ERROR");
        console.log(error);
    },
    beforeSend: function(xhr){
        // Triggered before the request and is passed in the XMLHttpRequest object
        console.log("BEFORE");
        console.log(xhr);
    }
})
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
__("#child").ancestor("#ancestor");
console.log(__("#child").ancestor("#ancestor"));
console.log(__("#child").ancestor("#ancestor"));

__("#myform").onSubmit(function(evt){
    alert("jaja");
});
// __("#myform").onInput(function(evt){
//      console.log(event.data);
//  });

//7
__('#password').onClick (function (evt) {
    console.log("test 7: ", evt.target.value);});

//13
__('#television').css('background-color', 'black');


//14
__('.formdiv').toggleClass('form');
__('.formdiv').toggleClass('form');
// __('.formdiv').toggleClass('form');