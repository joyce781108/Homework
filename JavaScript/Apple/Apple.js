let title = document.getElementById("title")
let nav = document.getElementById("nav");
let appleArray = [];


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
    let selectTitleArray = appleArray.find(x => x.category == selectTitle)
    let div = document.createElement("div");
    div.className = "container";
    let ul = document.createElement("ul");
    div.appendChild(ul)
    nav.appendChild(div)
    selectTitleArray.product.forEach(x => {
        let li = document.createElement("li");
        let i = document.createElement("i");
        let a = document.createElement("a");
        let span = document.createElement("span");
        ul.appendChild(li);
        li.appendChild(a);
        a.href = "#";
        a.appendChild(i);
        if (selectTitleArray.category == "iPad") {
            i.className = "fas fa-tablet-alt";
        }
        if (selectTitleArray.category == "iPhone") {
            i.className = "fas fa-mobile-alt";
        }
        a.appendChild(span);
        span.innerText = x.productID;
    });


    nav.querySelectorAll("a").forEach((x) => {
        x.addEventListener("click", function () {
            nav.style.top = "-100%";
            let selectNav = x.innerText;
            selectList = appleArray.find(y => y.name == selectNav);
            document.querySelector("h2").innerText = `購買 ${selectNav}`
            picData(selectNav);
            colorBtnData(selectList);
            colorBtnClick(selectNav);     
            productDisplay("health-content", "inline");
        });
    });
};
