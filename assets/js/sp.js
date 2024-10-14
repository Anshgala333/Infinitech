const wrapper = document.querySelector('.wrapper');
const frameRate = 2;
const minScale = .3;
const maxScale = 1.1;
const scaleRange = maxScale - minScale;
let lastFrame;
console.log(window.innerWidth, "width");
document.querySelector("button").onclick = function () {
    console.log(window.innerWidth, "width");
}
document.querySelector(".wrapper").innerHTML = ""
for (let i = 0; i < 33; i++) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg"
    div.appendChild(img);
    div.classList.add('item');
    document.querySelector('.wrapper').appendChild(div);
}

var display = document.querySelector(".display")
var allitem = document.querySelectorAll(".item")




allitem.forEach(function (e) {
    e.addEventListener("click", function (e) {
        
        var x = e.clientX - document.querySelector(".box").getBoundingClientRect().left
        var y = e.clientY - document.querySelector(".box").getBoundingClientRect().top
        console.log(x,y);
      

        if (window.innerWidth < 600) {
            if (e.clientX > 220) {
                console.log("hi");
                display.style.left = x - 150 + "px"
                display.style.top = y + "px"
                display.style.scale = 1
            }
            else {
                display.style.left = x + "px"
                display.style.top = y + "px"
                display.style.scale = 1
            }

        }
        else {
            display.style.left = x + "px"
            display.style.top = y + "px"
            display.style.scale = 1
        }



    })
    e.addEventListener("mousemove", function (e) {
        display.style.scale = 0

    })

})



// this helper function stolen from a hero on stackoverflow
function dynamicSort(property) {

    let sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    }
}
document.querySelector(".wrapper").scrollTo(0, 250)


function animateChildren(parent, origin) {

    const children = Array.from(parent.children);
    const childrenWithDistances = [];

    children.map(child => {

        const r = child.getBoundingClientRect();
        const childX = r.right - (r.width / 2);
        const childY = r.bottom - (r.height / 2);
        const distanceY = Math.max(origin.y, childY) - Math.min(origin.y, childY);
        const distanceX = Math.max(origin.x, childX) - Math.min(origin.x, childX);
        const hypot = Math.hypot(distanceX, distanceY);

        child.distance = Math.round(hypot);
        childrenWithDistances.push(child);

    })

    childrenWithDistances.sort(dynamicSort('distance')).reverse();

    childrenWithDistances.map((child, index) => {

        const relativeAmt = (index / children.length) * scaleRange;
        child.style.setProperty('--scale', minScale + relativeAmt);

    });
}


document.addEventListener('mousemove', function (e) {
    // console.log(e);

    requestAnimationFrame(function (thisFrame) {

        if (thisFrame - lastFrame > frameRate) {

            const screenCenter = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            }
            const moveX = e.x - screenCenter.x;
            const moveY = e.y - screenCenter.y;

            wrapper.style.setProperty('--x', moveX / 10 + '%');
            wrapper.style.setProperty('--y', moveY / 10 + '%');

            animateChildren(wrapper, e);
        }

        lastFrame = thisFrame;

    })
})
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
    console.log(e);
    display.style.scale = 0
    requestAnimationFrame(function (thisFrame) {
        if (thisFrame - lastFrame > frameRate) {
            const screenCenter = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            };
            const moveX = e.changedTouches[0].clientX - screenCenter.x;
            const moveY = e.changedTouches[0].clientY - screenCenter.y;
            wrapper.style.setProperty('--x', moveX / 10 + '%');
            wrapper.style.setProperty('--y', moveY / 10 + '%');
            animateChildren(wrapper, {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
            });
        }
        lastFrame = thisFrame;
    });
});

document.body.addEventListener('scroll', function (e) {

    const screenCenter = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    }

    animateChildren(wrapper, screenCenter);

})

