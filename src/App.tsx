import React, { useState } from 'react'
import './App.css'

// interfaces
interface IMatrixData {
  rows: number
  cols: number
}

interface IInputRowsData {
  name: string
  value: string
  row: number
  col: number
}

interface IInputChange {
  event: React.ChangeEvent<HTMLInputElement>
  row: number
  col: number
}

// component
const App: React.FC = () => {
  const [matrix, setMatrix] = useState<IMatrixData>({ rows: 1, cols: 1 })
  const [inputRows, setInputRows] = useState<IInputRowsData[][]>([
    [
      {
        name: `input-${1}-${1}`,
        value: '',
        row: 1,
        col: 1,
      },
    ],
  ])

  // functions
  const increaseRows = () => {
    const newRows = matrix.rows + 1
    const emptyRow: IInputRowsData[] = []
    for (let index = 1; index <= matrix.cols; index++) {
      emptyRow.push({
        name: `input-${newRows}-${index}`,
        value: '',
        row: newRows,
        col: index,
      })
    }

    setMatrix((matrix) => ({ ...matrix, rows: newRows }))
    setInputRows((inputRows) => {
      return [...inputRows, emptyRow]
    })
  }

  const decreaseRows = () => {
    const newRows = matrix.rows - 1

    setMatrix((matrix) => ({ ...matrix, rows: newRows }))
    setInputRows((inputRows) => {
      return inputRows.slice(0, -1)
    })
  }

  const increaseCols = () => {
    const newCols = matrix.cols + 1

    setMatrix((matrix) => ({ ...matrix, cols: newCols }))
    setInputRows((inputRows) => {
      return inputRows.map((row, index) => [
        ...row,
        {
          name: `input-${index + 1}-${newCols}`,
          value: '',
          row: index + 1,
          col: newCols,
        },
      ])
    })
  }

  const decreaseCols = () => {
    const newCols = matrix.cols - 1

    setMatrix((matrix) => ({ ...matrix, cols: newCols }))
    setInputRows((inputRows) => {
      return inputRows.map((row) => row.slice(0, -1))
    })
  }

  const handleInputChange = ({ event, row, col }: IInputChange) => {
    const inputRowsClone = [...inputRows]
    const inputRow = row - 1
    const inputCol = col - 1
    const currentInput = inputRowsClone[inputRow][inputCol]

    inputRowsClone[inputRow].splice(inputCol, 1, {
      ...currentInput,
      value: event.target.value,
    })

    setInputRows(inputRowsClone)
  }

  // rendering
  return (
    <div className="App">
      <div className="buttons">
        <button onClick={increaseRows}>+ row</button>
        <button onClick={decreaseRows}>- row</button>
        <button onClick={increaseCols}>+ col</button>
        <button onClick={decreaseCols}>- col</button>
      </div>
      <div className="inputs-wrapper">
        <table className="inputs">
          {inputRows.map((row) => (
            <tr className="rows">
              {row.map(({ name, value, row, col }) => (
                <td className="col">
                  <label htmlFor={name}>
                    {row}, {col}
                  </label>
                  <input
                    id={name}
                    name={name}
                    value={value}
                    onChange={(event) => handleInputChange({ event, row, col })}
                  />
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>

      <div className="state">
        <p>matrix state: </p>
        <pre>{JSON.stringify(matrix, null, 2)}</pre>
      </div>

      <div className="state">
        <p>inputRows state: </p>
        <pre>{JSON.stringify(inputRows, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
