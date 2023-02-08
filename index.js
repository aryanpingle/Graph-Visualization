let c = new EdgeCanvas(document.querySelector("#edge-canvas"))
let MOUSEX = 0
let MOUSEY = 0
let selectedNode = ""
let selectedEdgeNode = ""
let mouseOverNode = ""

function setup() {
    querySelectorAll(".node").forEach(addNodeHandler)

    saveData("default")

    // Add new node
    document.querySelector("#button-add_node").onclick = function(event) {
        createNode()
        c.colorConnectedComponents()
    }

    loadData()
}

/**
 * @returns {HTMLElement}
 */
function createNode(nodeNumber) {
    let newNodeNumber = nodeNumber || (querySelectorAll(".node").length + 1)
    const newNode = document.createElement("DIV")
    newNode.classList.add("node")
    newNode.id = "node-" + newNodeNumber
    newNode.innerHTML = newNodeNumber
    addNodeHandler(newNode)
    document.querySelector("#node-space").append(newNode)

    return newNode
}

/**
 * @param {HTMLElement} node 
 */
function addNodeHandler(node) {
    node.onmousedown = function(event) {
        event.preventDefault()
        event.stopPropagation()
        window.oncontextmenu = ""
        if(event.button == 0) {
            // Left Mouse Button
            selectedNode = "#"+node.id
        }
        else if(event.button == 1) {
            // Middle Mouse Button
            // Delete node
            c.removeNode("#"+node.id)
            node.remove()

            c.update()
            c.colorConnectedComponents()
        }
        else {
            // Right Mouse Button
            selectedEdgeNode = "#"+node.id
        }
    }

    node.onmouseover = function(event) {
        mouseOverNode = "#"+node.id
    }
    node.onmouseout = function(event) {
        mouseOverNode = ""
    }

    node.onmousemove = function(event) {
        event.preventDefault()
        if(!node.getAttribute("custom")) return;

        node.style.transform = `translate(calc(${event.clientX}px - 50%), calc(${event.clientY}px - 50%))`

        c.update()
    }
}

setup()

window.onresize = event => {
    print("Resized")
    c.resize()
}

window.onmousemove = event => {
    MOUSEX = event.clientX
    MOUSEY = event.clientY
    let shouldUpdate = false
    if(selectedNode) {
        document.querySelector(selectedNode).style.transform = `translate(calc(${event.clientX}px - 50%), calc(${event.clientY}px - 50%))`
        shouldUpdate = true
    }
    else if(selectedEdgeNode) {
        shouldUpdate = true
    }

    if(shouldUpdate) c.update()
    if(selectedEdgeNode) {
        let node = document.querySelector(selectedEdgeNode)
        c.canvas_arrow(...c.getCenter(node.getBoundingClientRect()), MOUSEX, MOUSEY)
    }
}

window.onmouseup = event => {
    selectedNode = ""

    if(selectedEdgeNode && mouseOverNode && mouseOverNode!=selectedEdgeNode) {
        c.createEdge(selectedEdgeNode, mouseOverNode)
    }
    selectedEdgeNode = ""

    c.update()
}

function saveData(dataName) {
    if(dataName) dataName += "--"
    // Save Edges Data
    localStorage.setItem((dataName || "") + "edge-data", JSON.stringify(Array.from(c.edgeIDs)))

    // Save Node Data
    let nodes = querySelectorAll(".node")
    let node_data = {}
    for (const node of nodes) {
        node_data[node.id] = node.style.transform.replace("translate", "")
    }
    localStorage.setItem((dataName || "") + "node-data", JSON.stringify(node_data))
}

function loadData(dataName) {
    if(dataName) dataName += "--"
    let edge_data = localStorage.getItem((dataName || "") + "edge-data")
    let node_data = localStorage.getItem((dataName || "") + "node-data")

    if(!edge_data && !node_data) {
        print("No data found")
        return
    }
    if(!edge_data || !node_data) {
        print("Missing data")
        return
    }

    edge_data = JSON.parse(edge_data)
    node_data = JSON.parse(node_data)

    c.loadEdges(edge_data)
    document.querySelector("#node-space").innerHTML = ""
    for(const [nodeID, node_transform] of Object.entries(node_data)) {
        let node = createNode(nodeID.replace("node-", ""))
        node.style.transform = `translate${node_transform}`
    }

    c.update()
    c.colorConnectedComponents()
}

function exportData() {
    print(c.exportData())

    navigator.clipboard.writeText(c.exportData())
}

function resetData() {
    loadData("default")
}