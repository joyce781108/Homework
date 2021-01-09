let storage = document.getElementById("storage");
let network = document.getElementById("network");
let color = document.getElementById("color");
let nav = document.getElementById("nav");
let title = document.getElementById("title")

let appleArray = [];
let selectList = {};
let selectTitleList = {};
let total = 0;
let colorGroup, row, btn, span, p, img;
let colorkeys;
let wifiText, cellularText, wifiHigh, cellularHigh, wifiLow, cellularLow, totalText;

window.onload = () => {
    btnDisabled("storage", "text", true);
    btnDisabled("network", "text", true);
    requestIpadJson();

};

let url = "https://raw.githubusercontent.com/joyce781108/Homework/main/JavaScript/Apple/iPadAir2020_Data2.json";
function requestIpadJson() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        appleArray = JSON.parse(this.responseText)
    };
    xhr.open("GET", url);
    xhr.send();
};

title.querySelectorAll("a").forEach((x) =>{
    x.addEventListener("click",function (){
        
        let selectTitle = x.innerText;
        selectTitleList = appleArray.find(y => y.category == selectTitle);
        console.log(selectTitleList)
    })
})

nav.querySelectorAll("span").forEach((x) => {
    x.addEventListener("click", function () {
        let selectNav = x.innerText;
        selectList = appleArray.find(y => y.name == selectNav);
        document.querySelector("h2").innerText = `購買 ${selectNav}`
        picData(selectNav);
        colorBtnData(selectList);
        colorBtnClick(selectNav);
        startingPrice();
    })
});

function picData(selectNav) {
    let productPic = document.getElementsByClassName("productPic")[0];
    img = document.createElement("img");
    productPic.innerHTML = null;
    productPic.appendChild(img);
    let item = `./image/${selectNav}/all.png`;
    img.src = item;
}

function colorBtnClick(selectNav) {
    color.querySelectorAll("button").forEach((x) => {
        x.addEventListener("click", function () {
            selectColorBtn(x, selectNav);
            btnDisabled("storage", "text", false);
        });
    });
}


function selectColorBtn(item, selectNav) {
    let colorName = item.innerText;
    let color = colorkeys.find(x => selectList.color[x] == colorName);
    img.src = `./image/${selectNav}/${color}.png`;
}


function colorBtnData(selectList) {
    let color = selectList.color;
    colorkeys = Object.keys(color)
    colorGroup = document.getElementsByClassName("color-group")[0];
    row = document.createElement("row");
    row.className = "row";
    colorGroup.innerHTML = null;

    colorkeys.forEach(x => {
        p = document.createElement("p");
        btn = document.createElement("button");
        span = document.createElement("span");
        btn.className = "btn-group";
        span.className = "color-item";
        p.innerText = selectList.color[x];
        span.style = `background-color:${selectList.colorCode[x]}`;
        btn.append(span, p);
        row.appendChild(btn);
    })

    colorGroup.appendChild(row);
}

storage.querySelectorAll("button").forEach((x) => {
    x.addEventListener("click", function (e) {
        selectStorage(x);
        btnDisabled("network", "text", false);
    });

});

network.querySelectorAll("button").forEach((x) => {
    x.addEventListener("click", function () {
        selectNetork(x);

    });
});



function btnDisabled(id, className, bool) {
    let _id = document.getElementById(id);
    let btn = _id.getElementsByClassName(className);
    btn = Array.from(btn);
    btn.forEach(x => {
        if (bool == true) {
            x.setAttribute('disabled', bool);
        }
        if (bool == false) {
            x.removeAttribute('disabled');
        }
    });
};

function startingPrice() {
    wifiText = document.querySelector("#WiFi p+p");
    cellularText = document.querySelector("#Cellular p+p");
    totalText = document.getElementById("total");
    wifiHigh = selectList.storageHigh["wi-fi"];
    cellularHigh = selectList.storageHigh["cellular"];
    wifiLow = selectList.storageLow["wi-fi"];
    cellularLow = selectList.storageLow["cellular"];
    storage64Text = document.querySelector("#storage64 p+p");
    storage256Text = document.querySelector("#storage256 p+p");

    storage64Text.innerHTML = `NT$ ${wifiLow.toLocaleString("zh-tw")} 起`;
    storage256Text.innerHTML = `NT$ ${cellularHigh.toLocaleString("zh-tw")} 起`;
    wifiText.innerHTML = `NT$ ${wifiLow.toLocaleString("zh-tw")} 起`;
    cellularText.innerHTML = `NT$ ${cellularLow.toLocaleString("zh-tw")} 起`;
    totalText.innerHTML = `NT$ ${wifiLow.toLocaleString("zh-tw")} 起`;
}



let _storage = '';

function selectStorage(item) {
    if (item.id == "storage64") {
        _storage = 'storage64';
        total = wifiLow;
        totalText.innerHTML = `NT$ ${total.toLocaleString("zh-tw")} 起`;
        wifiText.innerHTML = `NT$ ${wifiLow.toLocaleString("zh-tw")} 起`;
        cellularText.innerHTML = `NT$ ${cellularLow.toLocaleString("zh-tw")} 起`;
    }
    if (item.id == "storage256") {
        _storage = 'storage256';
        total = wifiHigh;
        totalText.innerHTML = `NT$ ${total.toLocaleString("zh-tw")} 起`;
        wifiText.innerHTML = `NT$ ${wifiHigh.toLocaleString("zh-tw")} 起`;
        cellularText.innerHTML = `NT$ ${cellularHigh.toLocaleString("zh-tw")} 起`;
    }
};

function selectNetork(item) {
    if (item.id == "WiFi" && _storage == 'storage64') {
        total = wifiLow;
        totalText.innerHTML = `NT$ ${total.toLocaleString("zh-tw")}`
    }
    if (item.id == "WiFi" && _storage == 'storage256') {
        total = wifiHigh;
        totalText.innerHTML = `NT$ ${total.toLocaleString("zh-tw")}`
    }

    if (item.id == "Cellular" && _storage == 'storage64') {
        total = cellularLow;
        totalText.innerHTML = `NT$ ${total.toLocaleString("zh-tw")}`
    }

    if (item.id == "Cellular" && _storage == 'storage256') {
        total = cellularHigh;
        totalText.innerHTML = `NT$ ${total.toLocaleString("zh-tw")}`
    }
};

