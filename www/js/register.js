var message;



Backendless.initApp( "07499B03-2534-911D-FF36-BC8973378900" , 
                    "9F4DE197-0721-1DD4-FF71-D79567043500", 
                    "v1" );

function User() {
    
    this.email = "";
    this.password = "";
 
    
}

// function validate(){
//    var email = document.getElementById("addemail").value;
//    var password = document.getElementById("addpassword").value;
//     var ck_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//
//     if (!ck_email.test(email)) {
//      alert( "You must enter a valid email); 
//      
//     }
//
//     if (password=='') {
//      alert("You must enter the password ");
//     }
//
//     onAddData();
//    }

function Validate()  
{  
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
    var inputText=document.getElementById("addemail").value;
    var inputText1=document.getElementById("addpassword").value;
    if(inputText.match(mailformat))  
    {  
       
    if(inputText1==null||inputText1==""){
         message="You have entered an invalid password!";
        createMessage(message);
        }
        else{
           var userDatanew = Backendless.Persistence.of( User ).find().data;
            for (var r = 0; r < userDatanew.length; r++) { 

            if(userDatanew[r].email==inputText){
            
                message="Sorry, this email address has been used";
                  createMessage(message);break;
    
                }
            else if(r==userDatanew.length-1){
            
               onAddData();
                }
            }
        }
 
    }  
    else  
    {  
   
        message="You have entered an invalid email address!";
        createMessage(message);
    }  
    

}

function onAddData() {
	
	var emailtext = document.getElementById("addemail").value;
	console.log("add email = " + emailtext);
   
   
    var passwordtext = document.getElementById("addpassword").value;
	console.log("add task button clicked = " + passwordtext);
	
    var newUser = new User();
    newUser.email = emailtext;
    newUser.password = passwordtext;
   
    Backendless.Persistence.of( User ).save(newUser);
    message="Success to create a new account";
    createMessage(message);
	
}

function check(){
    var emailtext = document.getElementById("email").value;
    var passwordtext = document.getElementById("password").value;
  
    
    var newUser = new User();
    newUser.email = emailtext;
    newUser.password = passwordtext;
    var userData = Backendless.Persistence.of( User ).find().data;
    for (var i = 0; i < userData.length; i++) { 

      if(userData[i].email==newUser.email&&userData[i].password==newUser.password){
            window.localStorage.setItem ("key",emailtext);
            window.location = "home.html";break;
    
        }
            if(i==userData.length-1){
            message="Sorry, wrong email or password";
            createMessage(message);
               
        }
    } 
   
}

function createMessage(message){		
	//phoneGap and jQueryMobile do not support toast messages directly
    //so we can add this using toast.js
    new Toast({content: message, duration: 2000}); 	
}