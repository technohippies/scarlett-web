import { ethers, BrowserProvider, Signer, JsonRpcSigner } from "ethers";
import { initSilk } from "@silk-wallet/silk-wallet-sdk";

// Simple interface that works with both old and new SDK versions
interface SilkProvider {
  login: () => Promise<void>;
  loginSelector?: (ethereum?: any) => Promise<string | null>; 
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  isSilk?: boolean;
  on?: (event: string, listener: (...args: any[]) => void) => void;
  removeListener?: (event: string, listener: (...args: any[]) => void) => void;
}

// Result type for connect operations
export interface AuthResult {
  success: boolean;
  address?: string;
  error?: string;
}

// Extend Window interface to recognize ethereum
declare global {
  interface Window {
    ethereum?: any; // EIP-1193 provider interface
    silk?: SilkProvider; // Explicitly allow window.silk
  }
}

class AuthService {
  private provider: BrowserProvider | null = null;
  private signer: JsonRpcSigner | null = null;
  private userAddress: string | null = null;
  private isAuthenticated: boolean = false;
  private silkProvider: SilkProvider | null = null;
  private initializationPromise: Promise<void> | null = null;
  private _isInitialized: boolean = false;
  private externalProviderUsed: 'silk' | 'injected' | null = null;

  constructor() {
    console.log("[AuthService] Constructor called");
    // Avoid async operations in constructor, use an explicit init method pattern
  }

  // Initialize the service - call this early in your app
  initialize(): Promise<void> {
    if (!this.initializationPromise) {
      console.log("[AuthService] Initializing...");
      this.initializationPromise = this._initialize();
    }
    return this.initializationPromise;
  }

  private async _initialize(): Promise<void> {
    if (this._isInitialized) {
        console.log("[AuthService] Already initialized.");
        return;
    }
    try {
      console.log("[AuthService] Initializing Silk SDK...");
      
      // Configuration with WalletConnect support for wallet authentication
      const initOptions: any = {
        // REQUIRED for wallet authentication to work
        walletConnectProjectId: 'c4f79dac6f0987896655b97725bb8c16', // Demo project ID
        
        config: {
          authenticationMethods: ['wallet', 'email', 'social'] as any,
          allowedSocials: ['google'] as any,
          styles: {
            darkMode: true
          }
        },
        project: {
          name: 'Scarlett'
        }
      };

      console.log("[AuthService] Silk init options:", JSON.stringify(initOptions, null, 2));
      
      this.silkProvider = initSilk(initOptions) as SilkProvider;
      console.log("[AuthService] Silk provider created");

      // Make it globally available
      if (typeof window !== 'undefined') {
        window.silk = this.silkProvider;
        console.log("[AuthService] Silk provider assigned to window.silk");
      }

      // Check if already connected (non-intrusively)
      await this.checkForExistingConnection();
      
    } catch (err) {
      console.error("[AuthService] Error initializing Silk SDK:", err);
    } finally {
      this._isInitialized = true;
      console.log(`[AuthService] Initialization complete. Initial state: isAuthenticated=${this.isAuthenticated}, address=${this.userAddress}`);
    }
  }
  
  isInitialized(): boolean {
    return this._isInitialized;
  }

  // Non-intrusively check for existing connections (MetaMask, or maybe Silk remembers)
  private async checkForExistingConnection(): Promise<void> {
    console.log('[AuthService] Checking for existing wallet connection...');
    // Prefer checking injected provider first
    if (typeof window !== 'undefined' && window.ethereum && !window.ethereum.isSilk) { // Check if it's NOT the silk provider itself
      try {
        const browserProvider = new BrowserProvider(window.ethereum);
        const accounts = await browserProvider.send('eth_accounts', []); // Non-intrusive check
        if (accounts && accounts.length > 0) {
          console.log(`[AuthService] Found existing INJECTED account: ${accounts[0]}`);
          this.provider = browserProvider;
          this.signer = await this.provider.getSigner();
          this.userAddress = await this.signer.getAddress();
          this.isAuthenticated = true;
          this.externalProviderUsed = 'injected';
          console.log(`[AuthService] Restored INJECTED session: ${this.userAddress}`);
          return; // Found connection, no need to check further initially
        } else {
          console.log('[AuthService] Injected provider found, but no accounts authorized.');
        }
      } catch (error) {
        console.error('[AuthService] Error checking injected provider connection:', error);
      }
    }
    // Add check for Silk persistence if needed/supported
    console.log('[AuthService] No active injected session found.');
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

  getSigner(): JsonRpcSigner | null {
    return this.signer;
  }

  // Connect using Silk - back to the approach that was working
  async connectWithSelector(): Promise<AuthResult> {
    console.log('[AuthService] Attempting connection via connectWithSelector...');
    if (!this._isInitialized || !this.silkProvider) {
      console.error('[AuthService] AuthService or SilkProvider not initialized.');
      return { success: false, error: "Authentication service not ready." };
    }

    try {
      // First try using window.silk if available
      if (window.silk && window.silk.loginSelector) {
        console.log('[AuthService] Calling window.silk.loginSelector...');
        const selectionResult = await window.silk.loginSelector(window.ethereum);
        console.log(`[AuthService] loginSelector result: '${selectionResult}'`);

        let activeProvider: any;
        let providerSource: 'silk' | 'injected';

        if (selectionResult === 'silk') {
          activeProvider = window.silk;
          providerSource = 'silk';
          console.log('[AuthService] User selected Silk. Using Silk provider.');
        } else if (selectionResult === 'injected' && window.ethereum) {
          activeProvider = window.ethereum;
          providerSource = 'injected';
          console.log('[AuthService] User selected injected wallet. Using window.ethereum.');
        } else {
          console.log('[AuthService] No selection made or modal closed.');
          return { success: false, error: "Connection cancelled or no wallet selected." };
        }
        
        console.log(`[AuthService] Creating ethers BrowserProvider from ${providerSource} source.`);
        this.provider = new BrowserProvider(activeProvider);

        console.log('[AuthService] Requesting accounts via eth_requestAccounts...');
        const accounts = await this.provider.send('eth_requestAccounts', []);
        console.log(`[AuthService] eth_requestAccounts response: ${JSON.stringify(accounts)}`);

        if (!accounts || accounts.length === 0) {
          throw new Error('No accounts returned from provider.');
        }

        this.signer = await this.provider.getSigner();
        this.userAddress = await this.signer.getAddress();
        this.isAuthenticated = true;
        this.externalProviderUsed = providerSource;
        console.log(`[AuthService] Connection successful (${providerSource}). Address: ${this.userAddress}`);
        return { success: true, address: this.userAddress };
        
      } else {
        // Fallback to direct wallet connection
        console.log('[AuthService] window.silk.loginSelector not available, trying direct connection...');
        return await this.connectDirectly();
      }

    } catch (error: any) {
      console.error('[AuthService] Error during connectWithSelector:', error);
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

  // Alternative connection method if users want to connect directly with MetaMask
  async connectDirectly(): Promise<AuthResult> {
    console.log('[AuthService] Attempting direct connection to injected wallet...');
    
    if (!window.ethereum) {
      return { success: false, error: "No wallet detected. Please install MetaMask or another Ethereum wallet." };
    }

    try {
      this.provider = new BrowserProvider(window.ethereum);
      
      console.log('[AuthService] Requesting accounts via eth_requestAccounts...');
      const accounts = await this.provider.send('eth_requestAccounts', []);
      console.log(`[AuthService] eth_requestAccounts response: ${JSON.stringify(accounts)}`);

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts returned from wallet.');
      }

      this.signer = await this.provider.getSigner();
      this.userAddress = await this.signer.getAddress();
      this.isAuthenticated = true;
      this.externalProviderUsed = 'injected';
      
      console.log(`[AuthService] Direct connection successful. Address: ${this.userAddress}`);
      return { success: true, address: this.userAddress };

    } catch (error: any) {
      console.error('[AuthService] Error during direct connection:', error);
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

  disconnect(): void {
    console.log("[AuthService] Disconnecting...");
    this.resetAuthState();
    // Note: Add specific logout calls if Silk or other providers require them.
    console.log("[AuthService] Disconnect complete.");
  }

  private resetAuthState(): void {
    this.provider = null;
    this.signer = null;
    this.userAddress = null;
    this.isAuthenticated = false;
    this.externalProviderUsed = null;
  }

  // Add other methods like signMessage if needed, adapted from your example
}

// Export a singleton instance
export const authService = new AuthService(); 