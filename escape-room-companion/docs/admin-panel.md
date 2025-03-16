# Admin Panel Component

## Overview
The Admin Panel component provides game masters with tools to set up and manage the escape room companion app. It allows uploading and processing images, resetting the game state, and toggling between admin and player views.

## Implementation Details
- The admin panel is hidden by default and can be accessed via a small gear icon in the corner of the screen.
- It includes an image upload interface that allows taking a photo or selecting an image file.
- The uploaded image is automatically processed and divided into 6 pieces for the puzzle.
- The panel includes controls to reset the game state and exit admin mode.

## Technical Notes
- The admin access is intentionally subtle but accessible, using a small gear icon positioned in the corner.
- Image processing is done client-side using the Canvas API to split the image into pieces.
- The panel uses localStorage to persist game state, including the processed image pieces.
- The image upload component is optimized for mobile devices with the `capture="camera"` attribute to allow direct camera access on supported devices.

## Security Considerations
- The admin panel has no password protection in this implementation, as it's designed for casual use.
- For more secure implementations, proper authentication would be recommended.
- All data is stored client-side, making it suitable for offline use but potentially vulnerable to tampering.

## Usage
1. Access the admin panel by clicking the gear icon in the corner of the screen.
2. Upload an image of where the key is hidden by taking a photo or selecting a file.
3. Process the image to split it into puzzle pieces.
4. Exit admin mode to return to the player view.
5. If needed, use the reset button to clear all game progress and start fresh.

## Image Processing Details
- The uploaded image is automatically analyzed to determine its orientation.
- Based on the aspect ratio, the image is divided into either a 3×2 grid (landscape) or a 2×3 grid (portrait).
- Each piece is stored as a base64-encoded data URL in the game state.
- The processing happens entirely in the browser with no server uploads required. 