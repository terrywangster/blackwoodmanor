# Code Entry Component

## Overview
The Code Entry component allows players to input 3-character codes to unlock pieces of the hidden image. It consists of a text input field limited to 3 characters and an UNLOCK button.

## Implementation Details
- The input field automatically converts all input to uppercase and filters out non-alphanumeric characters.
- The component validates the entered code against the set of valid codes for the player's selected side.
- When a valid code is entered, the corresponding image piece is revealed in the image grid.
- Each code can only be used once to unlock a specific piece.

## Technical Notes
- The input is restricted to 3 characters using both HTML `maxlength` attribute and JavaScript validation.
- Input is automatically formatted to uppercase using JavaScript event listeners.
- The component includes validation to prevent duplicate code entries.
- Valid codes are stored in the game state object and are different for Side A and Side B.

## Usage
1. After selecting a side, players are presented with the Code Entry component.
2. Players enter a 3-character code they've discovered during the escape room activity.
3. Upon clicking the UNLOCK button, the code is validated:
   - If valid and not previously used, a new image piece is revealed.
   - If valid but already used, a message informs the player.
   - If invalid, an error message is displayed.

## iOS Optimization
- The input field is sized appropriately to prevent iOS from zooming in when focused.
- The component uses iOS-friendly styling with appropriate touch targets for better mobile usability. 