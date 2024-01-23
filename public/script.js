function myfuc(){
    var x = document.getElementById("Phone")
    if(x.type === "password"){
        x.type = "text"
    }else{
        x.type = "password"
    }
}