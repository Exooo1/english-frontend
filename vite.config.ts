import os from 'node:os'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const skipIface = /vpn|tun|tap|wireguard|wg\d|outline|wsl|hyper-v|vethernet|bluetooth|loopback|virtual|nord|mullvad|proton|openvpn|zerotier|tailscale|hamachi|radmin|germany|amnezia|warp/i

const lanAddress = (): string | null => {
  const found: { name: string; address: string }[] = []
  for (const [name, addrs] of Object.entries(os.networkInterfaces())) {
    if (skipIface.test(name)) continue
    for (const addr of addrs ?? []) {
      const v4 = addr.family === 'IPv4' || addr.family === 4
      if (!v4 || addr.internal || addr.address.startsWith('169.254.')) continue
      found.push({ name, address: addr.address })
    }
  }
  const wifi = found.find((item) => /wi-?fi|wlan|wireless/i.test(item.name))
  const ethernet = found.find((item) => /ethernet|eth/i.test(item.name))
  return (wifi ?? ethernet ?? found[0])?.address ?? null
}

const lan = lanAddress()

const lanUrl = (): Plugin => ({
  name: 'lan-url',
  configureServer(server) {
    server.printUrls = () => {
      const port = server.config.server.port ?? 5173
      const local = server.resolvedUrls?.local[0] ?? `http://localhost:${port}/`
      server.config.logger.info(`  Local:   ${local}`)
      if (lan) server.config.logger.info(`  Телефон (Wi-Fi той же сети, VPN не нужен): http://${lan}:${port}/`)
      else server.config.logger.warn('  Телефон: нет адреса локальной сети')
    }
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), lanUrl()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: lan ? { host: lan, port: 5173, clientPort: 5173 } : undefined,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
})
