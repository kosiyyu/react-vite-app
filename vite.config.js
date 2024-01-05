import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import open from 'open';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
  {
    name: 'open-browser',
    apply: 'serve',
    async handleServer(ctx) {
      await ctx.server.listen();
      open('http://localhost:5173');
    },
  },
  [react()],
  ],
  // server: {
  //   open: true,
  //   port: 5173
  // }
})