import type { User } from '@/types/user'

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

  public register({ email, password, address, age, country, phone, currency, name }: User): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((user: User) => user.email === email)
    if (user) {
      throw new Error('User already exists')
    }

    users.push({
      name,
      email,
      password,
      address,
      age,
      country,
      phone,
      currency,
    })

    localStorage.setItem('users', JSON.stringify(users))
  }

  public getUserInfo(): User {
    return JSON.parse(localStorage.getItem('userInfo') || '{}')
  }
}

export const authService = new AuthService()
