class AudioController {
  constructor() {
    this.bgMusic = new Audio("audio/elevator-music.mp3")
    this.victorySound = new Audio("audio/victory.mp3")
    this.gameOverSound = new Audio("audio/gameover.mp3")
    this.bgMusic.volume = 0.1
    this.bgMusic.loop = false
  }
  startMusic() {
    this.bgMusic.play()
  }
  stopMusic() {
    this.bgMusic.pause()
    this.bgMusic.currentTime = 0
  }
  victory() {
    this.stopMusic()
    this.victorySound.play()
  }
  gameOver() {
    this.stopMusic()
    this.gameOverSound.play()
  }
}

class MixOrMatch {
  constructor(totalTime) {
    this.totalTime = totalTime
    this.timeRemaining = totalTime
    this.timer = document.getElementById("time-remaining")
    this.ticker = document.getElementById("cups")
    this.audioController = new AudioController()
    this.cups = 0 // Add the cups variable
  }

  startGame() {
    this.totalClicks = 0
    this.cups = 0 // Initialize cups count to 0
    this.timeRemaining = this.totalTime
    setTimeout(() => {
      this.audioController.startMusic()
      this.countDown = this.startCountDown()
    }, 500)
    this.timer.innerText = this.timeRemaining
    this.ticker.innerText = this.cups // Update the ticker to display cups count
  }

  startCountDown() {
    return setInterval(() => {
      this.timeRemaining--
      this.timer.innerText = this.timeRemaining
      if (this.timeRemaining === 0) this.gameOver()
    }, 1000)
  }

  gameOver() {
    clearInterval(this.countDown)
    this.audioController.gameOver()
    document.getElementById("game-over-text").classList.add("visible")
  }

  victory() {
    clearInterval(this.countDown)
    this.audioController.victory()
    document.getElementById("victory-text").classList.add("visible")
  }
  
  increaseCups() {
    this.cups++
    this.ticker.innerText = this.cups // Update the displayed cups count
  }
}

function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"))
  let game = new MixOrMatch(20)

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible")
      game.startGame()
    })
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMcontentLoaded", ready())
} else {
  ready()
}

document.addEventListener("DOMContentLoaded", function () {
  const smallImages = document.querySelectorAll(".small-images img")
  const dropContainer = document.querySelector(".drop-container")
  let itemsPlaced = 0
  let game // Declare the game instance

  // Add drag and drop event listeners
  smallImages.forEach((smallImage) => {
    smallImage.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", smallImage.id)
    })
  })

  // Allow the drop container to accept drops
  dropContainer.addEventListener("dragover", function (e) {
    e.preventDefault()
  })

  dropContainer.addEventListener("drop", function (e) {
    e.preventDefault()
    const itemId = e.dataTransfer.getData("text/plain")
    const smallImage = document.getElementById(itemId)

    if (smallImage) {
      dropContainer.appendChild(smallImage)
      itemsPlaced++

      // Play the drop sound
      const dropSound = document.getElementById("dropSound")
      dropSound.play()

      // Increase the cups count by calling the increaseCups function
      game.increaseCups()

      if (itemsPlaced === 10) {
        game.victory() // Call the victory function from MixOrMatch
      }
    }
  })

  // Initialize the game
  game = new MixOrMatch()
})
