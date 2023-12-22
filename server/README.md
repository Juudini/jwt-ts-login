# Auth-api

[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Installation

Make sure you have Node.js and npm installed on your system before proceeding.

1. Clone this repository or download the source code.

```bash
git clone https://github.com/Juudini/jwt-ts-login.git
cd jwt-ts-login
```

2. Install project dependencies.

```bash
pnpm install

```

2. Start project db migration.

```bash
pnpm run migrate
```

or

```bash
npx prisma migrate dev --name init

```

# Usage

### Development

To run the application in development mode, use the following command:

```bash

pnpm run dev

```

This command will use ts-node-dev to automatically restart the application when changes are made to the source code.

### Production

To compile and run the application in a production environment, use the following command:

```bash

pnpm start

```

Este comando compila el código TypeScript y ejecuta la aplicación en Node.js.

### Testing

You can run tests using the following command:

```bash
pnpm test
```

### Linting and Code Formatting

To fix linting and code formatting issues, run:

```bash
pnpm run lint
```
