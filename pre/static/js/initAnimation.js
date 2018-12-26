function start() {
    let errorNum = "001";
    let errorCmaera = cameraArray.filter(function (camera) {
        return camera.name === "camera"+errorNum
    });
    errorCmaera[0].material.color = new THREE.Color(0xff0000)

    let errorBall = ballArray.filter(function (ball) {
        return ball.name === "ball" +errorNum
    })
    errorBall[0].material.color = new THREE.Color(0xff0000);

    let tip = document.querySelector("#warningInfo");
    tip.style.opacity = 1;
    let ps = document.querySelectorAll("#warningInfo>p")

    ps.forEach((p,index)=>{
        p.style.transition = `all 1s ${index+2}s`
        p.style.transform = "translate3d(0,0,0)"
    })

    let video = document.querySelector("#liveVideo");
    video.style.trans
    video.style.opacity = 1;

}

setTimeout(function () {
    start();
},5000)