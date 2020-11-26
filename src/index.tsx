import * as React from 'react'
import './index.scss'

// interfaces
interface ICount {
  rows: number
  cols: number
}

interface IInputRows {
  name: string
  value: string
  row: number
  col: number
}

interface IInputChangeArgs {
  event: React.ChangeEvent<HTMLInputElement>
  row: number
  col: number
}

interface IProps {
  showLabels?: boolean
  onMatrixChange(matrix: IInputRows[][]): void
  maxWidth?: string | number
  maxHeight?: string | number
}

// component
const ReactInputMatrix: React.FC<IProps> = ({
  showLabels,
  onMatrixChange,
  maxWidth,
  maxHeight,
}) => {
  // state
  const [count, setCount] = React.useState<ICount>({ rows: 1, cols: 1 })
  const [inputRows, setInputRows] = React.useState<IInputRows[][]>([
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
    const newRows = count.rows + 1
    const emptyRow: IInputRows[] = []
    for (let index = 1; index <= count.cols; index++) {
      emptyRow.push({
        name: `input-${newRows}-${index}`,
        value: '',
        row: newRows,
        col: index,
      })
    }

    setCount((matrix) => ({ ...matrix, rows: newRows }))
    setInputRows((inputRows) => [...inputRows, emptyRow])
  }

  const decreaseRows = () => {
    if (count.rows <= 1) return

    const newRows = count.rows - 1

    setCount((matrix) => ({ ...matrix, rows: newRows }))
    setInputRows((inputRows) => inputRows.slice(0, -1))
  }

  const increaseCols = () => {
    const newCols = count.cols + 1

    setCount((matrix) => ({ ...matrix, cols: newCols }))
    setInputRows((inputRows) =>
      inputRows.map((row, index) => [
        ...row,
        {
          name: `input-${index + 1}-${newCols}`,
          value: '',
          row: index + 1,
          col: newCols,
        },
      ])
    )
  }

  const decreaseCols = () => {
    if (count.cols <= 1) return

    const newCols = count.cols - 1

    setCount((matrix) => ({ ...matrix, cols: newCols }))
    setInputRows((inputRows) => inputRows.map((row) => row.slice(0, -1)))
  }

  const handleInputChange = ({ event, row, col }: IInputChangeArgs) => {
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

  const resetMatrix = () => {
    setCount({ rows: 1, cols: 1 })
    setInputRows([
      [
        {
          name: `input-${1}-${1}`,
          value: '',
          row: 1,
          col: 1,
        },
      ],
    ])
  }

  // effects
  React.useEffect(() => {
    onMatrixChange?.(inputRows)
  }, [inputRows, onMatrixChange])

  // rendering
  return (
    <div className="ReactInputMatrix" style={{ maxWidth: maxWidth || '100%' }}>
      <div className="ReactInputMatrix__buttons-wrapper">
        <div className="ReactInputMatrix__buttons">
          <button
            className="ReactInputMatrix__button ReactInputMatrix__button--add"
            onClick={increaseRows}
          >
            + Row
          </button>
          <button
            className="ReactInputMatrix__button ReactInputMatrix__button--add"
            onClick={increaseCols}
          >
            + Col
          </button>
          <button
            className="ReactInputMatrix__button ReactInputMatrix__button--remove"
            onClick={decreaseRows}
            disabled={count.rows <= 1}
          >
            &times; Row
          </button>
          <button
            className="ReactInputMatrix__button ReactInputMatrix__button--remove"
            onClick={decreaseCols}
            disabled={count.cols <= 1}
          >
            &times; Col
          </button>
        </div>

        <div className="ReactInputMatrix__buttons">
          <button
            className="ReactInputMatrix__button ReactInputMatrix__button--reset"
            onClick={resetMatrix}
            disabled={count.rows <= 1 && count.cols <= 1}
          >
            Reset
          </button>
        </div>
      </div>

      <div
        className="ReactInputMatrix__inputs-wrapper"
        style={{ maxWidth: maxWidth || '100%', maxHeight: maxHeight || 'auto' }}
      >
        <table className="ReactInputMatrix__inputs">
          <tbody>
            {inputRows.map((row, index) => (
              <tr key={index} className="ReactInputMatrix__rows">
                {row.map(({ name, value, row, col }) => (
                  <td
                    key={`${name}-${row}-${col}`}
                    className="ReactInputMatrix__col"
                  >
                    {showLabels && (
                      <label className="ReactInputMatrix__label" htmlFor={name}>
                        {row}, {col}
                      </label>
                    )}

                    <input
                      className="ReactInputMatrix__input"
                      id={name}
                      name={name}
                      value={value}
                      onChange={(event) =>
                        handleInputChange({ event, row, col })
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReactInputMatrix
