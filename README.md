
In frontend directory, you can run:

### `yarn start`

In backend directory, you can run:

### `yarn dev`

**DEPENDING ON THE SCREEN YOU ARE USING, PLEASE CHECK AT THE BOTTOM OF THE SCREEN FOR THE BUTTONS AND CHIPS YOU CAN CLICK**

**I AM USING A MAC 13INCH AND I FOUND IT BEST IF I SPLIT THE SCREEN WITH TWO SEPERATE WINDOWS, THAT WAY EVERYTHING IS VISIBLE. I AM VERY BAD WITH CSS AND DESIGNING SORRY HAHAHA**

**FIRST PLAYER TO JOIN THE ROOM WILL BE THE DEALER, SECOND WILL BE THE PLAYER, PLAYER OF COURSE WILL HAVE TO START BY CHOOSING HIS BET WITH CHIPS AND THEN CLICK PLACE BET AND PROCEED BY HITTING OR STAYING IF THERE IS NO BLACKJACK ALREADY**

**I SET THE MAX OF THE BET TO 1000 SO A PLAYER CAN ONLY BET TO 1000**

**I USED USECONTEXT IN REACT BECAUSE I READ ON THE INTERNET THAT ITS BETTER TO USE IT WHEN DEALING WITH SOCKETS**

**I have included 'HIT', 'STAY' and 'DOUBLE' but for the simplicity of the project i didnt add 'SPLIT'**
, I decided to use typescript so everything is typed and i dont run into any undefined types problems, I also used socket.io for the sockets
and express for the server, I have taken the design from a public project online, i just changed some things in it to look better,
at the end its a simple emitting and recieving of events from the client to server and vice versa, it was very interesting learning about sockets in this short time
and it got messy sometimes at the start since i wasnt able to fully grasp whats going on but everything is fine now hahaha.

Also in the case of a Tie i just assigned the dealer as a winner by default because i am not handling the case to restart a game and such things.



