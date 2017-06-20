## Lab-Steve Lab-03 Documentation
  * This project creates a simple TCP chat room using Node leveraging the 'net' module.  Any number of users can connect to the chat room and communicate with one another.  The Node 'net' module allows a developer to create any kind of TCP server and, in this case, handle simple user input (encoded as ASCII) and output based on the data received.  The simplest method to connect to the chat server is telnet, built in to most operating systems in some form.  Although, many other similar TCP clients exist.  The server can respond to the following user "wack" commands by parsing the text at the beginning of a line of text sent by a user.  The server has some basic error handling logic to inform the user of syntax errors and prevent the server from crashing when unexpected syntax or arguments (or lack thereof) are sent by the user.
    * /nick - allows a user to change display name in the format '/nick [desired-name]', for instance '/nick steve'.  The server recognizes the '/nick ' and takes the remainder of the line as an argument representing the desired nickname.
    * /dm - allows a user to 'direct message' another user in the format '/dm [username] [message of any length]', for instance '/dm steve hello, steve! Sup?', where, similar to above, the first space-separated argument is the user to direct message and any any subsequent words are the body of the message.
    * /troll - allows a user to send the same message 'n' number of times in the format '/troll [n] [message of any length]', for instance '/troll 10 I'm trolling you.', where n=10 and the message is 'I'm trolling you.'
    * /quit - allows a user to trigger the server to end their connection.  It takes no arguments.
  * The following are basic instructions:
    * Start the server:
      * Requirements: Node is installed and navigated to the working directory of the chat room application.
      * Instructions: 'npm run start'
    * Connect to the server:
      * Requirements: A client, such as telnet, is installed and the IP or hostname of the server is known.
      * Instructions: 'telnet 127.0.0.1 3000'
  * Tests:
    * esLint: 'npm run lint'
    * Mocha: There are no tests currently established.
