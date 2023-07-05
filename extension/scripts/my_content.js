// Select the node that will be observed for mutations
const targetNode = document.getElementById("tactiq-content-div");
console.log("### FOUND!");
console.log(targetNode);

const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (const node of mutation.addedNodes) {
        // console.log("Added node:", node);

        if (node.firstChild) {
          if (node.firstChild.className == "sc-dOoqMo lgzaMS") {
            // console.log("*** Hurray");
            
            if (node.firstChild.children) {
                if (node.firstChild.children.length > 0) {
                    for (let i = 0; i < node.firstChild.children.length; i++) {
                        const element = node.firstChild.children[i];
                        if (element.className == "sc-dBFDNq cfrGJG") {
                            console.log(element.textContent);
                            // console.log(element.className);
                        }
                    }
                }
            }
          }
        }
      } 
      /* 
      for (const node of mutation.removedNodes) {
        // Handle removed nodes
        // Do something with the removed node
        console.log("Removed node:", node);
      }
       */
    } else if (mutation.type === "characterData") {
      // Process modified nodes
      // Do something with the modified node
      const text = mutation.target;
      console.log(text);
    }
  }
});

// Start observing the DOM subtree
observer.observe(targetNode, {
  childList: true, // Observe direct children being added or removed
  subtree: true, // Observe all descendants of the target node
  characterData: true,
});
