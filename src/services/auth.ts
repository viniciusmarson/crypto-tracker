type User = {
  email: string
  password: string
}

export class AuthService {
  public async login(email: string, password: string): Promise<void> {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((user: User) => user.email === email && user.password === password)
    if (!user) {
      throw new Error('User not found')
    }

    const token = crypto.randomUUID()
    localStorage.setItem('userToken', token)
  }

  public async logout(): Promise<void> {
    localStorage.removeItem('userToken')
  }

  public async register(email: string, password: string): Promise<void> {
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
}

export const authService = new AuthService()
