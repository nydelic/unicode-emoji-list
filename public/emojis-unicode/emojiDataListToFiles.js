const fs = require("fs");

const emojiDataList = require("./emojiDataList.json");

const newEmojiArray = [];

Object.entries(emojiDataList).forEach(
  ([emojiCategory, emojiSubCategories], categoryIndex) => {
    // skip this category
    if (emojiCategory === "Component") {
      return;
    }

    const newEmojiCategoryItems = [];
    const newEmojiCategoryItem = {
      name: emojiCategory,
      items: newEmojiCategoryItems,
    };
    newEmojiArray.push(newEmojiCategoryItem);

    Object.entries(emojiSubCategories).forEach(
      ([emojiSubCategory, emojis], subCategoryIndex) => {
        const newEmojiCategorySubItems = [];
        newEmojiCategoryItems.push({
          name: emojiSubCategory.slice(5),
          items: newEmojiCategorySubItems,
        });
        // console.log(emojiSubCategory);

        Object.entries(emojis).forEach(([emoji, emojiVariants], emojiIndex) => {
          // console.log(emoji);
          const newEmojiVariants = {};
          newEmojiCategorySubItems.push({
            emoji: emoji.slice(6),
            description: emojiVariants.description,
            variants: newEmojiVariants,
          });

          Object.entries(emojiVariants).forEach(([emojiVariant, emojiData]) => {
            if (emojiVariant !== "description") {
              const path = `/${emojiVariant}/${categoryIndex}-${subCategoryIndex}-${emojiIndex}.png`;
              newEmojiVariants[emojiVariant] = {
                path: emojiData ? path : undefined,
              };
              if (emojiData) {
                const dir = `./${emojiVariant}`;
                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir);
                }

                const base64Data = emojiData.replace(
                  /^data:image\/png;base64,/,
                  ""
                );
                fs.writeFileSync(`.${path}`, base64Data, "base64");
              }
            }
          });
        });
      }
    );
  }
);

const json = JSON.stringify(newEmojiArray, null, 2);
fs.writeFileSync("unicodeEmojisList.json", json);
