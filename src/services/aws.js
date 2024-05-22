const aws = require('aws-sdk')
const fs = require('fs')

const region = 'us-east-1'

const AwsS3Service = {
  async deleteFile (filepath) {
    aws.config.update({ region })
    const {
      AWS_ACCESS_ID: accessId,
      AWS_ACCESS_KEY: accessKey,
      AWS_BUCKET_NAME: bucketName
    } = process.env

    const params = {
      Bucket: bucketName,
      Key: filepath
    }
    const s3 = new aws.S3({
      accessKeyId: accessId,
      secretAccessKey: accessKey
    })
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.error('[error] aws deleteFile: ', err)
      }
    })
  },

  async uploadFile (file, filepath, isPublic) {
    aws.config.update({ region })

    const {
      AWS_ACCESS_ID: accessId,
      AWS_ACCESS_KEY: accessKey,
      AWS_BUCKET_NAME: bucketName
    } = process.env

    const fileContent = fs.readFileSync(file.path)
    const params = {
      Bucket: bucketName,
      Key: filepath,
      Body: fileContent,
      contentType: file.mimetype
    }

    if (isPublic === true) {
      params.ACL = 'public-read'
    }
    const s3 = new aws.S3({
      accessKeyId: accessId,
      secretAccessKey: accessKey
    })
    s3.upload(params, (err, data) => {
      if (err) {
        console.error('[error] uploadFile: ', err)
      }
    })
  },

  async streamFileDownload (filepath) {
    if (!filepath) {
      return false
    }

    aws.config.update({ region })

    const {
      AWS_ACCESS_ID: accessId,
      AWS_ACCESS_KEY: accessKey,
      AWS_BUCKET_NAME: bucketName
    } = process.env

    const s3 = new aws.S3({
      accessKeyId: accessId,
      secretAccessKey: accessKey
    })
    const params = {
      Bucket: bucketName,
      Key: filepath
    }

    return s3.getObject(params).createReadStream()
  }
}

module.exports = AwsS3Service
