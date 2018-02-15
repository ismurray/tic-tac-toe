## Tic Tac Toe

Features:
  - Create an account with a unique login and password
  - Two Game Modes: Classic and Numeric Tic Tac Toe
  - Game Stats: See how many games you've played in each game mode, your wins, losses, draws, and your win percentage. (Note: game ID's are not locked in as Classic or Numeric until the first move is played. Until then, they are listed as "Unassigned" in the Game Stats section)
  - Game Retrieval: See a unique ID for every Classic mode game, which can be used to return to that game later
    - When a Classic game is retrieved, see  an update on whether the game is over or not.
    - If over, you can see who won, or whether it was a draw.
      - If unfinished, you can see whose turn it is, and pick up right where you left off!
  - Responsive design: fully functional on desktop and mobile devices

## Rules

Both game modes are played in a local, two-player format, with Player X (the one whose stats are tracked on the account) taking the first turn.

* Classic Tic Tac Toe:
  - Tic-tac-toe is a quick and easy game for two players who take turns marking the spaces in a 3×3 grid.
  - The first player marks their squares with x's, and the second player marks their squares with o's.
  - The player who succeeds in placing three of their marks in a
    horizontal, vertical, or diagonal row wins the game.

* Numeric Tic Tac Toe:
  - The numbers 1 to 10 are used in this game instead of x's and o's.
  - The first player (Player x) plays with the odd numbers, the second player (Player o) plays with the even numbers. All numbers can be used only once.
  - The player who puts down a 3rd number in a line which adds up to 15 wins!



## Development Process

1. Read through Project requirements and API documentation to get a clear idea of project goals, and provide a framework for creating a UI and modeling the game engine
2. Create wire frames (see below)
3. Write initial game engine to model a classic tic tac toe game. Runnable in the console.
  * Data structure: Each game is an object containing an array of 9 empty strings (to represent the game board), and a few key value pairs to store things like game state (over or not), the current player whose turn it is, a list of win conditions, and a unique ID number. This was modeled to be a similar format to the one used by the API.
4. Write User stories (see below) to help guide the development process and keep attention focused on one discreet feature at a time.
5. Create initial site UI, with 3 discreet views: Login page, Account Page, and Game page
  * Login page: Sign up form, sign in form
  * Account Page: Signout form
  * Game page: Visual tic tac toe board
6. Tie Game Board UI to internal game engine
  * Use jQuery to make click handlers, and to write to the game board
  * Create UI messages for feedback on successful/unsuccessful user actions
7. Create account authentication API interactions: sign in, sign up, sign out, change password
  * Test API with curl requests
  * Tie UI forms to ajax requests, follow up with user feedback via displayed messages
8. Create game API requests: create new game, retrieve all stored games, update game after every move and upon endgame state

With all Project requirements met, I began adding a number of bonus features:

1. Add functionality to retrieve a finished/unfinished game by ID
  * Establish method to retrieve the unique game data from the API
  * Write functions in the game engine to store the game locally and determine whether it was finished or not
  * If not, determine whose turn it is, and display it to the UI in a playable state
  * If finished, parse the game board data to determine which player won, or if it was a draw, and display the results in the UI
2. Create game stats section, and write functions in the game engine to parse an array of every game board retrieved from the API to determine a number of stats: total games, finished games, unfinished games, wins, losses, draws, and win percentage
  * Add button to refresh the data from the server and update the display of these stats
3. Improve visual design
  * Move most account actions to a navbar, freeing up space to consolidate the game and account page views
  * Move Sign in/up forms to modals to clean up landing page
  * Make board larger
  * Add colors, resize elements, smooth out overall design
  * Ensure all visual elements scale between a range of screen sizes and mobile devices
4. Create new game mode: Numeric Tic Tac toe
    *This process was similar to the development of the classic game mode:
    1. Internal game engine
    2. Visual UI
    3. Tie UI to internal logic
    4. Tie UI and internal logic to the API
5. Add stat tracking for numeric model
6. Add more visual fine touches to make the design less clunky and continue finding and patching bugs



## Wire Frames
Initial Wire frames: https://i.imgur.com/Co6KU1L.jpg

## User Stories
Below are some of the initial user stories I made during the planning stage:
1.  [Auth] As a user, I should be able to create an account
2.	[Auth] As a user, I should be able to login to my account
3.	[Auth] As a user, I should be able to change my password
4.	[Auth] As a user, I should be able to sign out of my account
5.	[Game UI] As a user, I should be able to click a button to start a new game
6.	[Game UI] As a user, I should be able to see a visual representation of a tic tac toe board
7.	[Game UI] As a user, I should be able to click a spot on the board to make my play
8.	[Game UI] As a user, I shouldn’t be able to make a play on an invalid spot
9.	[Game UI] As a user, I should be able to see what spots have already been played on, and by which user
10.	[Game UI] As a user, I should be able to see a visual telling me whose turn it is
11.	[Game UI] As a user, I should be able to see a visual telling me when the game ends
12.	[Game UI] As a user, I should be able to see whether I won, lost or drew a game
13.	[Game UI] As a user, I should be able to click a button to start a new game after a game ends
14.	[GAME API] As a user, I should be able to have my games saved to my account
15.	[GAME API] As a user, I should be able to retrieve games I have started/finished too see where I left off


## Technologies Used
* JavaScript
* jQUERY
* HTML5
* CSS3
* Bootstrap
* SASS
* GIT/GITHUB
* Atom
* Webpack


## Future Iterations

In future iterations I'd like to implement:
 * Numeric Mode: Retrieve game by ID
 * New Game Mode: Notakto
 * New Game Mode: MEGA TTT
 * Cross-device multiplayer
 * Single Player Mode: play against a computer AI
