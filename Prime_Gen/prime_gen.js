function onClick(){
    var a = document.getElementById("val1").value;
    var out = document.getElementById("output");
    
    if(isNaN(a)||a<0){
        out.innerHTML = "FIRST VALUE NEEDS TO BE AN INTEGER GREATER THAN 0"
        return;
    }
    var b = document.getElementById("val2").value;
    if(isNaN(b)||b<0){
        out.innerHTML = "BOTH VALUES NEED TO BE AN INTEGER GREATER THAN 0"
        return;
    }
    
    const min_max = new BigUint64Array(2);
    min_max[0] = BigInt(a);
    min_max[1] = BigInt(b);
    a=parseInt(a);
    b=parseInt(b);
    if(a>=b){
        out.innerHTML = "FIRST VALUE NEEDS TO BE LESS THAN THE SECOND"
        return;
    }
    
   
    out.innerHTML = get_a_random(min_max);

}
function gcd(a,b){
    
    if(a==0n && b==0n){
        return -1n;
    } else if(a==0n){
        return b;
    } else if(b==0n){
        return a;
    }else if(b==1n||a==1n){
        return 1n;
    }
    else if(a%2n==0&&b%2n==0){
        return 2n*gcd(a>>1n,b>>1n);
    }else if(a%2n==0){
        return gcd(a/2n,b);
    }else if(b%2n==0){
        return gcd(b/2n,a);
    }else{
        if(a>b)return gcd(a-b,a,b)
        return gcd(b-a,a)
    }
}

function modular_exp(a,exp,p){
    if(p<=1) return 0
    out = 1n
    a = a%p
    
    while(exp>0n){
        if(exp%2n==1) out=(out*a)%p;
        exp = exp>>1n;
        a = (a*a)%p;
    }
    return out;
}

function jacobi_symbol(a,p){
    
    if(a==1n || a==0n) return a;
    if(p==1n || p ==0n) return p;
    a = a%p;
    if(a%2n==0){
        if(p%8n==1n||p%8n==7n){
            return jacobi_symbol(a>>1n,p);
        }else{
            return -jacobi_symbol(a>>1n,p);
        }
    }else{
        if(a%4n==3n && p%4n==3n){
            return -jacobi_symbol(p,a)
        }else{
            return jacobi_symbol(p,a)
        }
    }
    
    
}
function get_a_random(min_max){
    let flag = true;
    if(min_max[1]-min_max[0]<10000){
       //TODO: ADD EXHAUSTIVE SEARCH HERE: 
    }
    
    let diff = min_max[1]-min_max[0];
    let i = 0;
    while(i<10000 && flag){
        i++;
        var bts = new BigUint64Array(80);

        self.crypto.getRandomValues(bts);
        let candidate = bts[0];
        candidate = (candidate%diff)+min_max[0];
        
        
        if(candidate<0n) candidate = -candidate;
        if(candidate%2n==0) candidate= candidate+1n;
        let totient = candidate-1n;
        let fl2 = true;
        for(let i =1; fl2&&i<50; i++){
            var witness = bts[i]%candidate;
            
            if(witness%2n==0) witness+=1n;
            if(witness==1n)witness = witness*3n;
            if(witness==candidate) witness = candidate/3n;
            if(witness<0n) witness = -witness;
            if(gcd(witness, candidate)!=1){
                fl2 = false;
                console.log(candidate+" is not prime 1 "+witness)
            }else{
                var mdexp = modular_exp(witness,totient, candidate);
                if(mdexp!=1){
                    fl2 = false;
                    console.log(candidate+" is not prime 2 "+witness+" w "+mdexp+" "+totient)
                }else{
                    let out = modular_exp(witness,totient/2n, candidate);
                    let jc = jacobi_symbol(witness,candidate);
                    if(jc==-1n) jc = candidate-1n;
                    
                    if(out!=jc){
                        fl2 = false;
                        console.log(candidate+" is not prime 3 "+out+" "+jc+" w "+witness)
                    }
                }
            }
        }
        if(fl2){
            return candidate;
        }
    }
    
    return "COULDN'T FIND PRIME IN GIVEN RANGE";
    
    
}