let title = document.getElementById("title")
let nav = document.getElementById("nav");
let storage = document.getElementById("storage");
let network = document.getElementById("network");
let color = document.getElementById("color");
let appleArray = [];
let selectArray = [];
let btn;

window.onload = () => {
    appleJson()
}

let url = "https://raw.githubusercontent.com/joyce781108/Homework/main/JavaScript/Apple/Apple.json"
function appleJson() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        appleArray = JSON.parse(this.responseText)
    };
    xhr.open("GET", url);
    xhr.send();
}

title.querySelectorAll("a").forEach((x) => {
    x.addEventListener("click", function () {
        nav.innerHTML = "";
        selectNavData(x)
        // nav.style.top = "70px";
        // selectTitleData(selectTitleList);
    });
});



function selectNavData(item) {
    let selectTitle = item.innerText;
    let selectList = appleArray.find(x => x.category == selectTitle)
    let div = document.createElement("div");
    div.className = "container";
    let ul = document.createElement("ul");
    div.appendChild(ul)
    nav.appendChild(div)
    selectList.product.forEach(x => {
        let li = document.createElement("li");
        let i = document.createElement("i");
        let a = document.createElement("a");
        let span = document.createElement("span");
        ul.appendChild(li);
        li.appendChild(a);
        a.href = "#";
        a.appendChild(i);
        if (selectList.category == "iPad") {
            i.className = "fas fa-tablet-alt";
        }
        if (selectList.category == "iPhone") {
            i.className = "fas fa-mobile-alt";
        }
        a.appendChild(span);
        span.innerText = x.productID;
    });


    nav.querySelectorAll("a").forEach((x) => {
        x.addEventListener("click", function () {           
            let selectNav = x.innerText;
            selectArray = (selectList.product).find(y => y.productID == selectNav);
            document.querySelector("h2").innerText = `購買 ${selectNav}`
            picData(selectNav);
            colorBtnData(selectArray);
            storageBtnData(selectArray);
            // colorBtnClick(selectNav);     
            // productDisplay("health-content", "inline");
        });
    });
};

function picData(item) {
    let productPic = document.getElementsByClassName("productPic")[0];
    img = document.createElement("img");
    productPic.innerHTML = null;
    productPic.appendChild(img);
    img.src = `./image/${item}/all.png`;
};

function colorBtnData(item) {
    let colorGroup = document.getElementsByClassName("color-group")[0];
    colorGroup.innerHTML = null;
    item.color.forEach(x => {
        let p = document.createElement("p");
        let btn = document.createElement("button");
        let span = document.createElement("span");
        btn.className = "btn-group";
        span.className = "color-item";
        p.innerText = x.description;
        span.style = `background-color:${x.colorCode}`;
        btn.append(span, p);
        colorGroup.appendChild(btn);
    });
};

function storageBtnData(item){
    storage.innerHTML = null;
    let h5 = document.createElement("h5");  
    h5.innerText = "儲存裝置"
    storage.append(h5);
    item.model.forEach(x =>{
        let p = document.createElement("p");
        let p2 = document.createElement("p");
        let btn = document.createElement("button");
        let span = document.createElement("span");
        let sup = document.createElement("sup")
        btn.id = `storage${x.storage}`;
        btn.className = "btn-group text";
        debugger
        span.innerText = x.storage;
        p.innerText = x.unit;
        sup.innerText = "1";
        p.append(span,sup);
        // p.innerHTML = `${span.innerText = x.storage}${x.unit}${sup.innerText = "1"}`
        p2.innerText = `NT$ ${x.wi-fi} 起`
        btn.append(p,p2)
        storage.append(btn);
    })
    
}