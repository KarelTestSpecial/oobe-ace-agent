import * as fs from 'fs';
import * as path from 'path';
import { Keypair } from '@solana/web3.js';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Loads the local agent Solana Keypair from the file system.
 * If the keypair file does not exist, a new one will be generated,
 * saved to the specified path, and returned.
 */
export function getOrCreateAgentKeypair(): Keypair {
  const defaultPath = path.join(
    process.env.HOME || '/home/kareltestspecial',
    '.config',
    'solana',
    'id_agent.json'
  );
  
  const keypairPath = process.env.AGENT_KEYPAIR_PATH || defaultPath;
  
  // Ensure the directory exists
  const dir = path.dirname(keypairPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Load or generate
  if (fs.existsSync(keypairPath)) {
    try {
      console.log(`[Wallet] Loading existing agent keypair from: ${keypairPath}`);
      const rawData = fs.readFileSync(keypairPath, 'utf-8');
      const secretKey = Uint8Array.from(JSON.parse(rawData));
      const keypair = Keypair.fromSecretKey(secretKey);
      console.log(`[Wallet] Loaded Agent PublicKey: ${keypair.publicKey.toBase58()}`);
      return keypair;
    } catch (error: any) {
      console.error(`[Wallet] Error loading keypair from ${keypairPath}: ${error.message}`);
      console.log('[Wallet] Re-generating a new keypair due to corruption or read failure.');
    }
  }

  console.log(`[Wallet] Generating a new Agent Keypair at: ${keypairPath}`);
  const keypair = Keypair.generate();
  const secretKeyArray = Array.from(keypair.secretKey);
  
  fs.writeFileSync(keypairPath, JSON.stringify(secretKeyArray), 'utf-8');
  console.log(`[Wallet] Successfully generated new Agent PublicKey: ${keypair.publicKey.toBase58()}`);
  
  return keypair;
}
