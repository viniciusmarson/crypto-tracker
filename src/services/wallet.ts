import type { Wallet } from '@/types/wallet'

class WalletService {
  public getUserCryptoData(userId: string): Wallet[] {
    return JSON.parse(localStorage.getItem(`userCryptoData-${userId}`) || '[]')
  }

  public saveUserCryptoData(userId: string, cryptoData: Wallet[]): void {
    localStorage.setItem(`userCryptoData-${userId}`, JSON.stringify(cryptoData))
  }
}

export const walletService = new WalletService()
