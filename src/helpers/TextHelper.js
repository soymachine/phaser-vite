export function setText(field, fontSizeOriginal, text, width, height) {
    // So we don't lose the original value of the font size, create a property on the field to store it.
    if (!('defaultFontSize' in field)) {
        console.log("no hay defaultFontSize")
        field['defaultFontSize'] = fontSizeOriginal;
    }

    // Set the field's font size back to it's original value before setting the new text.
    field.fontSize = field['defaultFontSize'];
    console.log(`field.fontSize:${field.fontSize}`)

    // If word wrap is set, then use the word wrap width as the bounds' width instead.
    if (field.wordWrap) {
        width = field.wordWrapWidth;
    }

    // Set the field's text property.
    field.text = text;

    // Check if bounds were provided.
    if (width > 0 && height > 0) {
        // Use the default font size as a base for the auto sizing.
        var size = field['defaultFontSize'];
        

        // While the width or height is greater then the provided bounds, subtract one from the font size.
        while ((field.width > width || field.height > height) && field.fontSize > 4) {
            field.setFontSize(--size);
            //console.log("substract font size?")
        }

        console.log(`fontsize FINAL:${size}`)
    }


}