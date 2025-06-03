import { ethers, BrowserProvider, JsonRpcSigner } from "ethers";
import { initSilk } from "@silk-wallet/silk-wallet-sdk";

export interface AuthResult {
  success: boolean;
  address?: string;
  error?: string;
}

// Extend Window interface to recognize ethereum and silk
declare global {
  interface Window {
    ethereum?: any; // EIP-1193 provider interface
    silk?: any; // Silk provider
  }
}

class AuthService {
  private provider: BrowserProvider | null = null;
  private signer: JsonRpcSigner | null = null;
  private userAddress: string | null = null;
  private isAuthenticated: boolean = false;
  private silkProvider: any = null;
  private _isInitialized: boolean = false;

  constructor() {
    console.log("[AuthService] Constructor called");
  }

  // Initialize the service - call this early in your app
  async initialize(): Promise<void> {
    if (this._isInitialized) {
      console.log("[AuthService] Already initialized.");
      return;
    }

    try {
      console.log("[AuthService] Initializing Silk SDK...");
      
      // Clear any existing Silk-related storage first
      if (typeof window !== 'undefined') {
        try {
          // Clear localStorage
          const keysToRemove = [];
          for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (key && (key.includes('silk') || key.includes('human') || key.includes('wallet') || key.includes('auth'))) {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach(key => {
            console.log(`[AuthService] Clearing localStorage key: ${key}`);
            window.localStorage.removeItem(key);
          });

          // Clear sessionStorage
          const sessionKeysToRemove = [];
          for (let i = 0; i < window.sessionStorage.length; i++) {
            const key = window.sessionStorage.key(i);
            if (key && (key.includes('silk') || key.includes('human') || key.includes('wallet') || key.includes('auth'))) {
              sessionKeysToRemove.push(key);
            }
          }
          sessionKeysToRemove.forEach(key => {
            console.log(`[AuthService] Clearing sessionStorage key: ${key}`);
            window.sessionStorage.removeItem(key);
          });
        } catch (error) {
          console.warn('[AuthService] Could not clear storage:', error);
        }
      }

      // Configuration that enables social logins and MetaMask (no WalletConnect)
      // Based on Silk documentation, ensure the config is properly structured
              const initOptions = {
          // Removed walletConnectProjectId to disable WalletConnect completely
          // Use staging environment for development to avoid CSP and production restrictions
          useStaging: true, // Set to true for development environment
          // Add development mode configurations
          development: true,
          config: {
            allowedSocials: ['apple', 'github'], // Just the working social logins
            authenticationMethods: ['wallet', 'email', 'social'],  // Wallet (MetaMask), email, and social (Apple/GitHub)
            styles: { 
              darkMode: true 
            }
          },
          project: {
            entryTitle: 'Learn with Scarlett 斯嘉丽 🎶',
            name: 'Scarlett'
          }
        };

      console.log("[AuthService] Initializing with config:", JSON.stringify(initOptions, null, 2));
      
      // Initialize Silk SDK - this sets up window.silk
      this.silkProvider = initSilk(initOptions as any);
      console.log("[AuthService] Silk provider created:", this.silkProvider);

      // Make it globally available (though initSilk should do this automatically)
      if (typeof window !== 'undefined') {
        window.silk = this.silkProvider;
        console.log("[AuthService] Silk provider assigned to window.silk");
        
        // Log config after initialization
        setTimeout(() => {
          if (window.silk?.config) {
            console.log("[AuthService] 🔍 Final Silk config:", JSON.stringify(window.silk.config, null, 2));
          }
        }, 1000);
      }

      // Check if already connected (for auto-reconnect)
      await this.checkForExistingConnection();
      
    } catch (err) {
      console.error("[AuthService] Error initializing Silk SDK:", err);
    } finally {
      this._isInitialized = true;
      console.log(`[AuthService] Initialization complete. Connected: ${this.isAuthenticated}, Address: ${this.userAddress}`);
    }
  }
  
  isInitialized(): boolean {
    return this._isInitialized;
  }

  // Check for existing wallet connections (for auto-reconnect)
  private async checkForExistingConnection(): Promise<void> {
    console.log('[AuthService] Checking for existing wallet connection...');
    
    // First check if Silk has an existing session
    if (window.silk) {
      try {
        // Try to get accounts without triggering login modal
        const accounts = await window.silk.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          console.log(`[AuthService] Found existing Silk connection: ${accounts[0]}`);
          this.provider = new BrowserProvider(window.silk);
          this.signer = await this.provider.getSigner();
          this.userAddress = await this.signer.getAddress();
          this.isAuthenticated = true;
          return;
        }
      } catch (error) {
        console.log('[AuthService] No existing Silk connection');
      }
    }
    
    // Check injected wallet (MetaMask, etc) as fallback
    if (typeof window !== 'undefined' && window.ethereum && !window.ethereum.isSilk) {
      try {
        const browserProvider = new BrowserProvider(window.ethereum);
        const accounts = await browserProvider.send('eth_accounts', []);
        
        if (accounts && accounts.length > 0) {
          console.log(`[AuthService] Found existing injected wallet: ${accounts[0]}`);
          this.provider = browserProvider;
          this.signer = await this.provider.getSigner();
          this.userAddress = await this.signer.getAddress();
          this.isAuthenticated = true;
          
          this.setupEventListeners();
          return;
        } else {
          console.log('[AuthService] Injected wallet found but no accounts authorized.');
        }
      } catch (error) {
        console.error('[AuthService] Error checking injected wallet:', error);
      }
    }
    
    console.log('[AuthService] No existing connection found.');
  }

  // Set up event listeners for wallet changes
  private setupEventListeners(): void {
    if (window.ethereum && !window.ethereum.isSilk) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log('[AuthService] Accounts changed:', accounts);
        if (accounts.length === 0) {
          this.resetAuthState();
        } else {
          this.userAddress = accounts[0];
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        console.log('[AuthService] Chain changed:', chainId);
      });

      window.ethereum.on('disconnect', () => {
        console.log('[AuthService] Wallet disconnected');
        this.resetAuthState();
      });
    }
  }

  isConnected(): boolean {
    return this.isAuthenticated && !!this.userAddress;
  }

  getUserAddress(): string | null {
    return this.userAddress;
  }

  getFormattedAddress(): string {
    if (!this.userAddress) return "";
    return `${this.userAddress.substring(0, 6)}...${this.userAddress.substring(this.userAddress.length - 4)}`;
  }

  async getSigner(): Promise<JsonRpcSigner | null> {
    if (!this.provider) return null;
    
    if (!this.signer) {
      try {
        this.signer = await this.provider.getSigner();
      } catch (error) {
        console.error('[AuthService] Error getting signer:', error);
        return null;
      }
    }
    
    return this.signer;
  }

  // Debug method to inspect current state
  private debugCurrentState(): void {
    console.log('[AuthService] === DEBUG STATE ===');
    console.log('[AuthService] window.silk exists:', !!window.silk);
    console.log('[AuthService] window.silk.connected:', window.silk?.connected);
    console.log('[AuthService] this.isAuthenticated:', this.isAuthenticated);
    console.log('[AuthService] this.userAddress:', this.userAddress);
    
    // Check what's in storage
    if (typeof window !== 'undefined') {
      const storageKeys = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && (key.includes('silk') || key.includes('human') || key.includes('wallet') || key.includes('auth'))) {
          storageKeys.push(key);
        }
      }
      console.log('[AuthService] Relevant localStorage keys:', storageKeys);
    }
    console.log('[AuthService] === END DEBUG ===');
  }

  // Simple test connection method
  async testSilkConnection(): Promise<AuthResult> {
    console.log('[AuthService] Testing simple Silk connection...');
    
    if (!window.silk) {
      return { success: false, error: "Silk not available" };
    }

    try {
      console.log('[AuthService] Available Silk methods:', Object.getOwnPropertyNames(window.silk));
      console.log('[AuthService] Silk provider type:', typeof window.silk);
      
      // Just try the most basic connection
      const accounts = await window.silk.request({ method: 'eth_requestAccounts' });
      console.log('[AuthService] Simple connection accounts:', accounts);
      
      if (accounts && accounts.length > 0) {
        this.userAddress = accounts[0] || null;
        this.isAuthenticated = true;
        return { success: true, address: this.userAddress || undefined };
      } else {
        return { success: false, error: "No accounts returned" };
      }
    } catch (error: any) {
      console.error('[AuthService] Simple connection failed:', error);
      return { success: false, error: error.message || "Connection failed" };
    }
  }

  // Main connection method using Silk
  async connectWithSelector(): Promise<AuthResult> {
    console.log('[AuthService] Attempting connection via Silk...');
    
    // Debug current state
    this.debugCurrentState();
    
    if (!this._isInitialized || !this.silkProvider || !window.silk) {
      console.error('[AuthService] Service not initialized or Silk not available.');
      return { success: false, error: "Authentication service not ready." };
    }

    try {
      console.log('[AuthService] Starting fresh connection attempt...');
      
      // Skip the force reset since it's causing WalletConnect errors
      // await this.forceResetSilk();
      
      // Just a brief wait
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('[AuthService] Triggering authentication modal...');
      
      // Try using the login method first, then request accounts
      try {
        if (window.silk.login && typeof window.silk.login === 'function') {
          console.log('[AuthService] Using silk.login() method...');
          const loginResult = await window.silk.login();
          console.log('[AuthService] Login result:', loginResult);
        }
      } catch (loginError: any) {
        console.warn('[AuthService] silk.login() failed (likely WalletConnect), continuing with eth_requestAccounts:', loginError.message);
      }
      
      // Now request accounts - this should show the full modal with all options
      const accounts = await window.silk.request({ method: 'eth_requestAccounts' });
      console.log(`[AuthService] Received accounts after authentication:`, accounts);

      if (accounts && accounts.length > 0) {
        // Wait a moment for the connection to be fully established
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verify the connection is stable before proceeding
        try {
          // Check if we can make a simple call without triggering another auth
          const chainId = await window.silk.request({ method: 'eth_chainId' });
          console.log(`[AuthService] Chain ID confirmed: ${chainId}`);
        } catch (chainError) {
          console.warn('[AuthService] Could not get chain ID, but proceeding...');
        }
        
                 // Use the accounts directly instead of relying on ethers.js internal calls
         this.userAddress = accounts[0] || null;
         this.isAuthenticated = true;
        
        // Set up the provider but don't immediately create signer
        this.provider = new BrowserProvider(window.silk);
        
        console.log(`[AuthService] Connection successful. Address: ${this.userAddress}`);
        
        // Skip event listeners for now due to API compatibility issues
        // this.setupSilkEventListeners();
        
        return { success: true, address: this.userAddress || undefined };
      } else {
        throw new Error('No accounts returned after authentication.');
      }

    } catch (error: any) {
      console.error('[AuthService] Connection failed:', error);
      
      let errorMessage = "Failed to connect";
      if (error.message) {
        if (error.message.includes('User rejected') || error.code === 4001) {
          errorMessage = "Connection request rejected by user.";
        } else if (error.message.includes('timeout') || error.message.includes('ping')) {
          errorMessage = "Connection timeout - please try again";
        } else if (error.message.includes('not been authorized')) {
          errorMessage = "Please try connecting again - authentication may have expired.";
        } else {
          errorMessage = error.message;
        }
      }
      
      this.resetAuthState();
      return { success: false, error: errorMessage };
    }
  }

  // Set up Silk-specific event listeners
  private setupSilkEventListeners(): void {
    if (window.silk) {
      window.silk.on('accountsChanged', (accounts: string[]) => {
        console.log('[AuthService] Silk accounts changed:', accounts);
        if (accounts.length === 0) {
          this.resetAuthState();
        } else {
          this.userAddress = accounts[0] || null;
        }
      });

      window.silk.on('chainChanged', (chainId: string) => {
        console.log('[AuthService] Silk chain changed:', chainId);
      });

      window.silk.on('disconnect', () => {
        console.log('[AuthService] Silk disconnected');
        this.resetAuthState();
      });
    }
  }

  // Direct wallet connection (fallback)
  async connectDirectly(): Promise<AuthResult> {
    console.log('[AuthService] Attempting direct wallet connection...');
    
    if (!window.ethereum) {
      return { 
        success: false, 
        error: "No wallet detected. Please install MetaMask or another Ethereum wallet." 
      };
    }

    try {
      this.provider = new BrowserProvider(window.ethereum);
      const accounts = await this.provider.send('eth_requestAccounts', []);

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts returned from wallet.');
      }

      this.signer = await this.provider.getSigner();
      this.userAddress = await this.signer.getAddress();
      this.isAuthenticated = true;
      
      this.setupEventListeners();
      
      console.log(`[AuthService] Direct connection successful: ${this.userAddress}`);
      return { success: true, address: this.userAddress };

    } catch (error: any) {
      console.error('[AuthService] Direct connection failed:', error);
      
      let errorMessage = "Failed to connect wallet";
      if (error.message) {
        if (error.message.includes('User rejected') || error.code === 4001) {
          errorMessage = "Connection request rejected by user.";
        } else {
          errorMessage = error.message;
        }
      }
      
      this.resetAuthState();
      return { success: false, error: errorMessage };
    }
  }

  // Force complete reset of Silk state
  async forceResetSilk(): Promise<void> {
    console.log('[AuthService] Force resetting Silk state...');
    
    // Disconnect current connection
    if (window.silk) {
      try {
        if (window.silk.logout) {
          await window.silk.logout();
        }
        if (window.silk.disconnect) {
          await window.silk.disconnect();
        }
      } catch (error) {
        console.warn('[AuthService] Error during Silk disconnect:', error);
      }
    }
    
    // Clear our state
    this.resetAuthState();
    
    // Clear browser storage again
    if (typeof window !== 'undefined') {
      try {
        const keysToRemove = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (key && (key.includes('silk') || key.includes('human') || key.includes('wallet') || key.includes('auth'))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => {
          console.log(`[AuthService] Force clearing localStorage key: ${key}`);
          window.localStorage.removeItem(key);
        });
      } catch (error) {
        console.warn('[AuthService] Error clearing storage:', error);
      }
    }
    
    console.log('[AuthService] Silk state reset complete.');
  }

  disconnect(): void {
    console.log("[AuthService] Disconnecting...");
    this.resetAuthState();
    
    // If using Silk, call logout
    if (window.silk && window.silk.logout) {
      window.silk.logout();
    }
    
    console.log("[AuthService] Disconnected.");
  }

  private resetAuthState(): void {
    this.provider = null;
    this.signer = null;
    this.userAddress = null;
    this.isAuthenticated = false;
  }

  // Get current network info
  async getNetwork(): Promise<any> {
    if (!this.provider) return null;
    try {
      return await this.provider.getNetwork();
    } catch (error) {
      console.error('[AuthService] Error getting network:', error);
      return null;
    }
  }

  // Get wallet balance
  async getBalance(): Promise<string | null> {
    if (!this.provider || !this.userAddress) return null;
    try {
      const balance = await this.provider.getBalance(this.userAddress);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('[AuthService] Error getting balance:', error);
      return null;
    }
  }
}

// Export a singleton instance
export const authService = new AuthService(); 