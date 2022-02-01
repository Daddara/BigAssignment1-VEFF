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
        // console.log("We are in ble: ", string);
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

    MakeBelieveJS.prototype.ajax = function(arg){
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
        if ( arg.headers == true ) { 
            for (var i = 0; i < arg.headers.length; i++) {
                HTTPrequest.setRequestHeader( arg.headers[i][0], arg.headers[i][1] );
            }
        }
        // if ( arg.data  !== {} ) {
        //     HTTPrequest.data(arg.data);
        // }
        if(arg.timeout !== 0){
            HTTPrequest.timeout = arg.timeout * 1000;
        }
        HTTPrequest.addEventListener("timeout", function(e) {
            // ...
            console.log("Boring");
        });
        
        HTTPrequest.send(arg.data);
        
        HTTPrequest.onreadystatechange = function(){
            console.log(HTTPrequest.response);
            if ( HTTPrequest.status == 200 && arg.success && HTTPrequest.readyState == XMLHttpRequest.DONE ) {
                //console.log('Status = 200');
                arg.success( HTTPrequest.response );
            }

            else if ( HTTPrequest.status != 200 && HTTPrequest.readyState == XMLHttpRequest.DONE && arg.fail ) {
                
                arg.fail( HTTPrequest.response );
            }

            else if( HTTPrequest.readyState == XMLHttpRequest.HEADERS_RECEIVED && arg.beforeSend ) {
                
                arg.beforeSend( HTTPrequest.response );
            }
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

__ = __("body");

__.ajax({
    url: 'https://serene-island-81305.herokuapp.com/api/200',
    method: 'GET',
    timeout: 10,
    data: {},
    headers: [
        {'Authorization': 'my-secret-key'}
    ],
    success: function (resp){
        // Triggered when there is a successful response from the server
        console.log("SUCCESS");
        console.log(resp);
    },
    fail: function (error){
        // Triggered when an error occured when connecting to the server
        console.log("ERROR");
        console.log(err);
    },
    beforeSend: function(xhr){
        // Triggered before the request and is passed in the XMLHttpRequest object
        console.log("BEFORE");
        console.log(xhr);
    }
})