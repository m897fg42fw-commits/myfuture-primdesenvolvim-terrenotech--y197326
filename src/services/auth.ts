import pb from '@/lib/pocketbase/client'

export interface AuthUser {
  id: string
  email: string
  name?: string
  avatar?: string
}

export const authService = {
  getCurrentUser(): AuthUser | null {
    const model = pb.authStore.record
    if (!model) return null
    return {
      id: model.id,
      email: model.email,
      name: model.name || model.email.split('@')[0],
      avatar: model.avatar,
    }
  },

  isAuthenticated(): boolean {
    return pb.authStore.isValid
  },

  async login(email: string, password: string): Promise<AuthUser> {
    const authData = await pb.collection('users').authWithPassword(email, password)
    return {
      id: authData.record.id,
      email: authData.record.email,
      name: authData.record.name || authData.record.email.split('@')[0],
      avatar: authData.record.avatar,
    }
  },

  async register(name: string, email: string, password: string): Promise<AuthUser> {
    // 1. Create user
    await pb.collection('users').create({
      name,
      email,
      password,
      passwordConfirm: password,
    })

    // 2. Login directly (no mandatory verification required to access)
    return await this.login(email, password)
  },

  async requestPasswordReset(email: string): Promise<void> {
    await pb.collection('users').requestPasswordReset(email)
  },

  async confirmPasswordReset(token: string, password: string): Promise<void> {
    await pb.collection('users').confirmPasswordReset(token, password, password)
  },

  async confirmVerification(token: string): Promise<void> {
    await pb.collection('users').confirmVerification(token)
  },

  logout(): void {
    pb.authStore.clear()
  },
}
