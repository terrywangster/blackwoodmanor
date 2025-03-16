# Escape Room Companion App

A web-based companion app optimized for iOS devices to enhance escape room experiences. This app allows game masters to upload an image of a hidden key location, which players must gradually reveal by entering codes they discover during the escape room activity.

## Features

- **Side Selection**: Players choose between Side A and Side B at the start, which determines their code set.
- **Code Entry**: A 3-character input field with validation for unlocking image pieces.
- **Progressive Reveal**: A 6-piece image grid that gradually reveals the hidden key location.
- **Admin Panel**: Tools for game masters to upload and process images, and reset the game.
- **iOS Optimized**: Designed specifically for iOS devices with appropriate meta tags and styling.
- **Offline Capable**: Works entirely client-side with no server requirements.
- **Responsive Design**: Adapts to different screen sizes and orientations.

## How to Use

### For Game Masters

1. Open the app in a web browser on your iOS device.
2. Tap the gear icon (⚙️) in the bottom-right corner to access the admin panel.
3. Upload an image showing where the key is hidden by taking a photo or selecting a file.
4. Click "Process Image" to split the image into puzzle pieces.
5. Exit admin mode by clicking "Exit Admin Mode".
6. Distribute the codes to players through your escape room puzzles.

### For Players

1. Open the app URL provided by the game master.
2. Select either Side A or Side B as instructed.
3. As you discover 3-character codes during the escape room activity, enter them in the code input field.
4. Click "UNLOCK" to reveal pieces of the hidden image.
5. Once all pieces are revealed, you'll see the complete image showing where the key is hidden.

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript.
- Uses the Canvas API for image processing.
- Stores game state in localStorage for persistence.
- Optimized for iOS Safari with appropriate meta tags and styling.

## Customization

Game masters can customize the valid codes by editing the `codes` object in the `app.js` file:

```javascript
codes: {
    sideA: ['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQR'],
    sideB: ['123', '456', '789', '012', '345', '678']
}
```

## Deployment

This app can be deployed to any static web hosting service:

1. Upload all files to your web hosting service.
2. Access the app via the provided URL.
3. For best results, consider adding it to the iOS home screen as a web app.

## License

This project is available for free use in escape room activities. Commercial use requires permission. 