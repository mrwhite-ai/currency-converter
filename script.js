
var fromResult=document.getElementById("sell1");
var toResult=document.getElementById("sell2");
var resultFrom="USD";
var resultTo="EUR";

//Get Currencies Rate In Select
fetch("https://open.er-api.com/v6/latest/USD")
.then(res=>res.json())
.then(cur=>{
        let currencies=Object.keys(cur.rates);
        for(let i=0;i<currencies.length;i++){
          var html;
           html+=`<option value="${currencies[i]}">${currencies[i]}</option>`;
        }
        fromResult.innerHTML=html;
        toResult.innerHTML=html;
        toResult.value="EUR"; 
});

//Currency Change
fromResult.addEventListener("change",function(event){
    resultFrom=`${event.target.value}`;
})

toResult.addEventListener("change",function(event){
    resultTo=`${event.target.value}`;
})

//Get Exchange Rate Buton Click
document.getElementById("exchangeBtn").addEventListener("click",exchangeCur);

function exchangeCur(){
    fetch("https://open.er-api.com/v6/latest/USD")
    .then(res=>res.json())
    .then(cur=>{
        var amount=document.getElementById("enterAmount").value;
        if(amount==""){
            document.getElementById("moneyRate").innerText="*Please enter amount";
        }else{
        let curRates=cur.rates;
        let fromRates=curRates[resultFrom];
        let toRates=curRates[resultTo];
        let finalAmount=((toRates/fromRates)*amount);
        let htmlcur=`${amount} ${resultFrom} = ${finalAmount} ${resultTo}`;
        document.getElementById("moneyRate").innerText=htmlcur;
    }
    })
}
//Reverse Currencies With Icon
document.getElementById("changeFromTo").addEventListener("click",changeCur);

function changeCur(){
    let temp=resultFrom;
    resultFrom=resultTo;
    resultTo=temp;
    fromResult.value=resultFrom;
    toResult.value=resultTo;
}