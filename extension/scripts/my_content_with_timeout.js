const knownSegments = [];

function debounce(func, delay) {
  let timeoutId;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

function isSubstringOf(str1, str2) {
  const cleanStr1 = str1.replace(/[^\w\s]/g, "").toLowerCase();
  const cleanStr2 = str2.replace(/[^\w\s]/g, "").toLowerCase();

  return cleanStr1 === cleanStr2 || cleanStr2.includes(cleanStr1);
}

function isAlreadyRead(textSegment, knownSegments) {
  let result;
  for (let i = 0; i < knownSegments.length; i++) {
    const segment = knownSegments[i];

    if (isSubstringOf(textSegment, segment)) {
      return [true];
    } else if (isSubstringOf(segment, textSegment)) {
      knownSegments[i] = textSegment;
      result = textSegment.slice(segment.length);
      break;
    }
  }
  return [false, result];
}

function keepTrackOfReadPortion(knownSegments, newText) {
  const punctuationRegex = /[^\w\s]/g;
  const textSegments = newText.split(punctuationRegex);
  let unreadText = "";

  for (let i = 0; i < textSegments.length; i++) {
    const segment = textSegments[i];
    const cleanedSegment = segment.trim();
    const result = isAlreadyRead(cleanedSegment, knownSegments);

    if (cleanedSegment !== "" && !result[0]) {
      if (result[1]) {
        unreadText += result[1];
      } else {
        knownSegments.push(cleanedSegment);
        unreadText += cleanedSegment;
      }
    }
  }

  return unreadText.trim();
}

setTimeout(() => {
  const targetNode = document.getElementById("tactiq-content-div");
  console.log("### FOUND!");
  console.log(targetNode);

  const handleCharacterData = debounce(function (mutation) {
    const text = mutation.target.textContent.toString();
    console.log(keepTrackOfReadPortion(knownSegments, text));
    // console.log(text);
  }, 0.5);

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      console.log(knownSegments);

      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node.firstChild) {
            if (node.firstChild.className == "sc-dOoqMo lgzaMS") {
              if (node.firstChild.children) {
                if (node.firstChild.children.length > 0) {
                  for (let i = 0; i < node.firstChild.children.length; i++) {
                    const element = node.firstChild.children[i];
                    if (element.className == "sc-dBFDNq cfrGJG") {
                      const text = element.textContent.toString();
                      console.log("******************");
                      console.log(keepTrackOfReadPortion(knownSegments, text));
                      console.log("******************");
                      // console.log(element.textContent);
                    }
                  }
                }
              }
            }
          }
        }
      } else if (mutation.type === "characterData") {
        handleCharacterData(mutation);
      }
    }
  });

  observer.observe(targetNode, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}, 3000);
