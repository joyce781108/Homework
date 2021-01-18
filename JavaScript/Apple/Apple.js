let title = document.getElementById("title")
let nav = document.getElementById("nav");
let dynamicallyAdd = document.getElementById("dynamicallyAdd");
let appleArray = [];
let selectArray = [];
let _total = document.getElementById("total");
let selectTitle;
Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
    }, {})
};
window.onload = () => {
    appleJson();
    productDisplay("class", "health-content", "none");
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
        selectNavData(x);
        productDisplay("id", "total", "none");
        productDisplay("id", "nav", "block")
    });
});



function selectNavData(item) {
    selectTitle = item.innerText;
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
            productDisplay("class", "health-content", "block");
            productDisplay("id", "nav", "none")
            dynamicallyAdd.innerHTML = null;
            let selectNav = x.innerText;
            selectArray = (selectList.product).find(y => y.productID == selectNav);
            document.querySelector("h2").innerText = `購買 ${selectNav}`

            picData(selectNav);
            if (selectArray.model[0].size != "none") {
                modelBtnData(selectArray);
                modelBtnClick();
            }
            colorBtnData(selectArray);
            storageBtnData(selectArray);
            if (selectTitle != "iPhone") {
                networkBtnData(selectArray);
            }
            if (selectArray.model[0].size != "none") {
                btnDisabled("color", "btn-group", true);
            }
            btnDisabled("storage", "btn-group", true);
            if (selectTitle != "iPhone") {
                btnDisabled("network", "btn-group", true);
                networkClick();
            }
            colorBtnClick(selectNav);
            storageBtnClick();
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

function modelBtnData(item) {
    
    let div = document.createElement("div");
    div.id = "model";
    div.className = "section-block size";
    dynamicallyAdd.appendChild(div);
    let h5 = document.createElement("h5");
    h5.innerText = "選擇機型"
    div.appendChild(h5);
    let sizeGroupBy = item.model.groupBy("size");
    let keys = Object.keys(sizeGroupBy)

    keys.forEach(x => {
        let p = document.createElement("p");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        let btn = document.createElement("button");
        let span = document.createElement("span");
        let span2 = document.createElement("span");
        btn.id = sizeGroupBy[x][0].size;
        btn.className = "btn-group";
        p.innerText = sizeGroupBy[x][0].description;
        p2.innerText = `${x}吋顯示器`;
        span.append(p, p2);
        p3.innerText = `NT$ ${sizeGroupBy[x][0].wifi.toLocaleString("zh-tw")}起`;
        p3.className = "price"
        span2.appendChild(p3);
        btn.append(span, span2);
        div.appendChild(btn);
    })
}

function modelBtnClick() {
    let model = document.getElementById("model");
    model.querySelectorAll("button").forEach(x => {
        x.addEventListener("click", function () {
            productDisplay("id", "total", "none")
            selectModelBtn(x);
            btnDisabled("color", "btn-group", false);
        });
    });
}


function colorBtnData(item) {
    let div = document.createElement("div");
    div.id = "color";
    div.className = "section-block exterior";
    dynamicallyAdd.appendChild(div);
    let h5 = document.createElement("h5");
    h5.innerText = "外觀"
    let div2 = document.createElement("div");
    div2.className = "color-group";
    div.append(h5, div2);
    item.color.forEach(x => {
        let p = document.createElement("p");
        let btn = document.createElement("button");
        let span = document.createElement("span");
        btn.className = "btn-group";
        span.className = "color-item";
        p.innerText = x.description;
        span.style = `background-color:${x.colorCode}`;
        btn.append(span, p);
        div2.appendChild(btn);
    });
};

function colorBtnClick(selectNav) {
    let color = document.getElementById("color");
    color.querySelectorAll("button").forEach(x => {
        x.addEventListener("click", function () {
            selectColorBtn(x, selectNav);
            btnDisabled("storage", "text", false);
        });
    });
};

function selectColorBtn(item, selectNav) {
    let colorName = item.innerText;
    let color = selectArray.color.find(x => x.description == colorName);
    img.src = `./image/${selectNav}/${color.colorID}.png`;
};


function storageBtnData(item) {
    let storageGroupBy = item.model.groupBy("size");
    let keys = Object.keys(storageGroupBy);
    let div = document.createElement("div");
    div.id = "storage";
    div.className = "section-block storageDevice";
    dynamicallyAdd.appendChild(div);
    let h5 = document.createElement("h5");
    h5.innerText = "儲存裝置";
    div.append(h5);
    storageGroupBy[keys[0]].forEach(x => {
        let p = document.createElement("p");
        let p2 = document.createElement("p");
        let btn = document.createElement("button");
        let span = document.createElement("span");
        let span2 = document.createElement("span");
        let sup = document.createElement("sup")
        btn.id = `storage${x.storage}`;
        btn.className = "btn-group text";
        span.innerText = x.storage;
        span2.innerText = x.unit;
        sup.innerText = "1";
        p.append(span, span2, sup);
        p2.innerText = `NT$ ${x.wifi.toLocaleString("zh-tw")} 起`
        p2.className = "price"
        btn.append(p, p2)
        div.append(btn);
    });


}

function storageBtnClick() {
    let storage = document.getElementById("storage");
    storage.querySelectorAll("button").forEach((x) => {
        x.addEventListener("click", function () {
            productDisplay("id", "total", "block")
            selectStorageBtn(x);
            if (selectTitle != "iPhone") {
                productDisplay("id", "total", "none")
                btnDisabled("network", "text", false);
            }
        });
    });
}

function networkBtnData(item) {
    let div = document.createElement("div");
    div.id = "network";
    div.className = "section-block connectivity";
    dynamicallyAdd.appendChild(div);
    let h5 = document.createElement("h5");
    h5.innerText = "連線能力";
    let networkGroupBy = item.model.groupBy("storage");
    let keys = Object.keys(networkGroupBy)
    let p = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let p4 = document.createElement("p");
    let btn = document.createElement("button");
    let btn2 = document.createElement("button");

    btn.id = "wifi";
    btn.className = "btn-group text";
    p.innerText = "Wi-Fi";
    p2.innerText = `NT$ ${networkGroupBy[keys[0]][0].wifi.toLocaleString("zh-tw")} 起`;
    p2.className = "price"
    btn.append(p, p2);
    btn2.id = "cellular";
    btn2.className = "btn-group text";
    p3.innerText = "Wi-Fi + 行動網路";
    p4.innerText = `NT$ ${networkGroupBy[keys[0]][0].cellular.toLocaleString("zh-tw")} 起`;
    p4.className = "price"
    btn2.append(p3, p4);
    div.append(h5, btn, btn2);
}

function networkClick() {
    let network = document.getElementById("network");
    network.querySelectorAll("button").forEach((x) => {
        x.addEventListener("click", function () {
            productDisplay("id", "total", "block")
            selectNetworkBtn(x);
        });
    });
}


function productDisplay(y, item, x) {
    if (y == "class") {
        let className = document.getElementsByClassName(item)[0];
        className.style.display = x;
    }
    if (y == "id") {
        let id = document.getElementById(item);
        id.style.display = x;
    }
};

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

function selectModelBtn(item) {
    let model = selectArray.model.filter(x => x.size == item.id);
    for (i = 0; i < model.length; i++) {
        let t = document.querySelector(`#storage${model[i].storage} .price`);
        t.innerHTML = `NT$ ${model[i].wifi.toLocaleString("zh-tw")} 起`
    }
}

function selectStorageBtn(item) {
    let y = document.querySelector(`#${item.id} span`).innerText
    let storage = selectArray.model.filter(x => x.storage == y);
    let priceText = document.querySelector(`#${item.id} .price`).innerText;
    if (storage[0].cellular != "none") {
        for (i = 0; i < storage.length; i++) {
            let wifi = document.querySelector("#wifi .price");
            let cellular = document.querySelector("#cellular .price");
            wifi.innerHTML = `NT$ ${storage[i].wifi.toLocaleString("zh-tw")} 起`;
            cellular.innerHTML = `NT$ ${storage[i].cellular.toLocaleString("zh-tw")} 起`
            return;
        }
    }
    total(storage, priceText, "wifi")
}

function selectNetworkBtn(item) {
    let priceText = document.querySelector(`#${item.id} .price`).innerText;
    _total.innerHTML = priceText.slice(0, -1)

}

function total(item, price, network) {
    let priceText = price;
    let itemText = item.find(x => `NT$ ${x.wifi.toLocaleString("zh-tw")} 起` == priceText)
    if (network == "wifi") {
        _total.innerHTML = `NT$ ${itemText.wifi.toLocaleString("zh-tw")}`
    }
    if (network == "cellular") {
        _total.innerHTML = `NT$ ${itemText.cellular.toLocaleString("zh-tw")}`
    }
}