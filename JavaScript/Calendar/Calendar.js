let previous = document.getElementById("previous")
let next = document.getElementById("next")
let yearMonth = document.getElementById("year-month")
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let _allDates = [];
let allWeek = [
    {weeken:"sun",weekcn:"日",value:0},
    {weeken:"mon",weekcn:"一",value:1},
    {weeken:"tue",weekcn:"二",value:2},
    {weeken:"wed",weekcn:"三",value:3},
    {weeken:"thu",weekcn:"四",value:4},
    {weeken:"fri",weekcn:"五",value:5},
    {weeken:"sat",weekcn:"六",value:6}
];

window.onload = function () {
    yearMonth.innerText = `${year}年${month}月`
    
};

function generateDaysOfWeek() { 
    let firstDate = new Date();
    firstDate.setDate(0);
    firstDate.setDate(firstDate.getDate() + 1);

    for (var weekIndex = 0; weekIndex < 6; weekIndex++) {

        for (var week = firstDate.getDay(); week < 7; week++) {

            console.log(`week ${week}, getDate${firstDate.getDate()}`);
            firstDate.setDate(firstDate.getDate() + 1);
            if (firstDate.getDate() == 1) {
                return;
            }
        }
    }
}

function allDates(){
    generateDaysOfWeek();
    console.log('@@');



    // date.setDate(date.getDate() + days);
    // firstDate.getDate();
    // firstDate = firstDate.getDay();
    // debugger
    // let i = 0;
    // allWeek.forEach((x) => {
    //     if(x.value == firstDate){
    //         console.log(x[i+1].weekcn)
    //     }
    //     else{
    //         i++;
    //     }
    //     return;

    // });  
};



previous.addEventListener("click", function () {
    allDates()
    

});