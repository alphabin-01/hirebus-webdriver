export const getClipboardText = async () => {
    const clipboardText = await browser.execute(() => {
        return navigator.clipboard.readText();
    });
    return clipboardText;
}
