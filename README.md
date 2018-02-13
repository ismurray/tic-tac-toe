## Tic Tac Toe

Features:
  - Create and account with a unique login and password
  - Two Game Modes: Classic and Numerical Tic Tac Toe
  - See how many games you've played in each game mode, your wins, losses, draws, and your win percentage. (Note: game ID's are not locked in as Classic or Numerical until the first move is played. Until then, they are listed as "Unassigned" in the Game Stats section)
  - See a unique ID for every Classic mode game, which can be used to return to that game later
  - When a Classic game is retrieved, see  an update on whether the game is over or not.
    - If over, you can see who won, or whether it was a draw.
      - If unfinished, you can see whose turn it is, and pick up right where you left off!

## Rules

Both game modes are played in a local, two-player format, with Player X (the one whose stats are tracked on the account) taking the first turn.

* Classic Tic Tac Toe:
  - Tic-tac-toe is a quick and easy game for two players who take turns marking the spaces in a 3×3 grid.
  - The first player marks their squares with x's, and the second player marks their squares with o's.
  - The player who succeeds in placing three of their marks in a
    horizontal, vertical, or diagonal row wins the game.

* Numerical Tic Tac Toe:
  - The numbers 1 to 10 are used in this game instead of x's and o's.
  - The first player (Player x) plays with the odd numbers, the second player (Player o) plays with the even numbers. All numbers can be used only once.
  - The player who puts down a 3rd number in a line which adds up to 15 wins!






## Development Process


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
14.	[GAME API] I should be able to have my games saved to my account
15.	[GAME API] I should be able to retrieve games I have started/finished too see where I left off


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
