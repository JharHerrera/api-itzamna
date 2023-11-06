import sharp  from "sharp"

export const helperImg = (filePaht, fileName, size=300)=>{
    return sharp (filePaht)
        .resize(size)
        .toFile(`./optimize/${fileName}`)
}