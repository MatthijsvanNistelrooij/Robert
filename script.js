document.addEventListener("DOMContentLoaded", function () {
  const smallImages = document.querySelectorAll(".small-images img")
  const dropContainer = document.querySelector(".drop-container")
  let itemsPlaced = 0

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

      // Check if all items are placed
      if (itemsPlaced === 10) {
        // Play the "all items placed" sound
        const allItemsPlacedSound = document.getElementById(
          "allItemsPlacedSound"
        )
        allItemsPlacedSound.play()
      }
    }
  })
})

