function open_next() {
    const opened_chapter = document.getElementsByClassName("chapter is-open")[0];
    const ul = opened_chapter.getElementsByTagName("ul")[0];
    const list = ul.getElementsByTagName("li");
    let active_li = ul.getElementsByClassName("active")[0];

    let index = 0;
    while (list[index] !== active_li) {
        index++;
    }

    if (index === list.length - 1) {
        console.log("this is the last unit!");
        open_nextChapter();
    } else {
        let next = list[index + 1];
        console.log(typeof active_li);
        console.log(typeof next);
        const nextA = next.getElementsByTagName("a")[0];
        nextA.click();
    }
}

function open_nextChapter() {
    const Navs = document.getElementsByTagName("nav");
    let nav = null;
    for (let i = 0; i < Navs.length; i++) {
        if (Navs[i].getAttribute("aria-label") === "课程导航") {
            nav = Navs[i];
            break;
        }
    }
    const divs = nav.getElementsByTagName("div");

    let index = 0;
    while (divs[index].getAttribute("class") !== "chapter is-open") {
        index++;
    }

    if (index === divs.length - 1) {
        console.log("This is the last chapter!");
    } else {
        const nextChapter = divs[index + 1];
        const nextChapterh3 = nextChapter.getElementsByTagName("h3")[0];
        const nextChapterA = nextChapterh3.getElementsByTagName("a")[0];
        nextChapterA.click();


        const ul = nextChapter.getElementsByTagName("ul")[0];
        const firstLi = ul.getElementsByTagName("li")[0];
        const nextA = firstLi.getElementsByTagName("a")[0];
        nextA.click();
    }
}
failure = 0;
function play_video() {
    let videos = document.getElementsByTagName("video");
    if (!videos.length || videos[0].readyState !== 4) {
        if (window.failure++ > 7) {
            if (confirm("视频播放失败，点击确定进入下一个视频")) {
                open_next();
            }
            return;
        }
        console.log("no video or video not ready.")
        setTimeout(play_video, 1000);
        return;
    }
    let video = videos[0];
    video.play().then(()=>{
        console.log("video is playing.");
    }).catch((e) => {
        console.log("video failed to play.");
        console.log(e);
        setTimeout(play_video, 1000);
        return;
    })
    video.onended = function () {
        console.log("video ended");
        const orderlist = document.getElementById("sequence-list");
        const arr_li = orderlist.getElementsByTagName("li");
        let index = 0;
        while (true) {
            const link = arr_li[index].getElementsByTagName("a")[0];
            if (link.getAttribute("aria-selected")) {
                break;
            }
            index++;
        }
        if (index === arr_li.length - 1) {
            open_next();
        } else {
            const next_link = arr_li[index + 1].getElementsByTagName("a")[0];
            next_link.click();
            setTimeout(play_video, 500);
        }
    }
}

console.log("script started");
play_video();