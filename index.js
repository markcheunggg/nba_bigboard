var espn_board = ["100", "101", "102", "103", "104", "106", "117", "108",
"110", "105", "120", "119", "109", "113", "114", "118", "111", "128",
"123", "112", "107", "122", "124", "116", "121", "133", "134", "115", "135", "136",
"129", "137", "127", "138", "131", "139", "132", "140", "125", "141", "142", "143",
"144", "145", "146", "126", "147", "148", "149", "150"]

var athletic_board = ["100", "102", "101", "103", "104", "105", "108", "113", "112", "109",
"107", "110", "111", "121", "119", "116", "106", "122", "114", "117", "120", "115",
"123", "148", "125", "143", "135", "118", "126", "127", "124", "139", "130", "151",
"128", "140", "134", "142", "131", "132", "141", "152", "153", "129", "150", "138",
"154", "147", "155", "156"
]


function remove_prospect(the_button) {

    var player = the_button.parentNode
    console.log(the_button)
    var board = player.parentNode

    player.classList.remove("dropped");
    player.classList.add("gridElement");

    player.removeChild(the_button)
    board.removeChild(player)
    

    var prospect_bank = document.getElementById("prospect-bank")
    prospect_bank.appendChild(player)
    player.setAttribute("onclick", "create_modal(this.id, event, this)")

}

function nameSearch(){
    input = document.getElementById("prospect_search").value.toLowerCase();
    var prospects = document.getElementsByClassName("gridElement")
    var bank = document.getElementById("prospect-bank")
    for (var i = 0; i < prospects.length; i++){
        if(prospects.item(i).innerHTML.toLowerCase().toString().includes(input)){
            prospects.item(i).style.display = ""
        } else {
            prospects.item(i).style.display = "none"
        
        }
    }
}
function create_modal(id, event, element) {

    if (event.target != element){
        event.stopPropagation();
        return
    }
    console.log(id)

    id = parseInt(id.slice(-2))
    console.log(id)
    var stats = data[id]
    console.log(stats);
    document.getElementById("name").innerHTML = `${stats.Player}`;
    document.getElementById("team").innerHTML = `${stats.Team}`;
    var img = document.createElement("img");
    img.src = `img/${id+1}.png`;
    img.style = "height: 200px;";
    document.getElementById("name").insertBefore(img, null);
    document.getElementById("stats").innerHTML = 
    `Points Per Game: ${stats.PTS}<br><br>
    Assists Per Game: ${stats.AST}<br><br>
    Rebounds Per Game: ${stats.TRB}<br><br>
    Steals Per game: ${stats.STL}<br><br>
    Blocks Per Game: ${stats.BLK}<br><br>`;
    /*document.getElementById('modal-text').innerHTML = `            
    <h2 style="padding-top:0">Team: ${stats.Team}</h2>
    Points Per Game: ${stats.PTS}<br><br>
    Assists Per Game: ${stats.AST}<br><br>
    Rebounds Per Game: ${stats.TRB}<br><br>
    Steals Per game: ${stats.STL}<br><br>
    Blocks Per Game: ${stats.BLK}<br><br>`;*/
    document.getElementById("mySidebar").style.width = "250px";
    //document.getElementById("bottom-bar").style.marginLeft = "250px";
    // ^ This shifts the bottom box to the left when the sidebar is opened
}    


document.onkeydown = function(evt) {
    /*You can know press "escape" to exit out of sidebar
    */
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        closeNav()
    }
};

function saveImage() {
    //We have to change something about this next line to scale the image properly
    //https://html2canvas.hertzen.com/configuration <-- Documentation
    html2canvas(document.querySelector("#container"), {allowTaint: true , y: 70}).then(canvas => {
        var img = document.createElement("img");
        img.src = canvas.toDataURL();
        var download = document.createElement("a");
        download.href = img.src;
        download.id = "downloadLink"
        download.innerText = "Download as Image"
        download.download = "Download.png"
        
        img.id = "savedBoard";
        img.setAttribute("class", "user_board")
        document.getElementById("modal-content").appendChild(img);
        document.getElementById("modal-content").appendChild(download);
        modal.style.display = "block";
    });
}



function removeImage() {
    var close_button = document.getElementById("close")
    while (document.getElementById("modal-content").firstChild) {
        document.getElementById("modal-content").removeChild(document.getElementById("modal-content").firstChild);
    }
    document.getElementById("modal-content").append(close_button)
    modal.style.display = "none"
}



function board_comp(){
    /*
    This function iterates through the CSS grid and gets the child of each drop zone.
    It then appends the id of each child into an array - which is the order of the user's big board.
    */
    var board_order = []
    for (i =1; i<=30; i++){
        if (document.getElementById(i.toString()).childNodes.length > 1) {
            board_order.push(document.getElementById(i.toString()).childNodes[1].id)      
        } else{
            board_order.push(null)
        }
    }
    console.log(board_order)
    /*
    Calls the compare_espn function to compare the user's board to ESPN's big board.
    */
    espn_mse = compare_media(board_order, espn_board)
    athletic_mse = compare_media(board_order, athletic_board)

    var logo = new Image()
    var results = document.createElement('results');


    if (Math.min(espn_mse, athletic_mse) == espn_mse){
        results.innerHTML = "Your closest media match is:"
        logo.src = "img/espn-logo.png"
    } else if (Math.min(espn_mse, athletic_mse) == athletic_mse){
        results.innerHTML = "Your closest media match is:"
        logo.src = "img/athletic-logo.png"
    }
    logo.setAttribute("class", "media_logo")
    results.setAttribute("class", "results")
    document.getElementById("modal-content").appendChild(results)
    document.getElementById("modal-content").appendChild(logo);
    console.log(modal)
    modal.style.display = "block";


}

function compare_media(user, board){
    /*
    This function returns the mean squared difference between all of the user's
    picks and the picks from the ESPN big board.
    */


    squared_diff = 0
    for (i = 0; i < 30; i++){
        for (j=0; j< board.length;j++){
            if (user[i] == board[j]){
                squared_diff += ((i - j)**2)
                continue;
            }
        }

    }
    var final = (squared_diff / 30)
    return(final)

}
