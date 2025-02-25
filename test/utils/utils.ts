export const getClipboardText = async () => {
    try {
        // Add more detailed logging
        console.log('Attempting to access clipboard...');
        const clipboardText = await browser.execute(async () => {
            try {
                const permission = await navigator.permissions.query({ name: 'clipboard-read' as PermissionName });
                console.log('Clipboard permission status:', permission.state);
                const text = await navigator.clipboard.readText();
                return text;
            } catch (e) {
                console.error('Clipboard error:', e);
                return null;
            }
        });

        if (clipboardText === null) {
            throw new Error('Clipboard access denied or failed');
        }

        return clipboardText;
    } catch (error: any) {
        console.warn('Clipboard access failed:', error.message);
        return '';
    }
}