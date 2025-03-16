# Image Grid Component

## Overview
The Image Grid component displays a 6-piece puzzle that gradually reveals the location of the hidden key as players enter correct codes. Initially, all pieces are hidden and marked with question marks.

## Implementation Details
- The grid consists of 6 individual pieces arranged in a responsive grid layout.
- Each piece has a locked state (showing a question mark) and an unlocked state (showing part of the image).
- The grid adapts its layout based on screen size and orientation for optimal viewing.
- On mobile devices, the default layout is 2 columns by 3 rows, while on larger screens it switches to 3 columns by 2 rows.

## Technical Notes
- The component uses CSS Grid for layout, with responsive adjustments via media queries.
- Each grid item has a 1:1 aspect ratio to maintain consistent proportions.
- Images are stored as base64-encoded data URLs in the game state.
- The grid updates dynamically when new pieces are unlocked without requiring a page refresh.

## Image Processing
- When an admin uploads an image, it's automatically divided into 6 equal pieces.
- The division algorithm adapts to the image's aspect ratio:
  - For landscape images: 3 columns × 2 rows
  - For portrait images: 2 columns × 3 rows
- Each piece is stored separately in the game state and revealed individually as codes are entered.

## Usage
1. The Image Grid is displayed after a side is selected, though all pieces are initially locked.
2. As players enter correct codes, corresponding pieces are revealed.
3. When all 6 pieces are revealed, players can see the complete image showing where the key is hidden.

## iOS Optimization
- The grid uses hardware-accelerated animations for smooth performance on iOS devices.
- Touch interactions are optimized for mobile use with appropriate hit areas. 