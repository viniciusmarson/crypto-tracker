type User = {
  email: string
  password: string
}

export class AuthService {
  public login(email: string, password: string): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((user: User) => user.email === email && user.password === password)
    if (!user) {
      throw new Error('User not found')
    }

    const token = crypto.randomUUID()
    localStorage.setItem('userToken', token)
    localStorage.setItem('userInfo', JSON.stringify(user))
  }

  public logout(): void {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userInfo')
  }

  public register(email: string, password: string): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((user: User) => user.email === email && user.password === password)
    if (user) {
      throw new Error('User already exists')
    }

    users.push({
      email,
      password,
    })

    localStorage.setItem('users', JSON.stringify(users))
  }

  public getUserInfo(): User {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    return userInfo
  }
}

export const authService = new AuthService()
