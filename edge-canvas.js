class EdgeCanvas extends CanvasHelper {
    /**
     * @param {HTMLCanvasElement} canvasElement 
     */
    constructor(canvasElement) {
        super(canvasElement)
        this.edgeIDs = new Set([
            ["#node-1", "#node-2"]
        ])

        this.update()
    }

    update() {
        this.setColor("white")
        this.ctx.lineWidth = 2
        this.clearCanvas()
        for (const [a, b] of this.edgeIDs.values()) {
            let A = document.querySelector(a)
            let B = document.querySelector(b)

            let [x1, y1] = this.getCenter(A.getBoundingClientRect())
            let [x2, y2] = this.getCenter(B.getBoundingClientRect())

            // this.canvas_arrow(parseInt(x1), parseInt(y1), parseInt(x2), parseInt(y2))
            this.drawLine(parseInt(x1), parseInt(y1), parseInt(x2), parseInt(y2))
        }
    }

    /**
     * @param {DOMRect} bcr 
     * @returns {number[]}
     */
    getCenter(bcr) {
        return [bcr.x + bcr.width / 2, bcr.y + bcr.height / 2]
    }

    createEdge(fromNode, toNode) {
        this.edgeIDs.add([fromNode, toNode])
    }

    loadEdges(edgeData) {
        this.edgeIDs = new Set(edgeData)
    }

    exportData() {
        return JSON.stringify(Array.from(this.edgeIDs).map(e=>e.map(i=>+i.replace("#node-", ""))))
    }

    removeNode(node) {
        for (const edge of this.edgeIDs.values()) {
            if(edge.includes(node)) {
                this.edgeIDs.delete(edge)
            }
        }
    }
}