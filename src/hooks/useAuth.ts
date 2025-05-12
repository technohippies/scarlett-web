import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { initSilk } from '@silk-wallet/silk-wallet-sdk';

// Define the expected structure of the Silk provider instance
interface SilkProvider {
  login: () => Promise<void>;
  loginSelector: (ethereum?: any) => Promise<string | null>; // Assuming it can take window.ethereum and returns selection
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  // Add other methods if you use them, e.g., for specific Silk features
  on?: (event: string, listener: (...args: any[]) => void) => void;
  removeListener?: (event: string, listener: (...args: any[]) => void) => void;
}

export interface UseAuthReturn {
  address: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
}

export const useAuth = (): UseAuthReturn => {
  const [silkInstance, setSilkInstance] = useState<SilkProvider | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start true until initialized
  const [error, setError] = useState<string | null>(null);

  const initializeSilk = useCallback(async () => {
    console.log('[useAuth] Minimal Initializing Silk...');
    setIsLoading(true);
    try {
      const silk = initSilk() as SilkProvider;
      setSilkInstance(silk);
      console.log('[useAuth] Minimal Silk provider instance created.');
      // ALL OTHER LOGIC TEMPORARILY COMMENTED OUT
      // e.g., no immediate check for existing connections or setting other states here
    } catch (e: any) {
      console.error('[useAuth] Minimal Error initializing Silk:', e);
      setError('Failed to initialize wallet SDK (minimal).');
    } finally {
      setIsLoading(false);
      console.log('[useAuth] Minimal Silk initialization finished.');
    }
  }, []);

  useEffect(() => {
    initializeSilk();
  }, [initializeSilk]);

  const connect = async () => {
    if (!silkInstance) {
      console.error('[useAuth] Connect called before Silk instance is ready.');
      setError('Silk SDK not initialized.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    console.log('[useAuth] Attempting connection via loginSelector...');

    try {
      console.log('[useAuth] Calling silkInstance.loginSelector...');
      // Pass window.ethereum to potentially enable injected option
      const selectionResult = await silkInstance.loginSelector((window as any).ethereum);
      console.log(`[useAuth] loginSelector selection result: '${selectionResult}'`);

      let activeProvider: any;
      let providerSource: string = 'unknown';

      if (selectionResult === 'silk') {
        activeProvider = silkInstance;
        providerSource = 'silk';
        console.log('[useAuth] User selected Silk. Using Silk provider.');
      } else if (selectionResult === 'injected' && (window as any).ethereum) {
        activeProvider = (window as any).ethereum;
        providerSource = 'injected';
        console.log('[useAuth] User selected injected wallet. Using window.ethereum.');
      } else if (!selectionResult) {
        // Handle case where the modal might be closed without selection, or if null means default to Silk
        // Assuming default to Silk if no specific selection or if closed
        activeProvider = silkInstance;
        providerSource = 'silk_default_or_closed';
        console.log('[useAuth] loginSelector returned null/undefined or modal closed. Assuming Silk provider.');
      } else {
        console.error(`[useAuth] Unsupported loginSelector result: ${selectionResult}`);
        throw new Error(`Unsupported login selection: ${selectionResult}`);
      }

      console.log(`[useAuth] Creating ethers Web3Provider from ${providerSource} source.`);
      const web3Provider = new ethers.providers.Web3Provider(activeProvider);
      setProvider(web3Provider);

      console.log('[useAuth] Requesting accounts via eth_requestAccounts...');
      const accounts = await web3Provider.send('eth_requestAccounts', []);
      console.log(`[useAuth] eth_requestAccounts response: ${JSON.stringify(accounts)}`);

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts returned from provider.');
      }
      
      const currentAddress = accounts[0];
      setAddress(currentAddress);
      console.log(`[useAuth] Account address obtained: ${currentAddress}`);

      console.log('[useAuth] Getting signer...');
      const currentSigner = web3Provider.getSigner();
      setSigner(currentSigner);
      console.log('[useAuth] Signer obtained.');

      setIsAuthenticated(true);
      console.log('[useAuth] Connection successful, isAuthenticated set to true.');

    } catch (e: any) {
      console.error('[useAuth] Connection process failed:', e);
      let errorMessage = 'Failed to connect wallet';
      if (e.message) {
          if (e.message.includes('User rejected') || e.message.includes('rejected')) {
              errorMessage = 'Connection request rejected by user.';
          } else if (e.message.includes('Missing or invalid')) { // Example for other potential errors
              errorMessage = `Connection error: ${e.message}`;
          } else {
              errorMessage = e.message; // Use the error message directly
          }
      }
      setError(errorMessage);
      // Reset state on error
      setAddress(null);
      setSigner(null);
      setProvider(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
      console.log('[useAuth] Connection attempt finished.');
    }
  };

  const disconnect = () => {
    console.log('[useAuth] Disconnecting...');
    // Note: Silk might have its own specific disconnect/logout method
    // This basic disconnect primarily clears React state.
    setAddress(null);
    setSigner(null);
    setProvider(null);
    setIsAuthenticated(false);
    setError(null);
    // Potentially: silkInstance?.logout() or similar if the SDK supports it.
    console.log('[useAuth] Disconnected.');
  };

  return {
    address,
    isAuthenticated,
    isLoading,
    error,
    connect,
    disconnect,
    provider,
    signer,
  };
}; 