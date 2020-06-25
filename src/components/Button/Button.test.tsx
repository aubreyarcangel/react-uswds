import React from 'react'
import { render, fireEvent } from '@testing-library/react'

jest.mock('../../deprecation')
import { deprecationWarning } from '../../deprecation'
import { Button } from './Button'

describe('Button component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const { queryByTestId } = render(<Button type="button">Click Me</Button>)
    expect(queryByTestId('button')).toBeInTheDocument()
  })

  describe('renders uswds classes', () => {
    it('usa-button', () => {
      const { queryByTestId } = render(<Button type="button">Click Me</Button>)
      expect(queryByTestId('button')).toHaveClass('usa-button')
    })

    const optionalBooleanClasses = [
      ['secondary', 'usa-button--secondary'],
      ['base', 'usa-button--base'],
      ['accent', 'usa-button--accent-cool'],
      ['outline', 'usa-button--outline'],
      ['inverse', 'usa-button--inverse'],
      ['icon', 'usa-button--icon'],
      ['unstyled', 'usa-button--unstyled'],
    ]

    optionalBooleanClasses.map((data) => {
      it(`${data[1]}`, () => {
        const additionalProps: { [key: string]: boolean } = {}
        additionalProps[data[0]] = true

        const { queryByTestId } = render(
          <Button type="button" {...additionalProps}>
            Click Me
          </Button>
        )
        expect(queryByTestId('button')).toHaveClass(data[1])
      })
    })

    it('renders uswds class for size small', () => {
      const { queryByTestId } = render(
        <Button type="button" size="small">
          Click Me
        </Button>
      )
      expect(queryByTestId('button')).toHaveClass('usa-button--small')
      expect(queryByTestId('button')).not.toHaveClass('usa-button--big')
      expect(deprecationWarning).toHaveBeenCalledTimes(0)
    })

    it('renders uswds class for size big', () => {
      const { queryByTestId } = render(
        <Button type="button" size="big">
          Click Me
        </Button>
      )
      expect(queryByTestId('button')).toHaveClass('usa-button--big')
      expect(queryByTestId('button')).not.toHaveClass('usa-button--small')
      expect(deprecationWarning).toHaveBeenCalledTimes(0)
    })

    it('prefers size to deprecated big', () => {
      const { queryByTestId } = render(
        <Button type="button" size="small" big>
          Click Me
        </Button>
      )
      expect(queryByTestId('button')).toHaveClass('usa-button--small')
      expect(queryByTestId('button')).not.toHaveClass('usa-button--big')
      expect(deprecationWarning).toHaveBeenCalledTimes(1)
    })

    it('prefers size to deprecated small', () => {
      const { queryByTestId } = render(
        <Button type="button" size="big" small>
          Click Me
        </Button>
      )
      expect(queryByTestId('button')).toHaveClass('usa-button--big')
      expect(queryByTestId('button')).not.toHaveClass('usa-button--small')
      expect(deprecationWarning).toHaveBeenCalledTimes(1)
    })
  })

  it('implements an onClick handler', () => {
    const onClickFn = jest.fn()
    const { getByText } = render(
      <Button type="button" onClick={onClickFn}>
        Click Me
      </Button>
    )

    fireEvent.click(getByText('Click Me'))

    expect(onClickFn).toHaveBeenCalledTimes(1)
  })

  it('accepts additional custom class names', () => {
    const { queryByTestId } = render(
      <Button className="customClass" type="button">
        Click Me
      </Button>
    )
    expect(queryByTestId('button')).toHaveClass('usa-button')
    expect(queryByTestId('button')).toHaveClass('customClass')
  })

  describe('with custom component', () => {
    it('renders expected parent element', () => {
      const { container } = render(
        <Button as={<a href="https://truss.works"> Visit Truss</a>}>
          Visit Truss
        </Button>
      )

      expect(container.querySelector('a')).toBeInTheDocument()
      expect(container.querySelector('button')).not.toBeInTheDocument()
    })

    it('applies uswds Button props', () => {
      const { queryByTestId } = render(
        <Button
          as={<a href="https://truss.works">Visit Truss</a>}
          size="big"
          base>
          Visit Truss
        </Button>
      )

      expect(queryByTestId('button')).toHaveClass('usa-button--big')
      expect(queryByTestId('button')).toHaveClass('usa-button--base')
    })
  })
})
