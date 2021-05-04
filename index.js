function remove_prospect(the_button) {

    player = the_button.parentNode
    console.log(the_button)
    board = player.parentNode

    player.classList.remove("dropped");
    player.classList.add("gridElement");

    player.removeChild(the_button)
    board.removeChild(player)

    var prospect_bank = document.getElementById("prospect-bank")
    prospect_bank.appendChild(player)




}
function create_modal(id) {
    var stats = data[id]
    console.log(stats);
    // This basically just fills the box with the information we want to show for each player.
    document.getElementById('modal-text').innerHTML = `            
    <img src='img/${id+1}.png' style="float: right; height: 200px;" >
    <h1>${stats.Player}</h1>
    <h2 style="padding-top:0">Team: ${stats.Team}</h2>
    Points Per Game: ${stats.PTS}<br><br>
    Assists Per Game: ${stats.AST}<br><br>
    Rebounds Per Game: ${stats.TRB}<br><br>
    Steals Per game: ${stats.STL}<br><br>
    Blocks Per Game: ${stats.BLK}<br><br>`;

    modal.style.display = "block";
}

function display_image(canvas) {
    console.log(canvas);
    document.getElementById('modal-content').appendChild(canvas);



    picModal.style.display = "block";
}
