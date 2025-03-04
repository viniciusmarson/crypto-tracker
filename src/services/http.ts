import { authService } from '@/services/auth'
import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'

export class BaseHttpService {
  protected axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create()
    this.initializeInterceptors()
  }

  private initializeInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized()
        }
        return Promise.reject(error)
      },
    )
  }

  private handleUnauthorized() {
    authService.logout()
    window.location.href = '/login'
  }
}
