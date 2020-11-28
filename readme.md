# React Input Matrix

## Why the package was created

So I could learn how to publish a React package to npm.

## What problem the package solves

The need of a simple input matrix with dynamic number of rows and columns.

## All valid configurations/props of the package

```
showLabels?: boolean
onMatrixChange(matrix: IInputRows[][]): void
maxWidth?: string | number
maxHeight?: string | number
```

## Example snippets

```
<ReactInputMatrix onMatrixChange={(data) => console.log(data)} />
```

![Screenshot 1](https://github.com/felipeog/react-input-matrix/blob/master/ReactInputMatrix-screenshot-1.png)

![Screenshot 2](https://github.com/felipeog/react-input-matrix/blob/master/ReactInputMatrix-screenshot-2.png)
