// creaing music this all things should come from backend and databases proably 
const MockingBird = new Audio("./audio/mockingbird.mp3")
MockingBird.name = "Mockingbird"
const oldTownRoad = new Audio("./audio/oldTownRoad.mp3")
oldTownRoad.name = "oldTownRoad"
const RilesPeaseats = new Audio("./audio/RilesPeaseats.mp3")
RilesPeaseats.name = "RilesPeaseats"
const NaBhulu = new Audio("./audio/NaBhulu.mp3")
NaBhulu.name = "NaBhulu"
const playlist1 = [MockingBird, oldTownRoad, RilesPeaseats]
const playlist2 = [oldTownRoad, MockingBird, NaBhulu,]
const userPlaylist = [playlist1, playlist2]


// this variable hold the value of previous selected index by user so we can keep track of songs and reset button
let PreviousIndex = -1;

// this array contains selected user playlist updated via LoadPlaylist function
let selectedPlaylist;


// this fucntion loads the playlist as user has selected and updates selectedPlaylist array 
function LoadPlaylist(inde) {

    // obatining the area and clering it so any previos songs will be cleared 
    let play_area = document.getElementById("play-list-songs")
    play_area.innerHTML = ""

    // this will stop any previous music playing while chaning the playlist
    if (PreviousIndex >= 0) {
        let previosMusic = selectedPlaylist[PreviousIndex - 1]
        previosMusic.pause()
        previosMusic.currentTime = 0;
    }

    // fixing a bug
    // whenever we switch to another playlist our playbar play pause icon shoud reset to
    if (document.getElementById(`play-btn`).classList.contains('hidden')){
        document.getElementById(`play-btn`).classList.toggle('hidden');
        document.getElementById(`pause-btn`).classList.toggle('hidden');
    }


    // if play list is changed we need to reset previous song to nothing
    PreviousIndex = -1;

    // this index defines the index of user selected playlist
    let index = parseInt(inde)

    // since we are opeating an array and our playlist starts from 1 fo matching the we made it -1 
    selectedPlaylist = userPlaylist[index - 1]

    // this i is important beacuse it gives idex o the songs displayed s we can further acess the , it may be replace via music id from the database 
    let i = 1;

    // since user has selected the the playslist we need to loop through playlist songs and show them in the cleared section 
    selectedPlaylist.forEach(Song => {

        // creating and appending a div to that section css is written before hand
        let div = document.createElement("div")
        div.innerHTML = `<div class="songs flex row" onclick="playPauseToggle(${i})">
            <div class="music-logo flex align-center justify-center">
              <img src="./assets/music.svg" alt="">
            </div>
            <div class="music-name flex align-center" id="music-name ">
              <h3>${Song.name} </h3>
            </div>
            <div class="play-btn flex justify-center align-center" id="play-pause-conatiner">
              <img src="./assets/play.svg" alt="" srcset="" class="" id="play-btn${i}">
              <img src="./assets/pause.svg" class="hidden" alt="" srcset="" id="pause-btn${i}">
            </div>
          </div>`
        let play_area = document.getElementById("play-list-songs")
        play_area.appendChild(div)
        i += 1;
    });
}



// this functions plays the music toggles the play button according to that , there are bugs somewhere
function playPauseToggle(index) {
    let Mindex = parseInt(index)
    let Musicindex = Mindex - 1
    let music = selectedPlaylist[Musicindex]
    if (index) {
        document.getElementById(`play-btn${index}`).classList.toggle('hidden');
        document.getElementById(`pause-btn${index}`).classList.toggle('hidden');
        if (document.getElementById(`play-btn${index}`).classList.contains('hidden')) {
            music.play()
            document.getElementById("playbar-songname").innerHTML=`${music.name}`
            if (PreviousIndex == index) {
                null
            } else {
                if (PreviousIndex >= 0) {
                    let previosMusic = selectedPlaylist[PreviousIndex - 1]
                    previosMusic.pause()
                    previosMusic.currentTime = 0;
                }
            }
        }
        else {
            music.pause()
        }
        document.getElementById(`play-btn`).classList.toggle('hidden');
        document.getElementById(`pause-btn`).classList.toggle('hidden');
    }
    else {
        document.getElementById(`play-btn`).classList.toggle('hidden');
        document.getElementById(`pause-btn`).classList.toggle('hidden');
        document.getElementById(`play-btn${PreviousIndex}`).classList.toggle('hidden');
        document.getElementById(`pause-btn${PreviousIndex}`).classList.toggle('hidden');
        if (document.getElementById(`pause-btn`).classList.contains('hidden')) {
            if (PreviousIndex >= 0) {
                let previosMusic = selectedPlaylist[PreviousIndex - 1]
                previosMusic.pause()
                previosMusic.currentTime = 0;
            }
        }
        else {
            if (PreviousIndex >= 0) {
                let previosMusic = selectedPlaylist[PreviousIndex - 1]
                previosMusic.play()
                // previosMusic.currentTime = 0;
            }
        }
    }
    if (index) {
        if (index == PreviousIndex) {
            null
        }
        else {
            if (PreviousIndex > 0) {
                if (document.getElementById(`play-btn${PreviousIndex}`).classList.contains('hidden')) {
                    document.getElementById(`play-btn${PreviousIndex}`).classList.toggle('hidden');
                    document.getElementById(`pause-btn${PreviousIndex}`).classList.toggle('hidden');
                }
            }
        }
    }
    if (index) {
        PreviousIndex = index
    }
    console.log(PreviousIndex)
    // playMusic(index);
}


// this functions plays the next song
function PlayNextSong(){
    let nextSongIndex = PreviousIndex+1;
    console.log(nextSongIndex)
    playPauseToggle(nextSongIndex);

}
// this functions plays teh previous songs when called()
function PlayPreviousSong(){
    playPauseToggle(PreviousIndex-1);
}

// This opens the side bar for mobile phone
function SideBarOpen() {
    console.log("Opening sidebar...");
    const ele = document.querySelector(".right");
    ele.classList.add("show"); // Add the 'show' class to slide it down
}
// this functions closes the side bar
function SidebarClose() {
    console.log("Closing sidebar...");
    const ele = document.querySelector(".right");
    ele.classList.remove("show"); // Remove the 'show' class to slide it up
}

// lodaing the playlist fro once 
LoadPlaylist(1);