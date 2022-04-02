

function onClick(){
   
    var out = document.getElementById("output");
    
    var values = document.getElementById("val1").value.split(",");
    var res = 0;
    for(const el of values){
        var a = el.trim()
        if(isNaN(a)||a<1){
            out.innerHTML = "VALUE NEEDS TO BE AN INTEGER GREATER THAN 0: "+a;
            return;
        }
        a = parseInt(a);
        res = gcd(a,res);
    }
    out.innerHTML = "GCD IS: "+res;

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

