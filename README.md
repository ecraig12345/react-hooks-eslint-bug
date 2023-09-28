Demonstrating an [issue](https://github.com/facebook/react/issues/27431) with `eslint-plugin-react-hooks`: with `@typescript-eslint/parser` >= 5, the `rules-of-hooks` rule misses hook usage in class properties.

```ts
class Test {
  useHook = () => { useState() }
}
```

## Repro setup

`package.json` includes dependencies on both `@typescript-eslint/parser` v4 and v5, and both `eslint-plugin-react-hooks` `latest` and `next`.

`.eslintrc.js` sets the parser to `@typescript-eslint/parser` (v5) and enables both the `latest` and `next` versions of `react-hooks/rules-of-hooks`.

`index.ts` has several rule violations.

The script `yarn lint` repros the issue.

`yarn lint-v4` changes the parser to `@typescript-eslint/parser` v4 to show that it previously worked.

## Repro steps

1. `yarn`
2. Run with `@typescript-eslint/parser` v5, observe only 4 errors: `yarn lint`
3. Run with `@typescript-eslint/parser` v4, observe 10 errors as expected: `yarn lint-v4`

## Root cause

In [`@typescript-eslint/parser` v5](https://github.com/typescript-eslint/typescript-eslint/releases/tag/v5.0.0), `ClassProperty` was renamed to `PropertyDefinition`. The `rules-of-hooks` rule [needs to be updated](https://github.com/facebook/react/blob/34de2986dfeddda31cb76d298c6d59b271d976fa/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js#L521) to check for this additional name.
