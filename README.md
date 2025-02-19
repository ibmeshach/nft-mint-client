This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# nft-mint-client

## API Routes

- **POST** `/nfts/store-nft`

  - Description: Store a new NFT record.
  - Request Body: `StoreNftDto`
  - Responses:
    - 201: Nft record has been successfully created.
    - 400: Nft record with nftID already exists.

- **GET** `/nfts/gallery/all`

  - Description: Retrieve the NFT gallery for a specific user.
  - Query Parameter: `userWalletAddress` (required)
  - Responses:
    - 200: Nft gallery has been successfully retrieved.
    - 404: Nft gallery with userWalletAddress not found.

- **GET** `/nfts/:nftId`

  - Description: Retrieve a specific NFT record by ID.
  - Path Parameter: `nftId` (required)
  - Responses:
    - 200: Nft record has been successfully retrieved.
    - 404: Nft record with nftId not found.

- **PATCH** `/nfts/minted-status`
  - Description: Update the minted status of an NFT.
  - Request Body: `UpdateNftStatusDto`
  - Responses:
    - 200: Nft minted status has been successfully updated.
    - 404: Nft record with nftId not found.

## Deployed Links

- Deployed API: [API Link](https://nft-minting-backend-production.up.railway.app/api)
- Deployed Frontend: [Frontend Link](https://ibmeshach-nft-mint-client.vercel.app/)

## Demo Videos

- UI Demo: [Loom Video 1](https://www.loom.com/share/98dc340dc8c74b3e8a6c368d722b9d71?sid=03bf544e-3a94-47bd-9d64-50e99f9c0e54)
- Frontend Code Demo: [Loom Video 2](https://www.loom.com/share/4056002748c54337b6c49bdb2ca907cc?sid=6d9c1223-ff76-4afb-87da-d177ea69e49f)
- Backend Code Demo: [Loom Video 3](https://www.loom.com/share/144d9e4d680747c485d507702a13a433?sid=3e7d32f3-51f0-4941-bf56-57c059647a1e)

## Backend Repository

- Check out the backend repository: [Backend Repository Link](https://github.com/ibmeshach/nft-mint-api)

## Environment Variables

To run this project, you need to set the following environment variables:

- `NEXT_PUBLIC_PROJECT_ID`: Your project ID for the application.
- `NEXT_PUBLIC_BACKEND_API`: The URL of the backend API.
- `NEXT_PUBLIC_BACKEND_API_KEY`: Your API key for accessing the backend.
- `NEXT_PUBLIC_NFT_MINT_CONTRACT_ADDRESS`: The address of the NFT minting contract.

Make sure to create a `.env` file in the root of your project with the following content:

```
NEXT_PUBLIC_PROJECT_ID=764b7efb05776903e3d3bc7788c4c08a
NEXT_PUBLIC_BACKEND_API=https://nft-minting-backend-production.up.railway.app/api
NEXT_PUBLIC_BACKEND_API_KEY=1234567890
NEXT_PUBLIC_NFT_MINT_CONTRACT_ADDRESS=0x743F49311A82fe72eb474c44e78Da2A6e0AE951c
```
