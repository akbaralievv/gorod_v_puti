import { Account, Client, Databases, Storage } from 'appwrite'

const base_url = import.meta.env.VITE_BASE_URL
const appwrite_project_id = import.meta.env.VITE_X_APPWRITE_PROJECT

const client = new Client()
client.setEndpoint(base_url).setProject(appwrite_project_id)

export const account = new Account(client)
export const storage = new Storage(client)
export const databases = new Databases(client)
