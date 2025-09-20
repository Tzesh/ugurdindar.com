# ugurdindar.com

This is my portfolio created using [vscode-portfolio](https://github.com/itsnitinr/vscode-portfolio).

![Footage](https://imgur.com/xpLZHs0.png)

## Getting Started

### Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Visit [http://localhost:3000](http://localhost:3000)

### Production Build

1. Build the app:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm start
   ```

### Docker

1. Build the Docker image (default port 3000):

   ```bash
   docker build -t ugurdindar-app .
   ```

2. Run the container:

   ```bash
   docker run -p 3000:3000 ugurdindar-app
   ```

3. To use a custom port:

   ```bash
   docker build --build-arg PORT=8080 -t ugurdindar-app .
   docker run -e PORT=8080 -p 8080:8080 ugurdindar-app
   ```
