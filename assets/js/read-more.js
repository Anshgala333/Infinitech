document.querySelector(".read-more").onclick = function () {
    const studentReview = this.parentNode.querySelector(".student-review");
    if (this.innerHTML == "read more") {
        studentReview.style.webkitLineClamp = "unset";
        studentReview.style.lineClamp = "unset";
        this.innerHTML = "read less"
    }

    else {
        studentReview.style.webkitLineClamp = "3";
        studentReview.style.lineClamp = "3";
        this.innerHTML = "read more"

    }
}