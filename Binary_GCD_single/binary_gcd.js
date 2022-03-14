

function onClick(){
   
    var out = document.getElementById("output");
    var a = document.getElementById("val1").value;
    if(isNaN(a)||a<1){
        out.innerHTML = "BOTH VALUES NEED TO BE AN INTEGER GREATER THAN 0"
        return;
    }
    var b = document.getElementById("val2").value;
    if(isNaN(b)||b<1){
        out.innerHTML = "BOTH VALUES NEED TO BE AN INTEGER GREATER THAN 0"
        return;
    }
    out.innerHTML = "GCD IS: "+gcd(a,b);

}
function gcd(a,b){
    
    if(a==0 && b==0){
        return -1;
    } else if(a==0){
        return b;
    } else if(b==0){
        return a;
    }
    else if(a%2==0&&b%2==0){
        return 2*gcd(a>>>1,b>>>1);
    }else if(a%2==0){
        return gcd(a>>>1,b);
    }else if(b%2==0){
        return gcd(b>>>1,a);
    }else{
        return gcd(Math.abs(a-b),Math.min(a,b))
    }
}

