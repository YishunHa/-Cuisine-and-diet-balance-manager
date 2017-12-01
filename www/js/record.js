Backendless.initApp( "07499B03-2534-911D-FF36-BC8973378900" , "9F4DE197-0721-1DD4-FF71-D79567043500", "v1" );
var all;
var myUser;
// Check browser support
if (typeof(Storage) !== "undefined") {

   all = localStorage.getItem("key");
   
    document.getElementById("result").innerHTML=all;
    check();
}


function check(){

     var userData = Backendless.Persistence.of( User ).find().data;
    for (var i = 0; i < userData.length; i++) { 

      if(userData[i].email==all){
//           alert(userData[i].password);
          document.getElementById("password").innerHTML =userData[i].password;
          document.getElementById("Username").innerHTML= userData[i].name;break;
    
        }
            if(i==userData.length-1){
          message="Sorry, wrong email or password";
                  alert(message);
               
        }
    }
    
   
}
function User(){
    this.name = "";
    this.password = "";
}

function changeProfile(){
    myUser=new User();
    myUser.name=document.getElementById("upname").value;
    myUser.password=document.getElementById("uppassword").value;
  
    binddingData();
 
}
function binddingData(){
    var userData = Backendless.Persistence.of( User ).find().data;

    for (var i = 0; i < userData.length; i++) { 
        console.log(userData[i].email,userData[i].password,i);
      	if(userData[i].email==all){
                console.log(myUser.email,myUser.password,"changeData");
            console.log( userData[i]);
             userData[i].name=myUser.name;
            userData[i].password=myUser.password;
//             userData[i].location=myUser.location;
//             userData[i].restaurant=myUser.restaurant;
//             userData[i].food=myUser.food;
//             userData[i].img=myUser.img;
            console.log( userData[i]);
                Backendless.Persistence.of( User ).save(userData[i]);     
                 window.location = "register.html";
                break;
            
        }else if(i==userData.length-1){
            var emailerror;
            createMessage("Edit wrong!");
        }
    }
}