let storage = document.getElementById("storage");
let color = document.getElementById("color");
let totalText = document.getElementById("total");
let nav = document.getElementById("nav")
let ipadArray = [];
let total = 0;
let selectList = {};



window.onload = () => {
    // btnDisabled("storage", "text", true);
    // btnDisabled("network", "text", true);
    requestIpadJson();

};

let url = "https://raw.githubusercontent.com/joyce781108/Homework/main/JavaScript/Apple/iPadAir2020_Data.json";
function requestIpadJson() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        ipadArray = JSON.parse(this.responseText)
    };
    xhr.open("GET", url);
    xhr.send();
};

nav.querySelectorAll("li").forEach((x) => {
    x.addEventListener("click", function () {

        let selectNav = x.innerText;
        let data = ipadArray.find(y => y.name == selectNav);
        console.log(data);
        let i = Object.keys(ipadArray);
        let a = Object.values(ipadArray);
        
    
        console.dir(i)
        console.dir(a)
    


        picData(selectNav);
    })
});

function picData(selectNav) {
        let img = document.createElement("img");
        img.id = "pic";
        let productPic = document.getElementsByClassName("productPic")[0];
        productPic.innerHTML = null;
        productPic.appendChild(img);
        let item = `./image/${selectNav}/all.png`;
        img.src = item;
}

color.querySelectorAll("button").forEach((x) => {
    x.addEventListener("click", function () {
        selectColorBtn(x);
        btnDisabled("storage", "text", false);
    });
});

function selectColorBtn(item) {
    let pic = document.getElementById("pic");
    let colorName = item.innerText;
    selectList = ipadArray.filter(x => x.color == colorName)
    let imgUrl = `./image/${selectNav}/${selectList[0].picture}`;
    pic.src = imgUrl;
}

function colorBtnTemplate(){
    let colorGroup = document.getElementsByClassName("color-group")[0];
    let row = document.createElement("row");
    row.className = "row";
    let btn = document.createElement("button");
    btn.className = "btn-group";
    let span = document.createElement("span");
    span.className = "color-item";
    let p = document.createElement("p");
    colorGroup.appendChild(row);
    row.appendChild(btn);
    btn.append(span,p);
    


}



// storage.querySelectorAll("button").forEach((x) => {
//     x.addEventListener("click", function () {
//         selectStorage(x)
//     })
// })



// function btnDisabled(id, className, bool) {
//     let _id = document.getElementById(id);
//     let btn = _id.getElementsByClassName(className);
//     btn = Array.from(btn);
//     btn.forEach(x => {
//         if (bool == true) {
//             x.setAttribute('disabled', bool);
//         }
//         if (bool == false) {
//             x.removeAttribute('disabled');
//         }

//     });
// }

// function selectStorage(item) {
//     let storage64 = document.getElementById("storage64");
//     let storage256 = document.getElementById("storage256");
//     if (item.id == "storage64") {
//         selectList = ipadArray.find(x => x.storage == "64GB")
//         total = selectList.price;
//         totalText.innerHTML = `NT$ ${total.toLocaleString("zh-tw")} 起`
//     }
//     if(item.id == "storage256"){
//         selectList = ipadArray.find(x => x.storage == "256GB")
//         total = selectList.price;
//         totalText.innerHTML = `NT$ ${total.toLocaleString("zh-tw")} 起`
//     }




// }

// function calculateTotal(money) {

// }


