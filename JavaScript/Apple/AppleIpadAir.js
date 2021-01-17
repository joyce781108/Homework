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
    productDisplay("health-content", "none");
    requestIpadJson();
};

// let url = "https://raw.githubusercontent.com/joyce781108/Homework/main/JavaScript/Apple/iPadAir2020_Data.json";
// function requestIpadJson() {
//     let xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//         appleArray = JSON.parse(this.responseText)
//     };
//     xhr.open("GET", url);
//     xhr.send();
// };

//v
// title.querySelectorAll("a").forEach((x) => {
//     x.addEventListener("click", function () {
//         let selectTitle = x.innerText;
//         selectTitleList = appleArray.filter(y => y.category == selectTitle);
//         nav.innerHTML = "";
//         // nav.style.top = "70px";
//         selectTitleData(selectTitleList);
        
//     });
// });

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



//v
// function selectTitleData(selectTitleList) {
//     let div = document.createElement("div");
//     div.className = "container";
//     let ul = document.createElement("ul");
//     div.appendChild(ul)
//     nav.appendChild(div)
//     selectTitleList.forEach(x => {
//         let li = document.createElement("li");
//         let i = document.createElement("i");
//         let a = document.createElement("a");
//         let span = document.createElement("span");
//         ul.appendChild(li);
//         li.appendChild(a);
//         a.href = "#";
//         a.appendChild(i);
//         if (x.category == "iPad") {
//             i.className = "fas fa-tablet-alt";
//         }
//         if (x.category == "iPhone") {
//             i.className = "fas fa-mobile-alt";
//         }
//         a.appendChild(span);
//         span.innerText = x.name;
//     });

    btnDisabled("storage", "text", true);
    btnDisabled("network", "text", true);


    // nav.querySelectorAll("a").forEach((x) => {
    //     x.addEventListener("click", function () {
    //         nav.style.top = "-100%";
    //         let selectNav = x.innerText;
    //         selectList = appleArray.find(y => y.name == selectNav);
    //         document.querySelector("h2").innerText = `購買 ${selectNav}`
    //         picData(selectNav);
    //         colorBtnData(selectList);
    //         colorBtnClick(selectNav);     
    //         productDisplay("health-content", "inline");
    //     });
    // });
};

//v
function productDisplay(item, x) {
    let className = document.getElementsByClassName(item)[0];
    className.style.display = x;
};
//v
// function picData(selectNav) {
//     let productPic = document.getElementsByClassName("productPic")[0];
//     img = document.createElement("img");
//     productPic.innerHTML = null;
//     productPic.appendChild(img);
//     let item = `./image/${selectNav}/all.png`;
//     img.src = item;
// };

function (selectNav) {
    color.querySelectorAll("button").forEach((x) => {
        x.addEventListener("click", function () {
            selectColorBtn(x, selectNav);
            btnDisabled("storage", "text", false);
        });
    });
};

//v
function selectColorBtn(item, selectNav) {
    let colorName = item.innerText;
    let color = colorkeys.find(x => selectList.color[x] == colorName);
    img.src = `./image/${selectNav}/${color}.png`;
};

//v
// function colorBtnData(selectList) {
//     let color = selectList.color;
//     colorkeys = Object.keys(color)
//     colorGroup = document.getElementsByClassName("color-group")[0];
//     row = document.createElement("row");
//     row.className = "row";
//     colorGroup.innerHTML = null;

//     colorkeys.forEach(x => {
//         p = document.createElement("p");
//         btn = document.createElement("button");
//         span = document.createElement("span");
//         btn.className = "btn-group";
//         span.className = "color-item";
//         p.innerText = selectList.color[x];
//         span.style = `background-color:${selectList.colorCode[x]}`;
//         btn.append(span, p);
//         row.appendChild(btn);
//     });

//     colorGroup.appendChild(row);
// };


//v
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

