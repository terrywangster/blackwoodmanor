document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const adminPanel = document.getElementById('adminPanel');
    const playerView = document.getElementById('playerView');
    const sideSelection = document.getElementById('sideSelection');
    const codeEntry = document.getElementById('codeEntry');
    const imageGrid = document.getElementById('imageGrid');
    const adminAccess = document.getElementById('adminAccess');
    const toggleAdmin = document.getElementById('toggleAdmin');
    const resetGame = document.getElementById('resetGame');
    const sideA = document.getElementById('sideA');
    const sideB = document.getElementById('sideB');
    const codeInput = document.getElementById('codeInput');
    const unlockButton = document.getElementById('unlockButton');
    const imageUpload = document.getElementById('imageUpload');
    const processImage = document.getElementById('processImage');
    
    // Game state
    let gameState = {
        isAdmin: false,
        selectedSide: null,
        unlockedPieces: [],
        imagePieces: [],
        codes: {
            sideA: ['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQR'],
            sideB: ['123', '456', '789', '012', '345', '678']
        }
    };
    
    // Load game state from localStorage if available
    loadGameState();
    
    // Initialize UI based on game state
    initializeUI();
    
    // Event Listeners
    adminAccess.addEventListener('click', toggleAdminMode);
    toggleAdmin.addEventListener('click', toggleAdminMode);
    resetGame.addEventListener('click', resetGameState);
    sideA.addEventListener('click', () => selectSide('A'));
    sideB.addEventListener('click', () => selectSide('B'));
    unlockButton.addEventListener('click', checkCode);
    processImage.addEventListener('click', processUploadedImage);
    
    // Make code input uppercase and limit to 3 characters
    codeInput.addEventListener('input', () => {
        codeInput.value = codeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 3);
    });
    
    // Functions
    function toggleAdminMode() {
        gameState.isAdmin = !gameState.isAdmin;
        adminPanel.classList.toggle('hidden', !gameState.isAdmin);
        playerView.classList.toggle('hidden', gameState.isAdmin);
        saveGameState();
    }
    
    function resetGameState() {
        if (confirm('Are you sure you want to reset the game? This will clear all progress.')) {
            gameState = {
                isAdmin: true,
                selectedSide: null,
                unlockedPieces: [],
                imagePieces: [],
                codes: {
                    sideA: ['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQR'],
                    sideB: ['123', '456', '789', '012', '345', '678']
                }
            };
            saveGameState();
            initializeUI();
        }
    }
    
    function selectSide(side) {
        if (gameState.selectedSide !== null) {
            alert('You have already selected a side!');
            return;
        }
        
        gameState.selectedSide = side;
        sideSelection.classList.add('hidden');
        codeEntry.classList.remove('hidden');
        imageGrid.classList.remove('hidden');
        saveGameState();
    }
    
    function checkCode() {
        if (gameState.selectedSide === null) {
            alert('Please select a side first!');
            return;
        }
        
        const code = codeInput.value.toUpperCase();
        if (code.length !== 3) {
            alert('Please enter a 3-character code.');
            return;
        }
        
        const validCodes = gameState.codes[`side${gameState.selectedSide}`];
        const pieceIndex = validCodes.indexOf(code);
        
        if (pieceIndex !== -1 && !gameState.unlockedPieces.includes(pieceIndex)) {
            unlockPiece(pieceIndex);
            codeInput.value = '';
        } else if (gameState.unlockedPieces.includes(pieceIndex)) {
            alert('You have already unlocked this piece!');
            codeInput.value = '';
        } else {
            alert('Invalid code. Try again!');
        }
    }
    
    function unlockPiece(pieceIndex) {
        gameState.unlockedPieces.push(pieceIndex);
        updateImageGrid();
        saveGameState();
        
        if (gameState.unlockedPieces.length === 6) {
            setTimeout(() => {
                alert('Congratulations! You have unlocked all pieces!');
            }, 500);
        }
    }
    
    function updateImageGrid() {
        for (let i = 0; i < 6; i++) {
            const piece = document.getElementById(`piece${i+1}`);
            const lockedOverlay = piece.querySelector('.locked-overlay');
            
            if (gameState.unlockedPieces.includes(i) && gameState.imagePieces[i]) {
                // Show the image piece
                if (!piece.querySelector('img')) {
                    const img = document.createElement('img');
                    img.src = gameState.imagePieces[i];
                    piece.appendChild(img);
                }
                lockedOverlay.style.display = 'none';
            } else {
                // Show locked state
                if (piece.querySelector('img')) {
                    piece.querySelector('img').remove();
                }
                lockedOverlay.style.display = 'flex';
            }
        }
    }
    
    function processUploadedImage() {
        const file = imageUpload.files[0];
        if (!file) {
            alert('Please select an image first.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                // Split the image into 6 pieces
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Determine grid layout based on image aspect ratio
                let cols = 3;
                let rows = 2;
                
                if (img.width < img.height) {
                    cols = 2;
                    rows = 3;
                }
                
                const pieceWidth = img.width / cols;
                const pieceHeight = img.height / rows;
                
                gameState.imagePieces = [];
                
                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        canvas.width = pieceWidth;
                        canvas.height = pieceHeight;
                        ctx.drawImage(
                            img,
                            col * pieceWidth, row * pieceHeight,
                            pieceWidth, pieceHeight,
                            0, 0,
                            pieceWidth, pieceHeight
                        );
                        
                        gameState.imagePieces.push(canvas.toDataURL());
                    }
                }
                
                saveGameState();
                updateImageGrid();
                alert('Image processed successfully!');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    function saveGameState() {
        localStorage.setItem('escapeRoomGameState', JSON.stringify(gameState));
    }
    
    function loadGameState() {
        const savedState = localStorage.getItem('escapeRoomGameState');
        if (savedState) {
            gameState = JSON.parse(savedState);
        }
    }
    
    function initializeUI() {
        // Set up admin/player view
        adminPanel.classList.toggle('hidden', !gameState.isAdmin);
        playerView.classList.toggle('hidden', gameState.isAdmin);
        
        // Set up player view based on game state
        if (gameState.selectedSide === null) {
            sideSelection.classList.remove('hidden');
            codeEntry.classList.add('hidden');
            imageGrid.classList.add('hidden');
        } else {
            sideSelection.classList.add('hidden');
            codeEntry.classList.remove('hidden');
            imageGrid.classList.remove('hidden');
        }
        
        // Update image grid
        updateImageGrid();
    }
}); 