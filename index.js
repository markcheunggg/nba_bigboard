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
function create_modal(id) {
    var stats = data[id]
    console.log(stats);
    document.getElementById("name").innerHTML = `${stats.Player}`;
    document.getElementById("team").innerHTML = `${stats.Team}`;
    var img = document.createElement("img");
    img.src = `img/${id+1}.png`;
    img.style = "float: right; height: 200px;";
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