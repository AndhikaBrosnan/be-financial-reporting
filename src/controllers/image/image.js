const GeneralError = require("#errors/definitions/general-error")
const AwsS3Service = require("#services/aws")
const ImageService = require("#services/image")
const fs = require('fs')

module.exports = class Controller {
    static async upload (req, res) {

        const image = req.file
        const index = image.originalname.lastIndexOf('.')
        const ext = image.originalname.substr(index)

        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.heic') {
            const unlinked = fs.unlinkSync(image.path)
            console.log(unlinked)
            throw GeneralError.invalidFileExtension(ext)
        }

        const { mimeType } = image

        if (mimeType === 'image/png' || mimeType === 'image/jpg' || mimeType === 'image/jpeg') {
            const unlinked = fs.unlinkSync(image.path)
            console.log(unlinked)
            throw GeneralError.invalidFileMiletype(mimeType)
        }

        const filePath = await AwsS3Service.upload(image)

        await ImageService.createImage({ filePath })

        return res.serialize({ status: 'success' })

    }

    static async download (req, res) {
        const { filePath } = req.params

        const stream = await AwsS3Service.streamFileDownload(filePath)
        stream.pipe(res)
    }
}