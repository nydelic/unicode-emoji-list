let emojiGroups = {};
let activeGroup = "";
let activeSubGroup = "";

let subCategoryRank = 0;
let emojiRank = 0;

let extractEmojiFromItem = (node) => {
  const imgaNode = node?.querySelector(".imga") || node?.querySelector(".imgs");
  if (!imgaNode || imgaNode.parentNode.getAttribute("colspan")) {
    return;
  }
  return imgaNode.getAttribute("src");
};

document.querySelectorAll("tr").forEach((node) => {
  const bigHeadHeader = node.querySelector("th.bighead");
  const mediumHeadHeader = node.querySelector("th.mediumhead");
  if (bigHeadHeader) {
    activeGroup = bigHeadHeader.innerText;
    emojiGroups[activeGroup] = {};
    subCategoryRank = 0;
  } else if (mediumHeadHeader) {
    activeSubGroup = `${String(subCategoryRank).padStart(4, "0")}-${
      mediumHeadHeader.innerText
    }`;
    subCategoryRank++;
    emojiRank = 0;
    emojiGroups[activeGroup][activeSubGroup] = {};
  } else if (node.querySelector("th.rchars")?.innerText !== "№") {
    const mainEmoji = node.querySelector("td.chars");
    emojiRank++;
    const emojiObj = {};
    emojiGroups[activeGroup][activeSubGroup][
      `${String(emojiRank).padStart(6, "0")}${mainEmoji.innerText}`
    ] = emojiObj;

    emojiObj["apple"] = extractEmojiFromItem(
      mainEmoji.parentNode.querySelector(".andr")
    );
    emojiObj["google"] = extractEmojiFromItem(
      mainEmoji.parentNode.querySelector(".andr + .andr")
    );
    emojiObj["facebook"] = extractEmojiFromItem(
      mainEmoji.parentNode.querySelector(".andr + .andr + .andr")
    );
    emojiObj["windows"] = extractEmojiFromItem(
      mainEmoji.parentNode.querySelector(".andr + .andr + .andr + .andr")
    );
    emojiObj["twitter"] = extractEmojiFromItem(
      mainEmoji.parentNode.querySelector(
        ".andr + .andr + .andr + .andr + .andr"
      )
    );
    emojiObj["joypixels"] = extractEmojiFromItem(
      mainEmoji.parentNode.querySelector(
        ".andr + .andr + .andr + .andr + .andr + .andr"
      )
    );
    emojiObj["samsung"] = extractEmojiFromItem(
      mainEmoji.parentNode.querySelector(
        ".andr + .andr + .andr + .andr + .andr + .andr + .andr"
      )
    );
    emojiObj["gmail"] = extractEmojiFromItem(
      mainEmoji.parentNode.querySelector(
        ".andr + .andr + .andr + .andr + .andr + .andr + .andr + .andr"
      )
    );
    emojiObj["softbank"] = extractEmojiFromItem(
      mainEmoji.parentNode.querySelector(
        ".andr + .andr + .andr + .andr + .andr + .andr + .andr + .andr + .andr"
      )
    );
    emojiObj["docomo"] = extractEmojiFromItem(
      mainEmoji.parentNode.querySelector(
        ".andr + .andr + .andr + .andr + .andr + .andr + .andr + .andr + .andr + .andr"
      )
    );
    emojiObj["kddi"] = extractEmojiFromItem(
      mainEmoji.parentNode.querySelector(
        ".andr + .andr + .andr + .andr + .andr + .andr + .andr + .andr + .andr + .andr + .andr"
      )
    );
    emojiObj["description"] =
      mainEmoji.parentNode.querySelector(".name").innerText;
  }
});

console.log(emojiGroups);
