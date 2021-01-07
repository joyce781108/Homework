let storage = document.getElementById("storage");
let color = document.getElementById("color");
let totalText = document.getElementById("total");
let ipadArray = [];
let total = 0;
let selectList = {};


window.onload = () => {
    btnDisabled("storage", "text", true);
    btnDisabled("network", "text", true);
    requestIpadJson();

};

let url = "https://raw.githubusercontent.com/joyce781108/Homework/main/JavaScript/iPadAir2020_Data.json";
function requestIpadJson() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        ipadArray = JSON.parse(this.responseText)
    };
    xhr.open("GET", url);
    xhr.send();
};


color.querySelectorAll("button").forEach((x) => {
    x.addEventListener("click", function () {
        selectColorBtn(x);
        btnDisabled("storage", "text", false);
    });
});

storage.querySelectorAll("button").forEach((x) => {
    x.addEventListener("click", function () {
        selectStorage(x)
    })
})

function selectColorBtn(item) {
    let pic = document.getElementById("pic");
    let colorName = item.innerText;
    selectList = ipadArray.filter(x => x.color == colorName)
    let imgUrl = `./image/iPad Air/${selectList[0].picture}`;
    pic.src = imgUrl;
}

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
}

function selectStorage(item) {
    let storage64 = document.getElementById("storage64");
    let storage256 = document.getElementById("storage256");
    if (item.id == "storage64") {
        selectList = ipadArray.find(x => x.storage == "64GB")
        total = selectList.price;
        totalText.innerHTML = `NT$ ${total.toLocaleString("zh-tw")} 起`
    }
    if(item.id == "storage256"){
        selectList = ipadArray.find(x => x.storage == "256GB")
        total = selectList.price;
        totalText.innerHTML = `NT$ ${total.toLocaleString("zh-tw")} 起`
    }




}

function calculateTotal(money) {

}


