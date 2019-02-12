export type InlineStyle = { [key: string]: string | number | void }

export type Style = {
  className: Set<string>,
  inlineStyle: InlineStyle,
  
}

export function identity(): Style {
  return {
    className: new Set(),
    inlineStyle: {},
  }
}

export function fromClassName(...classNames: Array<string>): Style {
  return {
    className: new Set(classNames),
    inlineStyle: {}
  }
}

export function fromInlineStyle(inlineStyle: InlineStyle): Style {
  return {
    className: new Set(),
    inlineStyle,
  }
}

export const mapClassName = (fn: (x: string) => string) => ({
  className,
  inlineStyle
}: Style): Style => ({
  className: new Set(Array.from(className).map(fn)),
  inlineStyle,
})

export function concat(styles: Array<Style>): Style {
  return styles.reduce((prev, curr) => {
    return {
      className: new Set([
        ...Array.from(prev.className),
        ...Array.from(curr.className)
      ]),
      inlineStyle: { ...prev.inlineStyle, ...curr.inlineStyle }
    }
  }, identity())
}


export const toProps = ({
  className,
  inlineStyle,
}: Style): { className: string, style: InlineStyle } => {
  const props = { className: '', style: {} }

  if (className.size > 0) {
    // Sorting here ensures that classNames are always stable, reducing diff
    // churn. Box usually has a small number of properties so it's not a perf
    // concern.
    props.className = Array.from(className)
      .sort()
      .join(' ')
  }

  if (Object.keys(inlineStyle).length > 0) {
    props.style = inlineStyle
  }

  return props
}

export const arrayToProps = ({
  className,
  inlineStyle,
  
}: Style): { className: string[], style: InlineStyle} => {
  const props = { className: [''], style: {} }

  if (className.size > 0) {
    // Sorting here ensures that classNames are always stable, reducing diff
    // churn. Box usually has a small number of properties so it's not a perf
    // concern.
    props.className = Array.from(className)
      .sort()
  }

  if (Object.keys(inlineStyle).length > 0) {
    props.style = inlineStyle
  }

  return props
}
