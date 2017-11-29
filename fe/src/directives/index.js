import Vue from 'vue'

export const mousefollower = {
  bind(el, binding, vnode) {

    const defaultFriction = 30

    const moveData = {
      lFollowX: 0,
      lFollowY: 0,
      x: 0,
      y: 0
    }

    let element, friction

    function moveBackground() {
      moveData.x += (moveData.lFollowX - moveData.x) / friction
      moveData.y += (moveData.lFollowY - moveData.y) / friction
      element.style.transform = `translate(${moveData.x}px, ${moveData.y}px) scale(1.1) skew(${moveData.x/2}deg,${moveData.y/2}deg)`
      window.requestAnimationFrame(moveBackground)
    }

    if (el) {
      element = el
      friction = (binding.arg ? binding.arg : defaultFriction)

      element.style.backgroundPosition = 'cover'
      element.style.overflow = 'hidden'

      window.addEventListener('mousemove', (e) => {
        let lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX))
        let lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY))
        moveData.lFollowX = (20 * lMouseX) / 100 // 100 : 12 = lMouxeX : lFollow
        moveData.lFollowY = (10 * lMouseY) / 100
      })
      moveBackground()
    }
  }
}
