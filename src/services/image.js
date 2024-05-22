const HEICConverter = require('#helpers/HeicConverter')
const { image: Image } = require('#models')
const AwsS3Service = require('./aws')

const ImageService = {
    async createImage (filePath) {
        return Image.create({ filePath })
    },

    async uploadImage (file, folderPrefix, isPublic, fileName = null) {
        const index = file.originalname.lastIndexOf('.')
        let ext = file.originalname.substr(index)

        if (ext === '.heic') {
            await HEICConverter.convertToJpg(file.path)
            file.originalname = file.originalname.replace(ext, '.jpg')
            file.mimetype = 'image/jpeg'
            ext = '.jpg'
        }

        let destination = fileName ?
            folderPrefix + '-' + process.env.NODE_ENV + '/' + fileName + ext
            :
            folderPrefix + '-' + process.env.NODE_ENV + '/' + uuid() + ext

        if (isPublic === true) {
            destination = 'uploads/' + destination
        } else {
            destination = 'uploads-secret' + destination
        }

        await AwsS3Service.uploadFile(file, destination, isPublic)

        const filePath = file.path
        const unlinked = fs.unlinkSync(filePath)
        console.log(unlinked)
        return destination
    },

    async streamFileDownload (filePath) {
        return await AwsS3Service.streamFileDownload(filePath)
    }
}

module.exports = ImageService