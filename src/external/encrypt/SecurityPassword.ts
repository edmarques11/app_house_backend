import bcrypt from 'bcrypt'

function genHash(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) reject(err)
      resolve(hash)
    })
  })
}

function validatePassword(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if(err) reject(err)
      resolve(result)
    })
  })
}

export default class SecurityPassword {
  async generateHash(password: string): Promise<string> {
    return await genHash(password)
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await validatePassword(password, hash)
  }
}
