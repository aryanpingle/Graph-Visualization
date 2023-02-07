const print = console.log

/**
 * @param {string} selectors 
 * @param {any} target 
 * @returns {HTMLElement[]}
 */
function querySelectorAll(selectors, target) {
    return [...(target || document).querySelectorAll(selectors)]
}

class CanvasHelper {
    /**
     * @param {HTMLCanvasElement} canvasElement 
     */
    constructor(canvasElement) {
        this.canvas = canvasElement
        this.ctx = this.canvas.getContext("2d")
        this.ctx.imageSmoothingEnabled = false

        this.canvas.width = this.canvas.clientWidth
        this.canvas.height = this.canvas.clientHeight
        
        this.CANVAS_WIDTH = this.canvas.width
        this.CANVAS_HEIGHT = this.canvas.height
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth
        this.canvas.height = this.canvas.clientHeight
        
        this.CANVAS_WIDTH = this.canvas.width
        this.CANVAS_HEIGHT = this.canvas.height

        this.update()
    }

    update() {
        // Implement your code
    }

    /**
     * Sets both fillStyle and strokeStyle
     * @param {any} rgba 
     */
    setColor(rgba) {
        if(typeof rgba == "string") {
            this.ctx.fillStyle = rgba
            this.ctx.strokeStyle = rgba
        }
        else {
            this.ctx.fillStyle = `rgba(${rgba.join(", ")})`
            this.ctx.strokeStyle = `rgba(${rgba.join(", ")})`
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawLine(x1, y1, x2, y2) {
        this.ctx.beginPath()
        this.ctx.moveTo(x1 + 0.5, y1 + 0.5)
        this.ctx.lineTo(x2 + 0.5, y2 + 0.5)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    canvas_arrow(fromx, fromy, tox, toy) {
        this.ctx.beginPath()
        const headlen = 10 // length of head in pixels
        const dx = tox - fromx
        const dy = toy - fromy
        const angle = Math.atan2(dy, dx)
        this.ctx.moveTo(fromx, fromy)
        this.ctx.lineTo(tox, toy)
        this.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6))
        this.ctx.moveTo(tox, toy)
        this.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6))
        this.ctx.stroke()
    }

    test() {
        // this.setColor("white")
        
        // this.canvas_arrow(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
        // print("drawn")
    }
}