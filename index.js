function remove_prospect(the_button){

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