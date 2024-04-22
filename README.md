# Gallery
The Gallery is a script for generating a static HTML page that allows easier sharing of provided photos and videos.

## Prepare
1. Run `pnpm install` to install the dependencies.
2. Run `pnpm compile` to compile the TypeScript files.

## Generate
1. Add your photos and videos to the `public` folder.
2. Run `pnpm build` to create `index.html` in the `public` folder.
3. Deploy the content of the `public` folder.

## Linter
1. Run `pnpm lint` to find problems in the source code.

## Format
1. Run `pnpm format` to format the source code.

## All in one
`pnpm all` - runs `lint`, `format`, `compile` and `build` scripts.