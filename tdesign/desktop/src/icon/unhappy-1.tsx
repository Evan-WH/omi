import { h, tag, WeElement, OmiProps, classNames } from 'omi'
import { IconProps } from './type'
import { TdClassNamePrefix } from '../utils/clsx'
import css from './style/index'

@tag('t-icon-unhappy-1')
export default class Unhappy1 extends WeElement<IconProps> {
  static css = css as string

  static defaultProps = {
    size: '1em',
    style: { fill: '#000' },
  }

  static propTypes = {
    size: [String, Number],
    onClick: Function,
    style: Object,
    class: String,
  }

  render(props: OmiProps<IconProps>) {
    const classPrefix = 't'
    const iconClassName = classNames(TdClassNamePrefix('icon'), props.class, {
      [`${TdClassNamePrefix('size-s')}`]: props.size === 'small',
      [`${TdClassNamePrefix('size-m')}`]: props.size === 'medium',
      [`${TdClassNamePrefix('size-l')}`]: props.size === 'large',
    })
    const flag = props.size === 'small' || props.size === 'medium' || props.size === 'large'
    const iconStyle = {
      ...props.style,
      fontSize: props.size,
    }
    return (
      <svg
        class={iconClassName}
        width={flag ? '24' : props.size}
        height={flag ? '24' : props.size}
        style={iconStyle}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="&amp;#228;&amp;#184;&amp;#141;&amp;#233;&amp;#171;&amp;#152;&amp;#229;&amp;#133;&amp;#180;2-unhappy-1">
          <g id="Union">
            <path
              d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM6 9H10V11H6V9ZM14 9H18V11H14V9ZM7.66955 15.4993C8.53256 14.0074 10.1481 13 12 13C13.852 13 15.4675 14.0074 16.3305 15.4993L16.8312 16.3649L15.1 17.3663L14.5993 16.5007C14.0791 15.6014 13.1092 15 12 15C10.8909 15 9.92099 15.6014 9.40076 16.5007L8.90004 17.3663L7.16882 16.3649L7.66955 15.4993Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    )
  }
}
