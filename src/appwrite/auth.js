import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf"

class Auth {
    client = new Client();
    account ;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }


    async signup({ email, password, username }) {
        {
            try {
                const useracc = await this.account.create(ID.unique(), email, password, username)
                if (useracc) return await this.login({ email, password })
                else return useracc;
            } catch (error) {
                return error.message
            }
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            return error.message
        }
    }

    async currentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            return error.message
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            return error.message
        }
    }



}

const auth = new Auth()
export default auth