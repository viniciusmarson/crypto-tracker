import type { Wallet } from '@/types/wallet'

// TODO: Mario - This is the service that will be used to set and get the user crypto data from the local storage
export class WalletService {
  public getUserCryptoData(userId: string): Wallet[] {
    return JSON.parse(localStorage.getItem(`userCryptoData-${userId}`) || '[]')
  }

  public saveUserCryptoData(userId: string, cryptoData: Wallet[]): void {
    localStorage.setItem(`userCryptoData-${userId}`, JSON.stringify(cryptoData))
  }
}
