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
    id = parseInt(id.slice(-3))
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
    html2canvas(document.querySelector("#container"), {allowTaint: true , y: 0}).then(canvas => {
        var img = document.createElement("img");
        img.src = canvas.toDataURL();
        var download = document.createElement("a");
        download.href = img.src;
        download.id = "downloadLink"
        download.innerText = "Download as Image"
        download.download = "Download.png"
        
        img.id = "savedBoard";
        document.getElementById("modal-content").appendChild(img);
        document.getElementById("modal-content").appendChild(download);
        modal.style.display = "block";
    });
}



function removeImage() {
    document.getElementById("savedBoard").remove();
    document.getElementById("downloadLink").remove();
    modal.style.display = 'none';
}

