export const getRandomArbitrary = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

export const removeDiacritics = (text: string) => text.normalize('NFKD').replace(/[^\w\s.-_\/]/g, '')
