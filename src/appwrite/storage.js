import { Client, ID, Storage } from "appwrite";
import conf from "../conf/conf"



class StorageServices {
    client;
    bucket;
    constructor() {
        this.client = new Client()
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.bucket = new Storage(this.client);
    }

    // returns file id(featured image)
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            return error.message
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
            return true
        } catch (error) {
            return false
        }
    }

    async previewFile(fileId) {
        try {
            return  this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
        } catch (error) {
            return false
        }
    }

}

const storageService = new StorageServices()
export default storageService