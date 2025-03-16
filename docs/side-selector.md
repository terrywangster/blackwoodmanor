# Side Selector Component

## Overview
The Side Selector component allows players to choose between Side A and Side B at the beginning of the game. This choice is permanent and cannot be changed once selected.

## Implementation Details
- The component is implemented as a simple UI with two buttons, one for Side A and one for Side B.
- Once a side is selected, the component is hidden and the code entry and image grid components are displayed.
- The selection is stored in the game state and persisted in localStorage to ensure it remains permanent.

## Technical Notes
- The side selection affects which set of codes will be valid for unlocking image pieces.
- Each side has its own set of 6 unique codes that will unlock the corresponding image pieces.
- The component uses CSS transitions for smooth visual feedback when buttons are pressed.

## Usage
1. When the game starts, players are presented with the Side Selection screen.
2. Players must choose either Side A or Side B by tapping/clicking the corresponding button.
3. Once a selection is made, it cannot be changed unless the game is reset by an admin.

## Security Considerations
- The side selection is stored client-side in localStorage, which means it can be manipulated by tech-savvy users.
- For a more secure implementation in a production environment, server-side validation would be recommended. 