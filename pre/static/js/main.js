function getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let moon = date.getMonth()+1;
    let day = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    date = add0(date);
    year = add0(year);
    moon = add0(moon);
    day = add0(day);
    h = add0(h);
    m = add0(m);
    s = add0(s);

    document.querySelector('header .right .time').innerHTML = `${h}:${m}:${s}`;
    document.querySelector('header .right .date').innerHTML = `${year}年${moon}月${day}日`;
}

function add0(v){
    if(v<10){
        return "0"+v
    }
    else{
        return v+""
    }
}

setInterval(function () {
    getDate()
},1000)